# Local Dev

## Backend App

1. `cd backend`
2. `pip install -r requirements.txt`
3. `cp .env.sample .env`
   * There are preset `PLATFORM_*` variables available to test scenarios such as:
     * Has redis app
     * Has scaled environment
     * Set staging/production
4. `python main.py`

## Frontend App
1. `npm install`
2. `npm run start`

# First Deployment
* Allocate required resources for scaling compatibility: `./upsun e:curl /deployments/next -X PATCH -d \ '{ "webapps": { "demo-app-frontend": { "resources": { "profile_size": "0.1" }, "disk": 1024 }, "demo-app-backend": { "resources": { "profile_size": "0.1" } } }, "services": { "redis_persistent": { "resources": { "profile_size": "0.1" }, "disk": 1024 } } }'`
# Good-to-know

* React's index.html has been modified to request dynamic/vars.js
  * This file is designed to provide dynamic project information such as routes in order to minimize the need to create various mounts and to avoid building using the deploy hook
  * This file is not generated when running on localhost, so React will fall back to defaults (see `src/config.js`)
* The Python backend is Flask
* The Python backend uses `getSessionStorageType()` to check for the existence of `PLATFORM_RELATIONSHIP['redis-session']`