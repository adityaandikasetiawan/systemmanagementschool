module.exports = {
  apps: [
    {
      name: 'baituljannah-backend',
      script: './src/backend/server.js',
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
      env: {
        NODE_ENV: 'production',
        PORT: 5000,
        // Update these with actual production values
        MONGO_URI: 'mongodb://localhost:27017',
        MONGO_DB_NAME: 'baituljannah_db',
        JWT_SECRET: 'production_secret_key_change_this',
        FRONTEND_URL: 'https://baituljannah.sch.id' 
      }
    },
    {
      name: 'baituljannah-frontend',
      script: './server.js', // This serves the static files from dist
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '500M',
      env: {
        NODE_ENV: 'production',
        PORT: 3000
      }
    }
  ]
};
