
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {
          name: 'Alex',
          email: 'alex@turing.com',
          password:'password'
        },
      ]);
    })
    // .then(() => console.log('Seeding complete!'))
    // .catch(error => console.log(`Error seeding data: ${error}`))
};
