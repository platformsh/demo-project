# Demo project

This is a simple demo project meant to take a user on a bit of a product tour. 

## Testing the demo on Upsun

### Part 1: Replicating what is provided in Console

1. Clone the repository, and create an organization and a project on Upsun we'll deploy it to:

- ```
  git clone git@github.com:platformsh/demo-project.git upsun-demo && cd upsun-demo
  ```
- ```
  upsun organization:create --label "Upsun Testing" --name upsun-testing
  ```
- ```
  upsun create --org upsun-testing --title "Upsun demo" --region "org.recreation.plat.farm" --plan flexible --default-branch main --no-set-remote -y
  ```

2. Set the remote for the project, and first push:

- ```
  PROJECT_ID=$(upsun project:list --title "Upsun demo" --pipe)
  ```
- ```
  upsun project:set-remote $PROJECT_ID
  ```
- ```
  upsun push -y
  ```

> [!IMPORTANT]
> This first push will take a moment to build _and_ will fail.
> This is expected, so follow the next step (3) to setup the initial resources.

3. Configure resources for production, and verify the deployment:

- ```
  upsun resources:set --size '*:1'
  ```
- ```
  upsun url --primary
  ```



```
####################################################################################################
# Demo steps provided in-console to get you to the live environment
####################################################################################################

# Command provided by demo path steps.
git clone git@github.com:platformsh/demo-project.git upsun-demo && cd upsun-demo

# To be taken care of by project creation steps.
upsun organization:create --label "Upsun Testing" --name upsun-testing
upsun create --org upsun-testing --title "Upsun demo" --region "org.recreation.plat.farm" --plan flexible --default-branch main --no-set-remote -y

# Command provided by demo path steps (Project ID substituted in console)
PROJECT_ID=$(upsun project:list --title "Upsun demo" --pipe)
upsun project:set-remote $PROJECT_ID

# Command provided (minus the flag) by demo path steps
upsun push -y

# Command provided by demo path steps
upsun resources:set --size '*:1'

# Command provided by demo path steps
upsun url --primary

####################################################################################################
# Start of in-app steps
####################################################################################################
# Step 1 - branch
upsun branch staging --type staging
upsun url --primary

# Step 2 - push Redis
# First, uncomment the backend.relationships block.
#   and the services block of .upsun/config.yaml
git commit -am 'Add Redis service and relationship.'
upsun push
# When it fails (due to a lack of resources defined):
upsun resources:set --size redis_persistent:0.5 --disk redis_persistent:512

# Step 3 - Merge preview environment into production
upsun merge staging
# This will fail again (resources)
# Make sure you're on the parent env, then update resources
git checkout main
upsun resources:set --size redis_persistent:0.5 --disk redis_persistent:512

# Step 4 - Scale horizontally - to be tested for reliability
upsun resources:set --count backend:3
```

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