# Interview Scheduler

Interview Scheduler is a React application that allows users to book and cancel interviews. 

The Scheduler client application created using Create React App. Express is the basis for the [Scheduler Api](https://github.com/vkro/scheduler-api) server application.

Both servers run concurrently; requests are proxied from the Webpack development server to the API server.

## Getting Started

1. Fork this repository, then clone your fork.
2. Install dependencies using the `npm install` command.
3. The application uses two servers: the scheduler client (this) running on localhost port 8000, and the scheduler server ([scheduler-api](https://github.com/vkro/scheduler-api)) running on localhost port 8001.
4. Fork and clone the [scheduler-api](https://github.com/vkro/scheduler-api) into a new directory (NOT within the current scheduler directory) and follow the README.md instructions to configure and run the API server.

## Dependencies
- axios
- classnames
- normalize
- react

## Dev Dependencies
- babel
- storybook
- testing-library
  -  /react
  -  /react-hooks
  -  /jest-dom
- prop-types
- react-test-renderer

## Running Webpack Development Server

```sh
npm start
```

## Running Jest Test Framework

```sh
npm test
```

## Running Storybook Visual Testbed

```sh
npm run storybook
```
## Final Product
Schedule - appointment hover
![Schedule - appointment hover](https://github.com/vkro/scheduler/blob/master/docs/schedule-appointment-hover.png?raw=true)

Schedule - hover
![Schedule - hover](https://github.com/vkro/scheduler/blob/master/docs/schedule-hover.png?raw=true)

Appointment form
![Appointment form](https://github.com/vkro/scheduler/blob/master/docs/appointment-form.png?raw=true)

Scheduler - mobile
![Scheduler - mobile](https://github.com/vkro/scheduler/blob/master/docs/scheduler-mobile.png?raw=true)



## Contributions
Code to initiate the project and roadmap from [Lighthouse Labs](https://www.lighthouselabs.ca/). Debugging and ongoing code review from [@stella-zb](https://github.com/stella-zb). 