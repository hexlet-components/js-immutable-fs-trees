install:
	npm install

docs:
	mkdir -p docs
	npm run documentation -- build index.js -f md > docs/README.md

test:
	npm test -s

lint:
	npx biome check .

publish:
	npm publish --access public

.PHONY: test docs
