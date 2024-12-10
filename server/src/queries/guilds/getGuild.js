const Guild = require('../../models/guild/guild.model');
const getGuild = () => {
  return Guild.find().limit(10);
}
module.export = getGuild;
