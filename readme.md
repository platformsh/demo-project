# Demo project

This is a simple demo project meant to take a user on a bit of a product tour. 

## Using this project locally

There is a root package `@platformsh/demo-project` that controls both the backend and frontend app setup.
NPM is required. 

1. `git clone git@github.com:platformsh/demo-project.git`
1. `cd demo-project`
1. `npm install`
1. `npm run start`

These commands will set up everything you need to get started, serving:

- The `backend` Python app from `localhost:8000`
- The `frontend` React app from `localhost:3000`

> [!IMPORTANT]
> If at any time you want to start over, run `npm run clean`.
> This will delete everything you've done in the previous steps.

## Notes

### First Deployment

* Allocate required resources for scaling compatibility: `./upsun e:curl /deployments/next -X PATCH -d \ '{ "webapps": { "demo-app-frontend": { "resources": { "profile_size": "0.1" }, "disk": 1024 }, "demo-app-backend": { "resources": { "profile_size": "0.1" } } }, "services": { "redis_persistent": { "resources": { "profile_size": "0.1" }, "disk": 1024 } } }'`

### Good-to-know

* React's index.html has been modified to request dynamic/vars.js
  * This file is designed to provide dynamic project information such as routes in order to minimize the need to create various mounts and to avoid building using the deploy hook
  * This file is not generated when running on localhost, so React will fall back to defaults (see `src/config.js`)
* The Python backend is Flask
* The Python backend uses `getSessionStorageType()` to check for the existence of `PLATFORM_RELATIONSHIP['redis-session']`