# Upsun demo

This repository is the Upsun demo project meant to help you learn the basics of [Upsun PaaS](https://upsun.com/).

## Run de demo on Upsun

### 1. Deploy the demo

1. Clone the GitHub repository locally:

- ```
  git clone git@github.com:platformsh/demo-project.git upsun-demo && cd upsun-demo
  ```

2. Create a new Upsun organization if you do not have one yet:

- ```
  upsun organization:create
  ```

3. Create a new Upsun project:

- ```
  upsun project:create
  ```

4. Set the `upsun` Git remote:

- ```
  upsun project:set-remote PROJECT_ID
  ```

5. Deploy the project:

- ```
  upsun push -y
  ```

> [!IMPORTANT]
> This first push will take a moment to build _and_ will fail.
> This is expected, so follow the next step (3) to setup the initial resources.

6. Configure the compute resources on your environment, and verify the deployment:

- ```
  upsun resources:set --size '*:1'
  ```
- ```
  upsun url --primary
  ```

### 2. Complete the demo

The steps below are provided for you within the deployed environment.
They are listed here just in case you get lost.

1. Create a new staging (preview) environment:

- ```
  upsun branch staging --type staging
  ```
- ```
  upsun url --primary
  ```

2. Add a Redis service

  Uncomment the `backend.relationships` and `services` block in `.upsun/config.yaml`, so it looks like the following:

  ```yaml
  #####################################################################################
  # Step 3: Add a service. Uncomment this section.
  #####################################################################################
          relationships:
              redis_session: "redis_persistent:redis"

  services:
    redis_persistent:
        type: "redis-persistent:7.0"
  #####################################################################################
  ```

  Commit and deploy those changes:

  - ```
    git commit -am 'Add Redis service and relationship.'
    ```
  - ```
    upsun push
    ```

  Configure the resources for Redis:
  
  - ```
    upsun resources:set --size redis_persistent:0.5 --disk redis_persistent:512
    ```

3. Merge staging into production:

- ```
  git checkout main
  ```
- ```
  upsun merge staging
  ```
- ```
  upsun resources:set --size redis_persistent:0.5 --disk redis_persistent:512
  ```

> [!IMPORTANT]
> Post-merge, you _do_ need to _redefine_ resources for Redis on the production environment, as shown above.


Congratulations, you have completed the demo!

You can now enjoy more Upsun capabilities like:
* Scale your applications horizonally:
- ```
  upsun resources:set --count backend:3 --count frontend:3
  ```
* Create a team and invite contributors to your project.
* Create new preview environments.
* Add new services.

## Run the demo locally

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
