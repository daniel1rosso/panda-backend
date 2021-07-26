module.exports = {
  apps : [{
    script: 'node app.js',
    watch: '.'
  }, {
    script: './service-worker/',
    watch: ['./service-worker']
  }],

  deploy : {
    production : {
      user : 'danielserver',
      host : '24.232.94.111',
      ref  : 'origin/master',
      repo : 'git@github.com:daniel1rosso/panda-backend.git',
      path : '/home/danielserver/panda/panda-backend/',
      'pre-deploy-local': '',
      'post-deploy' : 'npm install && pm2 reload ecosystem.config.js --env production',
      'pre-setup': ''
    }
  }
};
