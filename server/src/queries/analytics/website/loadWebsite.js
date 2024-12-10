const Website = require('../../../models/analytics/website.model');

const loadWebsite = async (...args) => {
    let website;
    const {id} = args;
    try {
     website = await Website.findOne({
        id: id
     });
    }
    catch (e) {
        throw new Error("No Website Exist")
    }
    return website;
}

module.exports = loadWebsite