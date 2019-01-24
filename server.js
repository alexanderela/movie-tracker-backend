const express = require('express');
const bodyParser = require('body-parser');
const environment = process.env.NODE_ENV || 'development';
const configuration = require('./knexfile')[environment];
const database = require('knex')(configuration);
const app = express();

app.use(bodyParser.json());

app.set('port', process.env.PORT || 3000);
app.locals.title = 'users';

app.get('/api/vi/users', (request, response) => {
	database('users').select()
		.then((user) => {
			response.status(200).json(user);
		})
		.catch((error) => {
			response.status(500).json({ error: error.message });
		});
});

// app.use(express.static(path.join(__dirname, 'build')));

app.listen(app.get('port'), () => {
	console.log(`${app.locals.title} is running on ${app.get('port')}.`);
})

module.exports = app;