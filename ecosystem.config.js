module.exports = {
  apps: [{
    name: 'mathAdmin',
    script: 'node_modules/@vue/cli-service/bin/vue-cli-service.js',
    args: 'serve',
    env_production: {
      NODE_ENV: 'production'
    },
    env_development: {
      NODE_ENV: 'development'
    }
  }]
}
