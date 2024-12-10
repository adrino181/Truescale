const Memeber = require("../../models/guild/member.model");

const joinGuild = async ({ guildId, profileId }) => {
  const member = new Memeber({
    guildId,
    profileId
  })

  return member.save();
}

module.exports = joinGuild;
