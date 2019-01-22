# Movie Tracker API

## Welcome to the Movie Tracker API!

## How to Use
Query the Movie Tracker API on Heroku: INSERT LINK HERE.

See [API Endpoints](#api-endpoints) below for endpoint details.

## Getting Started
This is a general guide to setting up a Recharge API development environment on your local machine.

### Dependencies
* Node.js, Express.js, and Knex.js
* PostgreSQL database
* Mocha and Chai for testing
* See package.json for a list of required modules

### Developers:
#### Get the app on your local machine
* Fork this repo using the `Fork` button in the upper right corner of this page.

* `Clone` your fork onto your local machine
```
git clone https://github.com/YOUR_GITHUB_USERNAME_HERE/movie-tracker-backend
```

* Jump into that directory on your local machine
```
cd movie-tracker-backend
```

* Add an upstream remote that points to the main repo:
```
git remote add upstream https://github.com/alexanderela/movie-tracker-backend.git
```

* Fetch the latest version of `master` from `upstream`
```
git fetch upstream master
```

#### Install and Start Server

* `npm install` all dependencies.

* `npm start` the development server.

#### Create Postgres Development Database and Run Migrations
*  Create a test database on your local machine:
```
psql CREATE DATABASE rechargeables
```

* Run migrations to set up your database schema
```
knex migrate:latest
```

* Seed your database
```
knex seed:run
```

#### Testing
* Create a testing database
```
psql CREATE DATABASE users_test
```
* Run tests in the test environment:
```
npm test
```

#### Linter
This project is going to be configured to use ESLint to automatically check for style and syntax errors.

You can use eslint against your changes: 
```
npm run eslint
```

### Contributing
This guide assumes that the git remote name of the main repo is `upstream` and that **your** fork is named `origin`.

Create a new branch on your local machine to make your changes against (based on `upstream/master`):
```
git checkout -b branch-name-here --no-track upstream/master
```
We recommend naming your branch using the following convention:
```
#(issueNumber)-feature-name-your-name
ex: 36-middleware-error-handling-alex
```

#### Contribute using GitHub Issues
* Click on the `Issues` tab at the top left of this page
* Choose one and work on your local machine to fix it  
  - We recommend naming your branch according to the above convention
  - Use TDD as much as possible and make sure there are both happy path and sad path tests for new endpoints  
  - Once the tests are passing, you can commit your changes. See [Making a great commit for more tips](https://github.com/openfoodfoundation/openfoodnetwork/wiki/Making-a-great-commit).  
```
git add .
git commit -m "Add a concise commit message describing your change here"
```
  - Before pushing to your fork, rebase your commits against the upstream master branch
```
git pull --rebase upstream master
```
  - Push your changes to a branch on your fork:
```
git push origin branch-name-here
```

#### Submitting a Pull Request
* Create a Pull Request (PR) to this repo's master using GitHub's UI
* Fill in the requested information re: what you worked on
* Keep your PR small, with a single focus

### API Endpoints
#### Users
```
POST/api/v1/users
--> returns a response body with an entire user (id, name, password, and email)

POST/api/v1/users/new
--> returns a response body with an id

POST/api/v1/users/favorites/new
--> returns a response body with an id

GET /api/v1/users/:user_id/favorites
--> returns a response body with an array of all favorite objects

DELETE /api/v1/users/:user_id/favorites/:movie_id
--> returns a response body with an id and a message

```
##### SAMPLE `GET` REQUEST
```
For user with id of 1

https://movie-tracker-backend-ae.herokuapp.com/api/v1/users/1/favorites

Expected response:

[
  {
      "id": 2,
      "cafe_name": "Ink! Coffee",
      "street_address": "618 16th St",
      "city": "Denver",
      "state": "CO",
      "zip_code": "80202",
      "cross_street": "btwn California & Welton",
      "formatted_address": "618 16th St (btwn California & Welton), Denver, CO 80202, United States",
      "distance_in_meters": 167,
      "station_id": 1,
      "created_at": "2018-12-08T01:10:38.015Z",
      "updated_at": "2018-12-08T01:10:38.015Z"
  }
]
```
##### SAMPLE CAFE QUERY
```
For specific cafe name, enter the following after path:

app.get('/api/v1/cafes?cafe_name=CAFE+NAME+HERE' or CAFE%20NAME%20COFFEE) where spaces are separated by + (plus) characters OR %20

SAMPLE `GET` REQUEST for cafe with name 'Perks Coffee'.

https://recharge-api.herokuapp.com/api/v1/cafes?cafe_name=Perks+Coffee

Expected response:

[
  {
      "id": 1,
      "cafe_name": "Perks Coffee",
      "street_address": "650 15th St",
      "city": "Denver",
      "state": "CO",
      "zip_code": null,
      "cross_street": null,
      "formatted_address": "650 15th St, Denver, CO, United States",
      "distance_in_meters": 32,
      "station_id": 1,
      "created_at": "2018-12-08T01:10:38.014Z",
      "updated_at": "2018-12-08T01:10:38.014Z"
  }
]
```

## Technologies Used
- JavaScript
- Node.js
- Express
- Knex.js
- Heroku

## Project Requirements
Project spec can be found [here](https://github.com/turingschool-examples/movie-tracker).

## Database Schema Wireframe
Recharge API has a one-to-many relationship between users and movies.
![An illustration of the database schema]()

## This README relied upon Open Food Source's extensive and excellent [Set Up](https://github.com/openfoodfoundation/openfoodnetwork/blob/master/GETTING_STARTED.md) and [Contibution](https://github.com/openfoodfoundation/openfoodnetwork/blob/master/CONTRIBUTING.md) docs.
