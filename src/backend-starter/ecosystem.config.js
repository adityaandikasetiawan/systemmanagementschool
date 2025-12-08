module.exports = {
  apps: [
    {
      name: 'baituljannah-api',
      script: 'dist/app.js',
      instances: 1,
      exec_mode: 'fork',
      env: {
        NODE_ENV: 'production',
        PORT: 3001
      },
      env_development: {
        NODE_ENV: 'development',
        PORT: 5000
      }
    }
  ]
};
