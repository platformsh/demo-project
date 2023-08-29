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

## Good-to-know

* React's index.html has been modified to request dynamic/vars.js
  * This file is designed to provide dynamic project information such as routes in order to minimize the need to create various mounts and to avoid building using the deploy hook
  * This file is not generated when running on localhost, so React will fall back to defaults (see `src/config.js`)
* The Python backend is Flask
* The Python backend uses `getSessionStorageType()` to check for the existence of `PLATFORM_RELATIONSHIP['redis-session']`