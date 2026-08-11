install:
	pnpm install

docs:
	mkdir -p docs
	pnpm --silent run documentation -- build index.js -f md > docs/README.md

test:
	pnpm --silent test

lint:
	pnpm --silent run lint
	pnpm --silent run format:check

publish:
	pnpm publish --access public --no-git-checks

.PHONY: test docs
