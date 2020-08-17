const express = require("express");
const next = require("next");
//const port = 8080;
const port = process.env.PORT || 8080;
const { Client } = require("pg");
const bodyParser = require('body-parser');

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();
//const db = require("./models");

// LTI middleware stuff
const LTI = require("./pages/api/Auth");

app
  .prepare()
  .then(() => {
    // EXPRESS SERVER
    const server = express();
    // connecting to database, connect function defined in /models/index.js
    (async () => {
      await db.connect();
    })();

    // Get express to populate req.body instead of undefined
    server.use(bodyParser.urlencoded({ extended: true }))
    server.use(bodyParser.json())


    /* To get these to work, we'll probably have to use lti.app.get or something */
    server.get("*", (req, res) => {
      return handle(req, res);
    });
    server.post("*", (req, res) => {
      return handle(req, res);
    });

    // LTI JS
      // Mount Ltijs express app into preexisting express app with /lti prefix
      server.use('/lti', LTI.app)

      // Initialize server 
      server.listen(port, (err) => {
        if (err) throw err;
        console.log(`> App running on ${port}`);
      });
  })
  .catch((ex) => {
    console.log("caught error");
    console.error(ex.stack);
    process.exit(1);
  });
