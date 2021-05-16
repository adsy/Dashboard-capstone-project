const express = require("express");
const router = express.Router();
const { Client } = require("pg");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
/* GET users listing. */
router.post("/login", (req, res) => {

  if (!req.headers.authorization || 
    req.headers.authorization.indexOf("Basic ") === -1) {
      return res.status(401).json({ message: "Missing Authorization Header" });
  } // verify auth credentials
  const base64Credentials = req.headers.authorization.split(" ")[1];
  const credentials = Buffer.from(base64Credentials, "base64").toString(
    "ascii"
  );
  // Get username and password from header
  const [username, password] = credentials.split(":");

  // Check if username and password in headers
  if (!username || !password) {
    res.status(400).json({ message: `No username or password in request` });
  } else {
    // Set query
    let query = "SELECT * FROM users WHERE email = $1";
    async function usersCheck() {
      //Create object to connect to database
      const client = new Client({
        user: process.env.CUBEJS_DB_USER,
        password: process.env.CUBEJS_DB_PASS,
        host: process.env.CUBEJS_DB_HOST,
        port: process.env.CUBEJS_DB_PORT,
        database: process.env.CUBEJS_DB_NAME
      });

      //Connect to databse
      client.connect().catch(err => {
        //Send error is error occurs
        res.status(400).json({
          message: `Error connecting to database, try again later...`
        })
      });

      await client.query(query, [username])
      // Hit database with query
        .then(result => {
          if (result) {
            //Compare hashing incoming password with hashed password in db
            bcrypt.compare(password, result.rows[0].password, function(
              err,
              res2
            ) {
              // Send error if hashing doesn't work
              if (err) {
                client.end();
                return res.status(500).send({
                  message: "Internal Server Error"
                });
              }
              if (res2 === true) {
                // Send back Cubejs JWT
                const cubejsToken = jwt.sign(
                  { u: { id: result.rows[0].account_id } },
                  process.env.CUBEJS_API_SECRET,
                  { expiresIn: "30d" }
                );
                client.end();
                console.log(cubejsToken);
                res.json({
                  Message: "Success",
                  areas: cubejsToken
                });
              } else {
                // If username and password does not match
                client.end();
                return res.status(401).send({
                  message: "Incorrect email or password try again"
                });
              }
            });
          } else {
            // Close connection to database
            client.end();
            // If username and password does not match
            return res.status(401).send({
              message: "Incorrect email or password try again"
            });
          }
        })
        .catch(e => {
          client.end();
          // If username and password does not match
          res.status(403).send(e);
        });
    }
    usersCheck();
  }
});



module.exports = router;
