// Update with your config settings.

module.exports = {

  development: {
    client: 'pg',
    connection: {
      filename: 'postgres://localhost/movie_tracker_backend',
      migrations: {
        directory: './db/migrations'
      },
      seeds: {
        directory: './db/seeds/dev'
      },
      useNullAsDefault: true
    }
  },

  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL + `?ssl=true`,
    migrations: {
      directory: './db/migrations'
    },
    useNullAsDefault: true
  }

};
