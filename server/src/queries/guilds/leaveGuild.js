const Memeber = require("../../models/guild/member.model");

const leaveGuild =  ({ profileId }) => {
  return Memeber.findOneAndDelete({
    profileId
  });
}

module.exports = leaveGuild;
