#!/usr/bin/env bash

# 1. Install project dependencies
npm install
# 2. Run backend Python app tests (check for vulnerabilities)
# 3. Run frontend React tests.
npm run test:frontend -- --watchAll
# 4. Audit frontend dependencies.
cd frontend && npm audit
# 5. Prettier.
cd ..
npm run prettier:frontend
npm run lint:frontend
