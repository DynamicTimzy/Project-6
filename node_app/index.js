const express = require('express');
const { Pool } = require('pg');

const app = express();

const pool = new Pool({
  host: 'localhost',
  user: 'devops',
  password: 'password',
  database: 'sharedappdb'
});

app.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT name FROM devs');
    const names = result.rows.map(row => `<li>${row.name}</li>`).join('');

    res.send(`
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Node.js Shared DB</title>
        <style>
         body {
  background-image: url('https://www.hindustantimes.com/ht-img/img/2023/04/08/1600x900/Israel_Adesanya_1_1680947960490_1680947970659_1680947970659.jpg');
  background-size: cover;
  background-position: center;
  font-family: Arial, sans-serif;
  color: white;
  margin: 0;
  padding: 0;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

h1 {
  font-size: 3em;
  margin-bottom: 20px;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.7);
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  font-size: 1.2em;
  margin: 10px 0;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 10px;
  border-radius: 5px;
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.7);
}


          .overlay {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.4);
          }

          .content {
            position: relative;
            z-index: 1;
          }

          footer {
            margin-top: 30px;
            font-size: 1em;
            opacity: 0.8;
          }
        </style>
      </head>
      <body>
        <div class="overlay"></div>
        <div class="content">
          <h1>Node.js app with shared DB is live!</h1>
          <ul>${names}</ul>
          <footer>CI-CD designed by DevOps Engineers:<br>
            Ayoyinka Kolawole | Adedotun Adegoke | Yomi Fatunbi
          </footer>
        </div>
      </body>
      </html>
    `);
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});

app.listen(3000, () => console.log('Node.js app listening on port 3000'));


// =====================================================

// const express = require('express');
// const { Pool } = require('pg');
// const app = express();

// const pool = new Pool({
//   host: 'localhost',
//   user: 'devops',
//   password: 'password',
//   database: 'sharedappdb'
// });

// app.get('/', async (req, res) => {
//   const result = await pool.query('SELECT name FROM devs');
//   const names = result.rows.map(row => `<li>${row.name}</li>`).join('');
//   res.send(`<h1>Node.js app with shared DB is up and running!</h1><ul>${names}</ul>`);
// });

// app.listen(3000, () => console.log('Node.js app listening on port 3000'));
