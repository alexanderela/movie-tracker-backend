const express = require('express');
const bodyParser = require('body-parser');
const environment = process.env.NODE_ENV || 'development';
const configuration = require('./knexfile')[environment];
const database = require('knex')(configuration);
const app = express();
const cors = require('cors');
const path = require('path');

app.use(cors());
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));
app.set('port', process.env.PORT || 3000);

app.locals.title = 'users';

app.get('/api/users', (request, response) => {
	database('users').select()
		.then((user) => {
			response.status(200).json(user);
		})
		.catch((error) => {
			response.status(500).json({ error: error.message });
		});
});

app.post('/api/users', (request, response) => {
	const user = request.body;

	for(let requiredParam of ['email', 'password']) {
		if(!user[requiredParam]) {
			response.status(422).json({ error: `Expected format: { email: <String>, password: <String> }. You're missing a "${requiredParam}" property.`});
		}
	}

	database('users').where('email', user.email)
		.select()
		.then(userIds => {
			response.status(201).json(userIds[0])
		})
		.catch(error => {
			response.status(500).json({ error: error.message });
		});
});

app.post('/api/users/new', (request, response) => {
	const user = request.body

	for(let requiredParam of ['name', 'email', 'password']) {
		if(!user[requiredParam]) {
			response.status(422).json({ error: error.message })
		}
	}

	database('users').insert(user, 'id')
		.then(userIds => {
			response.status(201).json({ id: userIds[0] })
		})
		.catch(error => {
			response.status(500).json({ error: error.message })
		})
});

app.post('/api/users/favorites/new', (request, response) => {
	const favorite = request.body

	for(let requiredParam of ['movie_id', 'user_id', 'title', 'poster_path', 'release_date', 'vote_average', 'overview']) {
		if(!favorite[requiredParam]) {
			response.status(422).json({ error: `Expected format: { movie_id: <String>, user_id: <String>, title: <String>, poster_path: <String>, release_date: <String>, vote_average: <String>, overview: <String> }. You're missing a "${requiredParam}" property.`})
		}
	}

	database('favorites').insert(favorite, 'id')
		.then(favorite => {
			response.status(201).json(favorite)
		})
		.catch(error => {
			response.status(500).json({ error: message })
		})
})

app.get('/api/users/:id/favorites', (request, response) => {
	const { id } = request.params

	database('favorites').where('user_id', id)
		.select()
		.then(favorite => response.status(200).json(favorite))
		.catch(error => response.status(500).json(`Error fetching favorite: ${error.message}`))
})

app.delete('/api/users/:id/favorites/:movie_id', (request, response) => {
	const { id, movie_id } = request.params

	database('favorites').where('movie_id', movie_id).del()
		.then(favorite => {
			response.status(201).json(id)
		})
		.catch(error => {
			response.status(500).json({ error: error.message })
		})
})

app.listen(app.get('port'), () => {
	console.log(`${app.locals.title} is running on ${app.get('port')}.`);
})

module.exports = app;
