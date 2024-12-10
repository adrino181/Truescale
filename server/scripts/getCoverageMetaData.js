const express = require("express");
const cors = require("cors");
const urlMetadata = require('url-metadata');

require("dotenv").config({ path: '../.env' });


const path = require('path');

const verifyAuthentication = require("../middlewares/auth.middleware");

const app = express();
const connectToDB = require("../db/db");


connectToDB(process.env.DB_URL);

const Coverage = require('../models/coverage.model');


const parseCoverage = async (url) => {
  try{
    const urlData =  await urlMetadata(url);
    return urlData;
  } catch(e) {
    console.log(e);
  }
  return {};
}


app.get("/", async (req, res) => {
  const coverages = await Coverage.find({});
  coverages.map(async item => {
    if(item.fileUrl && item.fileUrl !== 'Print'){
      const coverageData = await parseCoverage(item.fileUrl);
      Coverage.findOneAndUpdate({_id: item._id}, {coverageMetaData: coverageData}, null, (err, result) => {
        if(err) {
          console.log(err, 'err in updating data');
        }
        console.log('result updated successfully');
      });
    } else {
      console.log(item.fileUrl);
    }
  });
  res.status(200).json({
    message: "Data fetched successfully.",
    response: "Welcome to the Probook API!",
  });
});


app.use(cors());
app.use(express.json());


const port = process.env.PORT || 4001;
app.listen(port, () => console.log(`Listening on port ${port}`));
