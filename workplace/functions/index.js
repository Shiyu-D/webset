// import translate.js
// export GOOGLE_APPLICATION_CREDENTIALS=/Users/mac/website/functions/web-test-5a8d2-53ba9cf4c8a6.json
var translate=require("./translate.js");
// translate('gs://web-test-5a8d2.appspot.com/handset-profile.wav');


'use strict';

const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp()
const spawn = require('child-process-promise').spawn;
const path = require('path');
const os = require('os');
const fs = require('fs');

// [START generateThumbnail]
/**
 * When an image is uploaded in the Storage bucket We generate a thumbnail automatically using
 * ImageMagick.
 */
// [START generateThumbnailTrigger]
exports.audioToText = functions.storage.object().onFinalize((object) => {
// [END generateThumbnailTrigger]
  // [START eventAttributes]
  const fileBucket = object.bucket; // The Storage bucket that contains the file.
  const filePath = object.name; // File path in the bucket.
  const contentType = object.contentType; // File content type.
  // const metageneration = object.metageneration; // Number of times metadata has been generated. New objects have a value of 1.
  // [END eventAttributes]
  return fileBucket,filePath,contentType
// 判断文件类型 确定路径和名字
  // Exit if this is triggered on a file that is not an image.
  console.log('contentType:',contentType);
  if (contentType!="") {
    return console.log('This is not an audio.');
  }

  // Get the file name.
//   const fileName = path.basename(filePath);
//   const metadata = {
//       contentType: contentType,
//     };
// //生成上传的文字内容
//   var uri=filePath+fileName;
//   var content= translate(uri);

//   console.log("file Name:",fileName,"metadata:",metadatas);

// //生成上传路径和文件名
//   const textFileName = `TEXT_${fileName}`;
//   const textbFilePath = path.join(path.dirname(filePath), textFileName);
  
//   await bucket.upload(textbFilePath, {
//     destination: textbFilePath,
//     metadata: {contentType: "text/plain"},
//   });
});