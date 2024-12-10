const Session = require('../../../models/analytics/session.model');

const createSession = async ({...args}) => {
    let session;
    const { hashId: sessionId,
        websiteId,
        hostname,
        browser,
        os,
        device,
        screen,
        language,
        country,
        subdivision1,
        subdivision2,
        city,} = args;
    try {
    
     session = new Session({
        hashId: sessionId,
        websiteId,
        hostname,
        browser,
        os,
        device,
        screen,
        language,
        country,
        subdivision1,
        subdivision2,
        city,
      });
     session = await session.save();
    }
    catch (e) {
        throw new Error("Error in creating session")
    }

    return session.toObject();
}

module.exports = createSession