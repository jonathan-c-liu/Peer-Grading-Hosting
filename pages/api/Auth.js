const express = require("express");
const port = process.env.PORT || 8080;
// LTI middleware stuff
const lti = require("ltijs").Provider;
const Database = require("ltijs-sequelize");
const canvas_server_url = 'http://ec2-3-22-99-14.us-east-2.compute.amazonaws.com';


// Setup ltijs-sequelize using the same arguments as Sequelize's generic contructor
const lti_db = new Database('postgres', 'pga', 'Jas0n5468',
{
  host: 'peergrading.cxypn0cpzlbv.us-east-2.rds.amazonaws.com',
  dialect: 'postgres',
  logging: console.log
})

// Setup provider
lti.setup('LTIKEY', // Key used to sign cookies and tokens
{
  plugin: lti_db // Passing db object to plugin field
},
{ // Options
  appRoute: '/', loginRoute: '/login', // Optionally, specify some of the reserved routes
  cookies: {
    secure: false, // Set secure to true if the testing platform is in a different domain and https is being used
    sameSite: '' // Set sameSite to 'None' if the testing platform is in a different domain and https is being used
  },
  devMode: true // Set DevMode to true if the testing platform is in a different domain and https is not being used
}
)

// Set lti launch callback
  lti.onConnect((token, req, res) => {
  console.log(token)
  return res.send('It\'s alive!')
  })


  const setup = async () => {
  // Start LTI provider in serverless mode
  await lti.deploy({ serverless: true })


  // Register platform
  await lti.registerPlatform({
    url: canvas_server_url,
    name: 'Canvas',
    clientId: '12345',
    authenticationEndpoint: canvas_server_url + '/api/lti/authorize_redirect',
    accesstokenEndpoint: canvas_server_url + '/login/oauth2/token',
    authConfig: { method: 'JWK_SET', 
                  key: canvas_server_url + '/api/lti/security/jwks' }
  })

  //Get platform RSA key
  lti.getPlatform(canvas_server_url).then(async plat => {
    console.log('plat', plat)
    console.log(await plat.platformPublicKey())
  })

  }
  setup()

module.exports = lti