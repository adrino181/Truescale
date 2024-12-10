const express = require("express");
const router = express.Router();
const OpenAI = require("openai");
const verifyAuthToken = require("../utils/verifyAuthToken");


router.get("/", async (req, res) => {
  try {
    res.writeHead(200, {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive'
    });
    const userToken = req.query.token;
    const query = req.query.query;
    const isValidToken = await verifyAuthToken(userToken);
    if(!isValidToken || !query){
      throw new Error('Not allowed')
    }
    //sleep for 2sec
    await new Promise(resolve => setTimeout(resolve, 2000));

  const openai = new OpenAI({
    organization: process.env.OPENAI_ORG,
    apiKey: process.env.OPENAI_API_KEY,
});
 const stream = await openai.completions.create({
    model: "text-davinci-002",
    prompt: `create a blog on ${query} with minimum 2000 words`,
  temperature: 1,
  max_tokens: 296,
  top_p: 1,
  frequency_penalty: 0,
  presence_penalty: 0,
  stream: true,
  },{ responseType: 'stream' })
   
  //   response.data.on('data', data => {
  //     const lines = data.toString().split('\n').filter(line => line.trim() !== '');
  //     for (const line of lines) {
  //       const message = line.replace(/^data: /, '');
  //         if (message === '[DONE]') {
  //             res.end();
  //             return; // Stream finished
  //         }
  //         try {
  //             const parsed = JSON.parse(message);
  //             res.write('event: ping\n'); 
  //              res.write(`data: ${parsed.choices[0].text}`);
  //              res.write("\n\n");
  //         } catch(error) {
  //             console.error('Could not JSON parse stream message', message, error);
  //         }
  //     }
  // });  
  for await (const part of stream) {
    res.write('event: ping\n'); 
    res.write(`data: ${part.choices[0]?.text || ''}`);
    res.write("\n\n");
    //process.stdout.write(part.choices[0]?.delta?.content || '');
  }


  } catch (error) {
    res.end();
    console.error('closing the connection', error);
  }
});


module.exports = router;
