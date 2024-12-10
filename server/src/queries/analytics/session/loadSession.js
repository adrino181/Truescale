const Session = require('../../../models/analytics/session.model');

const loadSession = async (sessionId) => {
    let session;
    try {
     session = await Session.findOne({
        hashId: sessionId
     }).lean();
    }
    catch (e) {
     throw new Error("No Session Exist")
    }
    return session;
}

module.exports = loadSession