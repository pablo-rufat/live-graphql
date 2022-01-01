module.exports = {
    apps : [{
      name: 'Writers',
      script: 'src/index.ts',
      instances: 'max',
      max_memory_restart: '256M',
      env: {
        NODE_ENV: 'development'
      },
      env_production: {
        NODE_ENV: 'production'
      }
    }]
  };