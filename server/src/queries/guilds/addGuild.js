const Guild = require('../../models/guild/guild.model');

const addGuild = async ({
  userId,
  headline,
  topics,
  imageUrl,
  handle,
  bio,
  website,
  backgroundUrl,
}) => {
  let guild = new Guild({
    primeAdmin:userId,
    headline,
    topcis: topics,
    imageUrl: imageUrl,
    backgroundUrl: backgroundUrl,
    handle,
    bio,
    website,
  });
  return guild.save();
}

module.export = addGuild;
