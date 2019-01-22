const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use( bodyParser.json() );

app.set('port', process.env.PORT || 3000);
app.locals.title = 'Pet Box';
app.locals.pets = [
  { id: 'a1', name: 'Rover', type: 'dog' },
  { id: 'b2', name: 'Marcus Aurelius', type: 'parakeet' },
  { id: 'c3', name: 'Craisins', type: 'cat' }
];

app.get('/', (request, response) => {
	response.send('Oh hey Pet Box');
});

app.get('/api/vi/pets', (request, response) => {
	const pets = app.locals.pets;

	return response.json({ pets });
});

app.get('/api/vi/pets/:id', (request, response) => {
	const { id } = request.params;
	const pet = app.locals.pets.find(pet => pet.id === id);
	if(pet) {
		return response.status(200).json(pet);
	} else {
		return response.sendStatus(404);
	}
});

app.listen(app.get('port'), () => {
	console.log(`${app.locals.title} is running on ${app.get('port')}.`);
});