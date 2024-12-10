const express = require("express");
const router = express.Router();
const HOSTED_ZONE_ID = 'Z09446571AHOOHMIG0YYZ';
const HOST_DOMAIN = 'truescale.in';
const AwsProvisionService = require('../services/provision.service')
const awsProvisionService = new AwsProvisionService(process.env.AWS_ACCESS_KEY,process.env.AWS_SECRET_ACCESS_KEY, 'ap-south-1');

router.post("/domain", async(req, res) => {
  try{
    const username = req.body.username;
    await awsProvisionService.createCustomSubdomain(username);
    //const certArn = await awsProvisionService.createSSLCertificate(username);
    //await awsProvisionService.createApiGatewayCustomDomain(username, certArn);
    //await awsProvisionService.createApiGatewayBasePathMapping();

    // send a welcome email
    // create a analytics website url
    // attach website url to profile
    res.status(200).json({
      message: "done", 
      data: 'SUCCESS',
    })
  } catch (e) {
    res.status(500).json({
      message: "Error", 
    })
    console.log('error', e);
  }
})

module.exports = router;