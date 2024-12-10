"use strict"




const socketUrl = 'http://127.0.0.1:8000/register'
//TODO
// Register Webscoketjjj
//
//




const register = (params) => {

  const prefix = 'ws://'
  const hasId = 'asd';
  const suffix = `${hashId}`
  const websocketUrl = `${prefix}/${suffix}`
  return websocketUrl

}



/**
 *
 * @param {string} topic Unique topic for each user, use the session hash for it
 * @param {string} id User Id unique to connection
 * Returns a payload with a session connection details
 */

const createSocketConnection = async (topic, id) => {
  try {
    const connectionPayload = await fetch(socketUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        topic: topic,
        user_id: id,
      }),
    });
    const payload = await connectionPayload.json();
    return payload;
  } catch (e) {
    console.log("error in fetching", e);
    return "";
  }
};

module.exports = { createSocketConnection };
