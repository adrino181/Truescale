const Memeber = require("../../models/guild/member.model");

const addMemeber = async ({ guildId, profileId }) => {
  const member = new Memeber({
    guildId,
    profileId
  })

  return member.save();
}

module.exports = addMemeber;
