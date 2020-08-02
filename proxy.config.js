const proxy = [
    {
      context: '/api',
      target: 'http://localhost:8080',
      //target: 'https://sast-backend-test.herokuapp.com',
      secure: false,
      logLevel: 'debug',
      changeOrigin: true,
      //pathRewrite: {'^/api' : ''}
    }
  ];
  module.exports = proxy;