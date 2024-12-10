const express = require("express");
const cors = require("cors");
const csv = require('fast-csv');
const fs = require('fs');

require("dotenv").config();

const path = require('path');

const verifyAuthentication = require("../middlewares/auth.middleware");

const app = express();
const adminApp = express();
const connectToDB = require("../db/db");


connectToDB(process.env.DB_URL);




const Coverage = require('../models/coverage.model');


fs.createReadStream(path.resolve('assets', 'Log9-November.csv'))
    .pipe(csv.parse({ headers: true }))
    // pipe the parsed input into a csv formatter
    .pipe(csv.format({ headers: true }))
    // Using the transform function from the formatting stream
    .transform(async (row, next) => {
        let media = {
          fileUrl: row['Link'],
          media: row['Media '],
          coverageMedium: row['Type'],
          coverageArea: row['Edition'],
          coverageDate: row['Date'],
        }
        const coverage = await new Coverage({ user: '61b1e986c55ced6d37b3fef0', ...media });
        await coverage.save();
        return next(null, null);
    })
    .pipe(process.stdout)
    .on('end', () => process.exit())
    .on('error', function(err) {
      // do something with `err`
      console.log('error', err);
  });

app.get("/", (req, res) => {
  res.status(200).json({
    message: "Data fetched successfully.",
    response: "Welcome to the Probook API!",
  });
});


app.use(cors());
app.use(express.json());


const port = process.env.PORT || 4001;
app.listen(port, () => console.log(`Listening on port ${port}`));
