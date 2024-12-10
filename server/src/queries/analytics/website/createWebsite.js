const Website = require("../../../models/analytics/website.model");
const { randomString } = require("../../../utils/crypto");

const createWebsite = async ({ ...args }) => {
  let website;
  const { name, domain, profile } = args;
  try {
    website = new Website({
      name,
      domain,
      profile,
      shareId: randomString(),
    });
    await website.save();
    return website;
  } catch (e) {
    throw new Error("No Website Exist");
  }
};

module.exports = createWebsite;
