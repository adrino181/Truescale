const Subscribe = require("../../models/subscribe.model");
//get a single post with view and data
const addOrchidSubscriber = async (email, profileId) => {
  try {
    const subscriber = new Subscribe({ email, profileId });
    return await subscriber.save();
  } catch (e) {
    throw new Error("Error in fetching data");
  }
};

module.exports = addOrchidSubscriber;
