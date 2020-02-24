const firebase = require('firebase');
var admin = require('firebase-admin');

var express = require('express');
var url = require('url');
var fs=require("fs");

var app = express();
var port=3000;
const hostname = '127.0.0.1';
const host = hostname + ':' + port;
var translate = require('./functions/translate.js');
var replace = require('./functions/replace.js');
var doRecommendation = require('./functions/recommendation.js')
// environment variable
// export GOOGLE_APPLICATION_CREDENTIALS=/Users/mac/website/workplace/functions/translate_key.json
// export GOOGLE_APPLICATION_CREDENTIALS=/Users/mac/website/web-test-5a8d2-firebase-adminsdk-idxvb-fd0d7685bd.json

// initial Firebase admin
admin.initializeApp({
  // credential: admin.credential.applicationDefault(),
  databaseURL: "https://web-test-5a8d2.firebaseio.com",
  credential: admin.credential.cert({
  "type": "service_account",
  "project_id": "web-test-5a8d2",
  "private_key_id": "3642464fea8eed1999531c5bab2045a3f537aa5f",
  "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQCg5iaxP37SUuOS\nn5B+Ypxbwn9KNwKNUlnVufErlDnWGsSbesAAPdEY957rWxZIbNp2h9YY5m2VOKDB\ndSA5QB9d82LQHpsHbJW9hlNsM3yzBJdprDwEy2PJIku7z7JmnlZvxzCbmPDOUDMA\nujwGgCx6vzFHfnowJm4PoeLsftJEE2RAd6nxjBOrEap54+QpjZv7b13fWR/w7G0R\n8QjYW81tqRmqRj2unIzaQzb5K/uqhBLzQlhJH0nemuLMQwAZjBu9JFnO6y/mubWC\nI9129NlqOuSGcIjS7JWKrQa1yf8XiKwxyZZrGU0g0a3VfaI1Lz8AOXyL6Nmp+5qE\nXLzjroidAgMBAAECggEAGWTps2zhj8FsUH5lmETpB6R1YZm4CeT278AGm8mrrSqR\nYDap6f/Xqhie2OeJ50li23VJ6akon3YODSp2uQJxUOsya8WA01WkdoKmVPv1UO3H\nFfMMj/cn2x1SFaTMs9yGqOKnvc8QJofK3PEHu0DshDz7wpxoHYRbN5Vl0sybVAn5\nQ3uqKuDQaqqfhYYEEe3qXilfExtdzGC//kVcyurQPGXGMXui6V6KbG1Sgm+ax1KJ\nH8Vypap0c+vRw7voeuBxc3NBGJl14Q67RvtoG/6PaJGPRC6oSJ7hXu0byUGbjBY9\nSijDu9+W9geR0NF7qwg0FfMB/H567722dlfb0muM4wKBgQDYtFqFM7KPpiCQoeJ9\nu4x8yGRfb03lAXI2g5soX8aDew2IjKKw6pwc8qpZq6NaUjg8iSl4Te576ndgdUTz\n5ZnjHNo8Bq6ANMuUDkStJCaSldfL4G5waXPvKcFS0Jt5ePY4OFAy30Lmuj5n4JI+\nSWpC3LQUeftGckkzfLMPLjXVTwKBgQC+Ez/wJanQwbU2zCY86cdZL7VKrhsF4Myu\nykunURRszXhlJC1SjcnRwQS2pkvTs0TVrT3gwg2YTJArMb1VeusSoBlLzuGIfafh\n4JsQA9ZSodLuuocW6GJpkrFy3k3MWYNPJjVK1IHlUJ8VMJ8AET5xHXesBUtHmfAM\nngwaxkegUwKBgEYIo2iA+KgsDEIxzzzLK+/341hkZEwqV3r+tVoq+cDsN8d1i+6Z\nI7LHSf6I1dYO1FXcDibvKK+rasElpQ8dmMopPO5BSovshA5pPhCmqkCdZIxjD84M\nhoc4e14ERPrQ+OHacTC/rqNadWikzx6KI2lQYnJrqaVusfGNz2CMkqFJAoGAVCMN\nQG5Llz7HynPf0ULinVYC+AXNrHJv6Edf6bZ4RhlF2++BqHNfDNxWC8vc8N7/7136\ncA02G154ysX/u2DnwZzg1a/EIbkNoWzc9t/b9UPwrQAgYEGJnpXyupgw8+4Ds/uD\nx5X90dY4NRcKqur3KvcSTDEju5QmsE8dqJRwjEUCgYAC7xY3DDbnPGc2rBKG2NQa\nUpQZg6MvJ/C6oVKEwLFLEc5arG3T0Yhx0E6WixAxWr8SQZa8Bl+2Zr2necwubIfn\nObBN5oTxqBulPI/PVs+AV96PN6PU+81PAcBZ/BnLIWsg61dcRIgczp9b0RCdrudH\n7KJLg9P2pmF+U+dfrsuUwg==\n-----END PRIVATE KEY-----\n",
  "client_email": "firebase-adminsdk-idxvb@web-test-5a8d2.iam.gserviceaccount.com",
  "client_id": "118309735325421834059",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-idxvb%40web-test-5a8d2.iam.gserviceaccount.com"

  })
  });
console.log("firebase admin intial successfull");

var db = firebase.firestore();
// Listen to database changes and convert speech to text when new submissions

db.collection("submissions")
  .onSnapshot(function(snapshot) {
      snapshot.docChanges().forEach(function(change) {
          // if (change.type === "added") {
            console.log("update！！！！");
            replace();
         // }
      });
  });


// get tokens
  var registrationTokens = new Array();

  db.collection("users_table")
  .onSnapshot(function(snapshot) {
      snapshot.docChanges().forEach(function(change) {
          tokens=change.doc.data().fcmToken;
        if (change.type === "added") {        
          registrationTokens.push(tokens);
          // console.log(registrationTokens);
        }
      });
    });

// do recommendation for users
// var token = new Array();
// db.collection("submissions")
//   .where("session","==","finish")
//   .onSnapshot(function(snapshot) {
//       snapshot.docChanges().forEach(function(change) {
//           if (change.type === "added") {
//             console.log("add finish book");
//             var finishbook = change.doc.data().book;
//             token.push(change.doc.data().token);
//             if(finishbook != undefined){
//               doRecommendation(finishbook,token);
//               console.log("finishbook",finishbook);
//             }

//           }
//       });
//   });


app.use(express.static("./"));





app.get("/admin_booklist", function(req, res) {


  console.log("in pushNotification",registrationTokens) 
  const message = {
    "tokens": registrationTokens,
    "apns": {
      "payload": {
        "aps": {
          "sound" : "default",
          "mutable-content" : 1,
          "category": "AcceptOrDecline",
          "alert": {
            "title":"Hi,you are invited  to read a book! ",
            "body": req.query.input_bookname,
          }
        },
        "media-url": req.query.url,
        "bookName":req.query.input_bookname,
        "author" : req.query.author,
        "start":req.query.Q1,
        "halfway":req.query.Q2,
        "finish":req.query.Q3
      }
    },
    "android": {
      "data": {
        "book_name": req.query.input_bookname,
        "action": "NEW_BOOK",
        "author":  req.query.author,
        "description": req.query.author,
        "Q1": req.query.Q1,
        "Q2": req.query.Q2,
        "Q3": req.query.Q3,
        "book_image":req.query.url,
      },
      "notification": {
        "title": "Hi,you are invited  to read a book! ",
        "body": req.query.input_bookname,
        "sound": "default", 
        "image": req.query.url,          
      }
    },
  }  
  console.log(message);  
  console.log("start send information");

  // admin.messaging().sendMulticast(message)
  //   .then((response) => {
  //   if (response.failureCount > 0) {
  //     const failedTokens = [];
  //     response.responses.forEach((resp, idx) => {
  //       if (!resp.success) {
  //         failedTokens.push(registrationTokens[idx]);
  //       }
  //     });
  //     console.log('List of tokens that caused failures: ' + failedTokens);
  //     }
  //   });
  });


app.listen(port, hostname, function() {

    console.log(`server run on http://${host}`);

});