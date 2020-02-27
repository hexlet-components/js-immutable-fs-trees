install:
	npm install

docs:
	mkdir -p docs
	npm run documentation -- build src/index.js -f md > docs/README.md

build:
	npm run build

test:
	npm run test

lint:
	npx eslint .

publish:
	npm publish --access public

.PHONY: test docs
