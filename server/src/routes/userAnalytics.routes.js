const express = require('express');
const verifyAuthentication = require('../middlewares/auth.middleware');
const router = express.Router();
const { getProfileAnalytics } = require('../queries');
router.get('/', verifyAuthentication, async (req, res) => {
  const profileId = req.user._pid;
  try {
    const data = await getProfileAnalytics(profileId);
    const result = data[0];
    res.status(200).json({
      message: 'SUCCESS',
      ...result,
    })
  } catch (e) {
    res.status(403).json({
      message: "Bad Request"
    })
  }
});

module.exports = router;
