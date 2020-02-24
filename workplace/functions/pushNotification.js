const firebase = require('firebase');
var admin = require('firebase-admin');

var express = require('express');
var translate = require('./translate.js');

var db = firebase.firestore();

console.log("firebase database intial successfull");

var registrationTokens = new Array();
getToken();

// function pushNotification(){
  // console.log("in pushNotification",registrationTokens) 
  // const message = {
  //   "tokens": registrationTokens,
  //   "apns": {
  //     "payload": {
  //       "aps": {
  //         "sound" : "default",
  //         "mutable-content" : 1,
  //         "category": "AcceptOrDecline",
  //         "alert": {
  //           "title":"Hi,you are invited  to read a book! ",
  //           "body": req.query.input_bookname,
  //         }
  //       },
  //       "media-url": req.query.url,
  //       "bookName":req.query.input_bookname,
  //       "author" : req.query.author,
  //       "start":req.query.Q1,
  //       "halfway":req.query.Q2,
  //       "finish":req.query.Q3
  //     }
  //   },
  //   "android": {
  //     "data": {
  //       "book_name": req.query.input_bookname,
  //       "action": "NEW_BOOK",
  //       "author":  req.query.author,
  //       "description": "description",
  //       "Q1": req.query.Q1,
  //       "Q2": req.query.Q2,
  //       "Q3": req.query.Q3,
  //       "book_image":req.query.url,
  //     },
  //     "notification": {
  //       "title": "Hi,you are invited  to read a book! ",
  //       "body": req.query.input_bookname,
  //       "sound": "default", 
  //       "image": req.query.url,          
  //     }
  //   },
  // }  
  // console.log(message);  
  // console.log("start send information");

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
  // };
var registrationTokens = new Array();

function getToken(){
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
  };

module.exports = getToken;
