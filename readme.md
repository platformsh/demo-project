<p align="center">
<a href="https://www.upsun.com/">
<img src="logo.svg" width="500px">
</a>
</p>

<p align="center">
<a href="https://github.com/platformsh/demo-project/issues">
<img src="https://img.shields.io/github/issues/platformsh/demo-project.svg?style=for-the-badge&labelColor=f4f2f3&color=6046FF&label=Issues" alt="Open issues" />
</a>&nbsp&nbsp
<a href="https://github.com/platformsh/demo-project/pulls">
<img src="https://img.shields.io/github/issues-pr/platformsh/demo-project.svg?style=for-the-badge&labelColor=f4f2f3&color=6046FF&label=Pull%20requests" alt="Open PRs" />
</a>&nbsp&nbsp
<a href="https://github.com/platformsh/demo-project/blob/main/LICENSE">
<img src="https://img.shields.io/static/v1?label=License&message=MIT&style=for-the-badge&labelColor=f4f2f3&color=6046FF" alt="License" />
</a>&nbsp&nbsp
<br /><br />

<p align="center">
<strong>Contribute, request a feature, or check out our resources</strong>
<br />
<br />
<!-- <a href="https://community.platform.sh"><strong>Join our community</strong></a>&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp -->
<a href="https://docs.upsun.com"><strong>Documentation</strong></a>&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp
<a href="https://upsun.com/blog"><strong>Blog</strong></a>&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp
<br /><br />
</p>

<h2 align="center">Try the Upsun demo</h2>

## About

This is a simple demo project meant to take users through a product tour of Upsun.

## Getting started

Upsun is currently in [beta](https://upsun.com/register/), but will become more available in the coming year. 

If you already have access to Upsun:

- Visit the Upsun Console (https://console.upsun.com/projects/create-project) to create a new project
- Create or select an organization to run the demo on
- Click **Explore Upsun** to start the demo

> [!NOTE]
> Upsun is currently in [beta](https://upsun.com/register/), but will become more available in the coming year. 
>
> You can find more information about Upsun, how it [relates to Platform.sh](https://upsun.com/blog/upsun-origin-story/), [notable features](https://upsun.com/features/), and [pricing](https://upsun.com/pricing/) on our website.
> 
> If you'd like to sign up for early access to Upsun, [register on our website](https://upsun.com/register/). 

## Resume the demo

When you start the demo project through the Upsun console, you will receive all the steps you need to go through the entire demo.
If for some reason you close your browser and lose your place, however, you can pick back up where you left off by following the instructions below.

1. Install the Upsun CLI

    ```bash
    brew install upsun/tap/upsun-cli
    ```

    > [!NOTE]
    > Determine if you already have the CLI installed by running `upsun`.

2. Create a project

    First run, `upsun project:list`.
    If there is _no_ project listed, you can go right ahead back to [https://console.upsun.com/create-project](https://console.upsun.com/create-project) and restart the **Demo project** option.

    If you already created a project, you will find a `PROJECT_ID` associated with that project, which you will use in the next step.

3. Get the demo repository

    > [!NOTE]
    > You can determine if you have already pushed the demo project to Upsun using the command `upsun activity:list --type push`.
    > If you've already pushed code, there will be an entry in the table that says **Your Name pushed to Main**.
    >
    > If you see a `push` activity, run `upsun get PROJECT_ID` to get the code, `cd` the resulting folder, and then move on to step 4.
 
    Get the demo repo by running:

    ```bash
    git clone git@github.com:platformsh/demo-project.git upsun-demo && cd upsun-demo
    ```

    Then push to Upsun

    ```bash
    upsun push -y --set-remote PROJECT_ID
    ```

4. Set resources

    > [!NOTE]
    > You can determine if you have already defined resources for the demo project with the command `upsun activity:list --type environment.resources.update --result=success`.
    > If you've successfully defined resources, there will be an entry in the table that says **Your Name updated resource allocation on Main**.
    >
    > If you see a successful `environment.resources.update` activity, move on to step 5.

    You first push for the demo project will fail because Upsun does not yet know what resources should be deployed. 
    Run the command below to complete the deployment.

    ```bash
    upsun resources:set --size '*:1'
    ```

5. View the environment

    You should be all caught up to resume the demo at this point. 
    Run `upsun url --primary` to view the environment, and visit https://console.upsun.com/projects/PROJECT_ID to view the project.

Welcome to Upsun!

## Contributing

Checkout the [Contributing guide](CONTRIBUTING.md) guide for more details.

### Running this project locally

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
