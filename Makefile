TRACEUR_FLAGS=--modules commonjs --generators parse --block-binding parse

build: build-lib build-test

build-lib: lib
	traceur --dir lib es5/lib $(TRACEUR_FLAGS)

build-test: test
	traceur --dir test es5/test $(TRACEUR_FLAGS)

unit-test: build
	mocha es5/test

.PHONY: build build-lib build-test test