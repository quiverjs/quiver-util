import { resolveAny, $finally } from './basic'

export const throttleAsync = (fn, maxConcurrent) => {
  const running = new Set()
  const taskQueue = []

  const awaitRequest = () =>
    resolveAny([...running.values()])
    .then(() => {}, () => {}) // ignore errors

  const runScheduler = async function() {
    while(taskQueue.length > 0) {
      if(running.size >= maxConcurrent) {
        await awaitRequest()
      }

      const runner = taskQueue.shift()
      runner()
    }
  }

  const scheduleTask = runner => {
    taskQueue.push(runner)
    if(taskQueue.length === 1)
      runScheduler()
  }

  const runTask = task => {
    const promise = task()
    running.add(promise)
    promise::$finally(() => {
      running.delete(promise)
    })
    return promise
  }

  const enqueueTask = task =>
    new Promise(resolve => {
      const runner = () =>
        resolve(runTask(task))

      scheduleTask(runner)
    })

  const createDeferred = (...args) =>
    async function() {
      return fn(...args)
    }

  return (...args) => {
    const task = createDeferred(...args)

    return enqueueTask(task)
  }
}
