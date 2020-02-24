const firebase = require('firebase');
var admin = require('firebase-admin');

var express = require('express');
var translate = require('./translate.js');

var db = firebase.firestore();

console.log("firebase database intial successfull");


function doRecommendation(bookname,token){

  db.collection("books")
    .where("book", "==", bookname)
    .get()
    .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
          genre= doc.data().genre;
          findbook(bookname,genre,token);
          // console.log("in doRecommendation", bookname,"---",genre);  
      });
    })
    .catch(function(error) {
      console.log("Error getting documents: ", error);
    });
  };


function findbook(bookname,genre,token){
  db.collection("books")
    .where("genre", "==", genre)
    .get()
    .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
          var rbook= doc.data().book;
          console.log("in findbook",rbook);
        if (rbook !== bookname) {
          var url = doc.data().img;
          var author = doc.data().author;
          var Q1 = doc.data().start;
          var Q2 = doc.data().halfway;
          var Q3 = doc.data().finish;
          sendNotification(rbook,url,author,Q1,Q2,Q3,token);
          return;
        }
      });
    })
    .catch(function(error) {
      console.log("Error getting documents: ", error);
    });
  };


function sendNotification(input_bookname,url,author,Q1,Q2,Q3,token){

  const message = {

        "tokens": token,

        "apns": {
            "payload": {
              "aps": {
              "sound" : "default",
              "mutable-content" : 1,
              "category": "AcceptOrDecline",
              "alert": {
                "title":"Hi,you may be interested in this book! ",
                "body": input_bookname,
              }
            },
            "media-url": url,
            "bookName":input_bookname,
            "author" : author,
            "start":Q1,
            "halfway":Q2,
            "finish":Q3
            }
        },
      "android": {
        "data": {
          "book_name": input_bookname,
          "action": "NEW_BOOK",
          "author":  author,
          "description":author,
          "Q1": Q1,
          "Q2": Q2,
          "Q3": Q3,
          "book_image":url,
                },
        "notification": {
                    "title": "Hi,you may be interested in this book!",
                    "body": "body",
                    "sound": "default", 
                    "image": url,
                    
                          }
              },
        }
    console.log(message);
    console.log("start generate message");
    console.log(token);

        admin.messaging().sendMulticast(message)
        .then((response) => {
          if (response.failureCount > 0) {
            const failedTokens = [];
            response.responses.forEach((resp, idx) => {
              if (!resp.success) {
                token.push(token[idx]);
              }
            });
            console.log('List of tokens that caused failures: ' + failedTokens);
          }
        });
    console.log("finish send information");    
  }  


module.exports = doRecommendation;
