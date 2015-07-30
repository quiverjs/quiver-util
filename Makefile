build: src
	babel src --out-dir out

test: build
	node out/test

install-babel:
	if ! command -v babel 2>/dev/null; then \
	  npm install babel; \
	fi

postinstall: install-babel build

.PHONY: build test install-babel postinstall
