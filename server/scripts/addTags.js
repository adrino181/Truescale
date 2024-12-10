const express = require("express");
const cors = require("cors");
const csv = require('fast-csv');
const fs = require('fs');
require("dotenv").config();
const path = require('path');
const app = express();
let count = [];
fs.createReadStream(path.resolve('assets', 'industryData.csv'))
    .pipe(csv.parse({ headers: true }))
    // pipe the parsed input into a csv formatter
    .pipe(csv.format({ headers: true }))
    // Using the transform function from the formatting stream
    .transform(async (row, next) => {
        if(row["industry"].length === 0){
            return next(null, null);
        }
        count.push(row["industry"]);
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
    response: count,
  });
});


app.use(cors());
app.use(express.json());


const port = process.env.PORT || 4001;
app.listen(port, () => console.log(`Listening on port ${port}`));
