'use strict';
  // Imports the Google Cloud client library
  // export GOOGLE_APPLICATION_CREDENTIALS=/Users/mac/website/workplace/functions/web-test-5a8d2-53ba9cf4c8a6.json
const speech = require('@google-cloud/speech');

async function main(gcsUri) {
  const client = new speech.SpeechClient();
  // gcsUri = 'gs://web-test-5a8d2.appspot.com/audio/10D9745F-E9DC-44FC-B0B1-859F5A8D1144.m4a';
  const encoding = 'LINEAR16';
  // if (true) {
  //   const sampleRateHertz = 48000;
  // }else{
  const sampleRateHertz = 48000;
  // }
  
  const languageCode = 'en-US';

  const config = {
    encoding: encoding,
    sampleRateHertz: sampleRateHertz,
    languageCode: languageCode,
  };

  const audio = {
    uri: gcsUri,
  };

  const request = {
    config: config,
    audio: audio,
  };

  // Detects speech in the audio file. This creates a recognition job that you
  // can wait for now, or get its result later.
  const [operation] = await client.longRunningRecognize(request);
  // Get a Promise representation of the final result of the job
  const [response] = await operation.promise();
  const transcription = response.results
    .map(result => result.alternatives[0].transcript)
    .join('\n');
  console.log(`Transcription: ${transcription}`);
  return transcription;
};

// main();
module.exports = main;