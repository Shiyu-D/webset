// 弹窗提示
// window.alert("oh..seems something wrong!")\
// document.write("<script src='https://www.gstatic.com/firebasejs/7.6.2/firebase-app.js'></script>");
// document.write("<script src='https://www.gstatic.com/firebasejs/7.6.2/firebase-firestore.js'></script>");
// document.write("<script src='https://www.gstatic.com/firebasejs/7.6.2/firebase-analytics.js'></script>");

document.write("<script language=javascript src='js/charts.js'></script>");
document.write("<script language=javascript src='js/dark.js'></script>");

firebase.initializeApp({
  apiKey: "AIzaSyAlgzQSNUpnISU81PQkV9toP-0acWg5CnI",
  authDomain: "web-test-5a8d2.firebaseapp.com",
  databaseURL: "https://web-test-5a8d2.firebaseio.com",
  projectId: "web-test-5a8d2",
  storageBucket: "web-test-5a8d2.appspot.com",
  messagingSenderId: "1076510015066",
  appId: "1:1076510015066:web:6c786b4bd2fe34e113a263",
  measurementId: "G-2FWWT78R2H",
  });
firebase.analytics();
var db = firebase.firestore();
var storage=firebase.storage();

var booknameID=11;
// write books infor in firestore
function saveDataIn(){
  var bookname = document.getElementById("bookname").value;
  var author=document.getElementById("author").value;
  var genre=document.getElementById("genre").value;
  var Q1=document.getElementById("Q1").value;
  var Q2=document.getElementById("Q2").value;
  var Q3=document.getElementById("Q3").value;
  var url=document.getElementById("url");
  console.log(bookname,author,genre,Q1,Q2,Q3,url,"book"+booknameID);
  if(url == null){
    alert ("please upload the cover of the book!") 
   self.location = 'admin_addbook.html';   
                 

  }else if (bookname==''||author==''||genre==''||Q1==''||Q2==''||Q3 ==''){
   alert ("please fill all information of the book!") 
   self.location = 'admin_addbook.html';                   
  }else {
  console.log(bookname,author,genre,Q1,Q2,Q3,url,"book"+booknameID);
  // set add update

  db.collection("books")
    .doc("book"+booknameID)
    .set({
      book: bookname,
      author:author,
      genre:genre,
      start:Q1,
      halfway:Q2,
      finish:Q3,
      img: url.value
    }).then(function(docRef) {
        console.log("Document written with ID: ");
         alert("Uploaded successfully！:) ")
         self.location = 'admin_booklist.html';

    }).catch(function(error) {
        console.error("Error adding document: ", error);
    });
    booknameID++;
   
   }

 }

function onFilePicked(event) {

  var input = event.target;
  var file = input.files[0];
  console.log(file.name);

  var storageRef = firebase.storage().ref();

  var metadata = {contentType: 'image/jpeg'};

  // Upload file and metadata to the object 'images/mountains.jpg'
  var uploadTask = storageRef.child('CoverImage/' + file.name).put(file, metadata);

  // Listen for state changes, errors, and completion of the upload.
  uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
  function(snapshot) {
    // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
    var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    console.log('Upload is ' + progress + '% done');
    switch (snapshot.state) {
      case firebase.storage.TaskState.PAUSED: // or 'paused'
        console.log('Upload is paused');
        break;
      case firebase.storage.TaskState.RUNNING: // or 'running'
        console.log('Upload is running');
        break;}
        }, function(error) {
        // Handle unsuccessful uploads
      }, function() {
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
          console.log('File available at', downloadURL);
          var string= '<input id="url" value = "'+downloadURL+'">';
          addImg.innerHTML = string;    

        });
      });
  }

function login(){
  var username=document.getElementById("username").value;
  var password=document.getElementById("password").value;

  // console.log(username,password)
  if (username==''){
      if (password=='') {
          $('.tip1').show();
          $('.tip2').show();
        }else{
          $('.tip1').show();
          $('.tip2').hide();  
              }
    }else{
          $('.tip1').hide();
          $('.tip2').hide();
          db.collection("admin")
              .where("account", "==", username)
              .get()
              .then(function(querySnapshot) {
                if(querySnapshot.size==0){
                  $('.tip1').show() 
                  // console.log("bbbbbbbbbbbbb",querySnapshot.size);
                }
                else{
                  querySnapshot.forEach(function(doc) {
                    const dataset=doc.data();
                    if (dataset.password==password){ 
                        self.location='admin_booklist.html';
                        sessionStorage.setItem('admin',123456);
                        console.log("successful setting the session of admin.");
                    }
                    else {
                      $('.tip2').show() 
                    }; 
                  })
                };
                });
      };
 }

// ....the part of showing comments and show audio ..............................................
// change the color of label
function changeLabelInResult(stage){

  if (stage === "halfway"){
    labelChangeInResults.innerHTML = '<li><a href="javascript:getpageParams(nameID,imageID,start)">Book beginning</a></li>'+
                            '<li><a class="label_active" href="javascript:getpageParams(nameID,imageID,halfway)">Middle of books</a></li>'+
                            '<li><a href="javascript:getpageParams(nameID,imageID,finish)">Last part of the book </a></li>'
  }else if (stage === "finish"){
    labelChangeInResults.innerHTML = '<li><a href="javascript:getpageParams(nameID,imageID,start)">Book beginning</a></li>'+
                            '<li><a href="javascript:getpageParams(nameID,imageID,halfway)">Middle of books</a></li>'+
                            '<li><a class="label_active" href="javascript:getpageParams(nameID,imageID,finish)">Last part of the book </a></li>'
  }else{
    labelChangeInResults.innerHTML = '<li><a class="label_active" href="javascript:getpageParams(nameID,imageID,start)">Book beginning</a></li>'+
                            '<li><a href="javascript:getpageParams(nameID,imageID,halfway)">Middle of books</a></li>'+
                            '<li><a href="javascript:getpageParams(nameID,imageID,finish)">Last part of the book </a></li>'
    }
  }

// gain book question from firestore 
function getBookQuestion(bookname,position){
  var data=sessionStorage.getItem("admin");
  if (data != undefined) {
    if (position!="") {
      db.collection("books")
        .where("book", "==", bookname)
        .get()
        .then(function(querySnapshot) {
            querySnapshot.forEach(function(doc) {
            var dataset=doc.data();
            questions.innerHTML += "<a href="+ "#" +">"+dataset[position]+"</a>"; 
            // console.log(doc.id, " => ", doc.data());
            // console.log( dataset[position]);
          });
        })
        .catch(function(error) {
          console.log("Error getting documents: ", error);
        });
      };  

  // window.onload=function(){
  // const list_div=document.querySelector("#list_div");
  // const audio_div=document.querySelector("#audio_div");
  // vision 1
  //  db.collection("users")
  //    // .where("capital", "==", true)
  //     .get()
  //     .then(function(querySnapshot) {
  //         querySnapshot.forEach(function(doc) {    
  //             list_div.innerHTML = "<div class='list-item'><h3>" 
  //             +doc.data().name+ "</h3></div>"
  //         });
  //     });
  // }


  // vision2  realtime show
  // db.collection("userss")
  //  .where("name", "==", "barbara")
  //   .onSnapshot(function(snapshot) {
  //       snapshot.docChanges().forEach(function(change) {
  //           if (change.type === "added") {
  //           list_div.innerHTML = "<div class='list-item'><h3>"+change.doc.data().name+"</h3></div>";
  //           audio_URL="https://firebasestorage.googleapis.com/v0/b/web-test-5a8d2.appspot.com/o/audio%2F09hcuvUOum3dwGHpz2Cc_2.wav?alt=media&token=29163eca-76dc-4843-9a12-d8e9c12561ee"
  //           audio_div.innerHTML = "<source src="+ audio_URL+ "type=" + "audio/x-m4a"+">";
  //          }
  //       });
  //   });
    }  
  }     

// gain book comments from firestore 
function getBookComments(bookname,position){
  var data=sessionStorage.getItem("admin");
  
  if (data == undefined) {
    comment_Block.innerHTML=""
  }else{
    var i=1;
    var db1 = firebase.firestore();
    db1.collection("submissions")
      .where("book", "==", bookname)
      .where("session", "==", position)
      .get()
      .then(function(querySnapshot) {
          querySnapshot.forEach(function(doc) {  
              // console.log(" data => ", doc.data());
              var audio=doc.data().audioStorageURL;
              var text = doc.data().text;
              createDiv(i,audio,text);
              i++;    
            });
      })
      .catch(function(error) {
        console.log("Error getting documents: ", error);
      });
    }  
  }  


  // db.collection("users")
  //     .where("name", "==", bookname)
  //     .get()
  //     .then(function(querySnapshot) {
  //         querySnapshot.forEach(function(doc) {
          
  //         var dataset=doc.data();
  //         questions.innerHTML += "<a href="+ "#" +">"+dataset[position]+"</a>"; 
  //         // console.log(doc.id, " => ", doc.data());
  //         console.log("test:"+ dataset[position]);
  //       });
  //     })
  //     .catch(function(error) {
  //       console.log("Error getting documents: ", error);
  //     });
  
// Generate comments in a loop, index is the name of Div and data is audio URL
function createDiv(index,audio,text){
  // index,data
  // $=function(o){return document.getElementById(0)}
  // var index="1"
  // var data="https://firebasestorage.googleapis.com/v0/b/web-test-5a8d2.appspot.com/o/audio%2FOpIwp2xH7OQ6ukBdbVrB-start.m4a?alt=media&token=c6fe7d28-ee64-473a-a3c2-be623c8c4cb7"
  var divString ='<div class="word" id="comment_'+index+'">'+
          '<div class="main-list" id="list_div">'+
          '<div class="list-item"></div>'+
          '</div>'+
          '<H3>'+ text+'</H3>'+
          '<audio  controls="" name="media" id="audio_div">'+
          'audio_div.innerHTML = "<source src='+ audio +'type=" + "audio/x-m4a"+">"'+
          '</audio>'+
          '<HR style="opacity:0.3;position: relative;top: 30px;" width="100%"color=#FFFFFF SIZE=1>'+ 
          '</div>';

  var oldDivID="comment_"+(index-1);
  // console.log("oldDiv:",oldDivID);      
  var newDivID="comment_"+index;
  // console.log("newDiv:",newDivID);

  var newDiv = document.createElement(newDivID); // 新增元素
    newDiv.id = newDivID;
    newDiv.style.font = "bold 14px" ;
    newDiv.color = "green";
    newDiv.innerHTML = divString;
  var diva = document.getElementById(oldDivID); // 获取id为a的元素
  diva.parentNode.insertBefore(newDiv, diva); // 在这个元素前面增加上去
  // console.log("add div successful")  

  }

// get parameter from href in booklist page(Passing parameters between webpage)
function getParams(key) {
  var reg = new RegExp("(^|@)" + key + "=([^@]*)(@|$)");
  var r = window.location.search.substr(1).match(reg);
  if (r != null) {return unescape(r[2]);}
  else{
    console.log("there is no parameter")
  };
  }

// write parameters in href in results page
function getpageParams(v1,v2,v3){

  window.location.href="results.html?param1="+v1+"@param2="+ v2 +"@param3="+v3;
  };  
// .....................................................................


// ....booklist page  query and show data ..............................................
// get data from fire base for booklist page
async function getallChartInfor(classificationlist){
  // var classificationlist=new Array("gender","age","continent","educationLevel");
  // var classificationlist="age";
  var cla= new Array();
  var j=0;
  if (classificationlist=='gender') {
    cla=['Male','Female'];
  }else if (classificationlist=='age') {
    cla=['10-19','20-29','30-39','40-49','50+'];
  }else if (classificationlist=='continent') {
    cla=['Asia', 'Africa', 'Australia', 'Europe', 'North America', 'South America', 'Antarctica'];
  }else if (classificationlist=='educationLevel') {
    cla= ['Certificate', 'Diploma', 'Bachelor Degree', 'Postgraduate Degree'];

  }; 

      // console.log(classificationlist,cla);
      const result =await getchartInfo(classificationlist,cla);
      console.log("return",result);
      return result;
 }

// call back for data in booklist page
async function asyncCC(datalist,cla){
  const lalala= getchartInfo(datalist,cla);
  return  getchartInfo(datalist,cla);
  }

// get a genre and return a list 
async function getchartInfo(listName,claList){
  var bookname=["To Kill a Mockingbird", "Pride and Prejudice", "Lebs", "The Swan Book", "The Big Sleep", "Gone Girl", "Lord of the Rings: Fellowship of the Ring", "The Fifth Season", "Eleanor and Park", "Harry Potter and the Philosopher's Stone"];
  var bookData=new Array();
  var Book_Age=new Array();
  var n=0;
  var m=0
  for (var i =0; i < claList.length; i++) {
    // find the specific age 
    for (var j =0; j < bookname.length; j=j+2) {
           let query= db.collection("users")
                        .where(listName, "==", claList[i])
                        .where("book","in",[ bookname[j],bookname[j+1]]);
            // find specific genre(book)
            console.log("still processing...");
            var a= new  Promise(function(resolve, reject){
                        query.get().then(
                        function(querySnapshot) { 
                          
                        bookData[n] = querySnapshot.size;
                        n++;
                       
                        if (bookData.length== 5 ) {
                          Book_Age[m]=bookData;
                          // console.log("bookData",bookData)
                          bookData=[];
                          n=0;
                          m++;
                          if (Book_Age.length==claList.length) {
                            // console.log("claList.length:",claList.length);
                            // console.log("Book_Age:",Book_Age)
                            resolve(Book_Age);
                          }
                        }          
                      })   

                  })
          };
      };
      // console.log("finalreturn in getchartInfo:",a);
      return await a;
    }
// get chart data in booklist page (change classification )

function Getchart2(dataSet,classification){

  var cla=new Array();
  if (classification=='gender') {
      cla=['Male','Female'];
      dataSet = [[6,8,13,24,7],[12,8,9,11,16]];
    }else if (classification=='age') {
      cla=['10-19','20-29','30-39','40-49','50+'];
      dataSet = [[5,3,2,9,3],[2,5,7,5,10],[2,9,12,5,7],[9,6,3,5,3],[7,4,7,2,4]];
    }else if (classification=='continent') {
      cla=['Asia', 'Africa', 'Australia', 'Europe', 'North America', 'South America', 'Antarctica'];
    }else if (classification=='educationLevel') {
      cla= ['Certificate', 'Diploma', 'Bachelor Degree', 'Postgraduate Degree','Postgraduate Degree'];
    }; 
    console.log("dataSet",dataSet);
  var series = new Array();
  for (var i = 0; i <cla.length; i++) {
    series[i] = {
                  name: cla[i],
                  type: 'bar',
                  stack: '总量',
                  label: {
                      show: false,
                      position: 'insideRight'
                  },
                  data: dataSet[i]
              };
         }
  // console.log("series in Getchart2:",series);

  var app = {};
      option = null;
      option = {
          tooltip: {
              trigger: 'axis',
              axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                  type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
              }

          },
          legend: {
              data: cla,

          
          },
          grid: {
              left: '3%',
              right: '4%',
              bottom: '3%',
              containLabel: true
          },
          xAxis: {
              type: 'value'
          },
          yAxis: {
              type: 'category',
              data: ['Classic Literature', 'Contemporary Literature', 'Crime Thriller', 'Fantasy', 'Young Adult']
          },
          series: series
      };;
      if (option && typeof option === "object") {
        // console.log(option);
        return option;
      }


  }

// show data in booklist chart
async function  showChart2(classification){
  var dom = document.getElementById("container");
  var myChart = echarts.init(dom,'dark');
  labelChangeInBooklist(classification);

  var dataSet = await getallChartInfor(classification);

  // console.log("dataSet in showchart", dataSet);

  myChart.setOption(Getchart2(dataSet,classification), true);
 
  };

function labelChangeInBooklist(classification){
  // testtest.innerHTML = '<H1>lalalalallalala</H1>'
    if (classification === 'gender') {
  //     console.log("in add gender! add finish") ;
      testtest.innerHTML = '<ul><li><a class="label_active" onclick="showChart2(\'gender\')">gender </a></li>'+
                      '<li><a onclick="showChart2(\'age\')">age </a></li>'+
                      '<li><a onclick="showChart2(\'continent\')">continent</a></li>'+
                      '<li><a onclick="showChart2(\'educationLevel\')">educationLevel </a></li></ul>'
  }else if (classification === 'age'){
      console.log("in add age! add finish") ;
      testtest.innerHTML = '<ul><li><a onclick="showChart2(\'gender\')">gender </a></li>'+
                      '<li><a class="label_active"  onclick="showChart2(\'age\')">age </a></li>'+
                      '<li><a onclick="showChart2(\'continent\')">continent</a></li>'+
                      '<li><a onclick="showChart2(\'educationLevel\')">educationLevel </a></li></ul>'
    }else if (classification === "continent"){
      testtest.innerHTML = '<ul><li><a onclick="showChart2(\'gender\')">gender </a></li>'+
                      '<li><a onclick="showChart2(\'age\')">age </a></li>'+
                      '<li><a class="label_active"  onclick="showChart2(\'continent\')">continent</a></li>'+
                      '<li><a onclick="showChart2(\'educationLevel\')">educationLevel </a></li></ul>'
   }else{
      testtest.innerHTML = '<ul><li><a onclick="showChart2(\'gender\')">gender </a></li>'+
                      '<li><a onclick="showChart2(\'age\')">age </a></li>'+
                      '<li><a onclick="showChart2(\'continent\')">continent</a></li>'+
                      '<li><a class="label_active"  onclick="showChart2(\'educationLevel\')">educationLevel </a></li></ul>'
   }


  }

// .....................................................................


// ....booklist page  query and show data ..............................................
// get data from fire base for emotion page
async function countList(bookname,position){
    console.log("In countList...");
    cla=['sad','happy','neutral','shocked','angry'];  
    var obj = {}; 
    for(var i= 0, l = cla.length; i< l; i++){  
        obj[cla[i]] = await getchartInfo3(bookname,position,cla[i]); ; 
    } 
    console.log("dic in countList:",obj);
    return obj;  
    }

async function getchartInfo3(bookname,position,cla){  
  console.log(bookname,position,cla);
  var db = firebase.firestore();
  let query=db.collection("submissions").where("book", "==", bookname).where("session", "==", position).where("emotion", "==", cla);
  var  a= new  Promise(function(resolve, reject){
       query.get().then( function(querySnapshot) {
              // console.log("size:",querySnapshot);
              resolve(querySnapshot.size);
            })
            .catch(function(error) {
              console.log("Error getting documents: ", error);
            });  
          });
  // console.log(" result in  getchartInfo3=> ",await a); 
  return await a; 

  }

// get chart data in results page(only enmotion)
function Getchart(dic){
  dic = [22,14,5,10,19];
  // var cla=new Array();
  // if (classification=='emotion') {
  cla=['sad','happy','neutral','shocked','angry']; 
  // }else if (classification=='gender') {
  //     cla=['male','female','other','other','other'];
  // }else if (classification=='age') {
  //     cla=['10-19','20-29','30-39','40-49','50+'];
  // }else if (classification=='region') {
  //     cla=['Asia', 'Africa', 'Australia', 'Europe', 'North America', 'South America', 'Antarctica'];
  // }else if (classification=='education') {
  //     cla= ['Certificate', 'Diploma', 'Bachelor Degree', 'Postgraduate Degree','Postgraduate Degree'];
  //   };        
 // console.log("dic in Getchart",dic);
  var dataList = new Array();
  for (var i = 0; i < cla.length; i++) {
    dataList[i]={value: dic[i], name: cla[i]}
 
    // dataList[i]={value: dic[cla[i]], name: cla[i]}
  };
  console.log("dataList in Getchart",dataList);

  var app = {};
  option = null;
  option = {
      tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b}: {c} ({d}%)'
      },
      legend: {
          orient: 'horizontal',
          left:80,
          top:450,
          data: cla
      },
      series: [
          {
              name: '',
              type: 'pie',
              radius: ['50%', '70%'],
              avoidLabelOverlap: false,
              label: {
                  normal: {
                      show: false,
                      position: 'center'
                  },
                  emphasis: {
                      show: true,
                      textStyle: {
                          fontSize: '20',
                          fontWeight: 'bold'
                      }
                  }
              },
              labelLine: {
                  normal: {
                      show: false
                  }
              },
              data: dataList
          }
      ]
  };
  ;
  if (option && typeof option === "object") {
    // container.innerHTML = "<div id='container' style="height:500%">" 
    //   +myChart.setOption(option, true)+ "</div>"

    // document.getElementById("container").innerHTML=myChart.setOption(option, true);
    // console.log(option);
    return option;
  };
  };

// show data in chart in results page
async function showChart(bookname,position){
  var dic=await countList(bookname,position);
  var dom = document.getElementById("container");
  var myChart = echarts.init(dom,'dark');
  // console.log("dic in showchart:",dic);
  myChart.setOption(Getchart(dic),true);
  };
// .....................................................................




// add audio_to_text results in comments part
function audioToText(URL){


  var text="我说的"
  list_div.innerHTML = "<div class='list-item'><h3>"+ text +"</h3></div>"
  }

// Get the URL of the book image.
async function getImgUrl(bookname){
  var db = firebase.firestore();
  let query=db.collection("books").where("book", "==", bookname);
  var  a= new  Promise(function(resolve, reject){
       query.get().then( function(querySnapshot) {
          querySnapshot.forEach(function(doc) {
              var ImgUrl=doc.data().img;
              resolve(ImgUrl);
              });
              
            })
            .catch(function(error) {
              console.log("Error getting documents: ", error);
            });  
          });
    return a;
  }

// Generate a transparent input box, take the value and send it to the server.
async function genrateBtn(){
  console.log("genrateBtn");
  var dic = {};
  var table=document.getElementById("tableId");
  var rows=table.rows;
  var bookname = rows[notification_id].cells[1].innerHTML;
  var author = rows[notification_id].cells[2].innerHTML
  var Q1 = rows[notification_id].cells[4].innerHTML;
  var Q2 = rows[notification_id].cells[5].innerHTML;
  var Q3 = rows[notification_id].cells[6].innerHTML;
  var url = await getImgUrl(bookname);
 console.log("bookname",bookname,author);
  var string = '<div  class="content" style="float: left;">'+
                  '<form action="http://127.0.0.1:3000/admin_booklist" method="get" accept-charset="utf-8">'+
                      '<div style="display: none;" class="row">'+
                      
                          '<div class="col-md-5">'+

                              '<div class="form-group">'+
                                  '<label>Book name</label>' +
                               '<input name="input_bookname" value = "'+ bookname + '">'+
                              '</div>'+

                              '<div class="form-group">'+
                                  '<label>author</label>' +
                               '<input name="author" value = "'+ author + '">'+
                              '</div>'+

                              '<div class="form-group">'+
                                  '<label>Q1</label>' +
                               '<input name="Q1" value = "'+ Q1 + '">'+
                              '</div>'+

                              '<div class="form-group">'+
                                  '<label>Q2</label>' +
                               '<input name="Q2" value = "'+ Q2 + '">'+
                              '</div>'+

                              '<div class="form-group">'+
                                  '<label>Q3</label>' +
                               '<input name="Q3" value = "'+ Q3 + '">'+
                              '</div>'+

                              '<div class="form-group">'+
                                  '<label>url</label>' +
                               '<input name="url" value = "'+ url + '">'+
                              '</div>'+
                       '   </div>'+
                      '</div>'+

                     ' <div class="text-center">'+
                      '<button  type="submit" onclick="alertSucc()" class="btn btn btn-primary mt-3 mb-0"  ><span class="ti-user">     INVITE PARTICIPANTS</button>' +  
                      '</div>'+
                       '<div class="clearfix"></div>'+
                  '</form>'

  genrateButton.innerHTML=string;                

  }


function alertSucc(){
  alert("Push successfully~!")
  }

// gain book information from firestore 
async function getBookInfo(){
  var size = 10;
  var n=1;
  let query=db.collection("books");
  var list = {};
  var  a= new  Promise(function(resolve, reject){
       query.get().then( function(querySnapshot) {
        
        querySnapshot.forEach(function(doc) { 
        // console.log("querySnapshot",doc.data()) 
        // console.log(" docname =>",docName );
              // console.log(" n => ",n);  
          const book=doc.data().book;
          const author=doc.data().author;
          const genre=doc.data().genre;
          const Q1=doc.data().start;
          const Q2=doc.data().halfway;
          const Q3=doc.data().finish;
          
          list["book"+n] = book;
          list["author"+n] = author;
          list["genre"+n] = genre;
          list["Q1"+n] = Q1;
          list["Q2"+n] = Q2;
          list["Q3"+n] = Q3;
          list["n"+n]=n;
          n++;
          if (n==size+1) {   
          resolve(list);
          // console.log("resolve rlist",list)
        }    
              });

            })
            .catch(function(error) {
              console.log("Error getting documents: ", error);
            }); 
             
          });
    return a;
  }


async function creatTableString(){
  all_infor = await getBookInfo(10);
  console.log("creatTableString",all_infor);
  var list = new Array(); 
  var string = ""
  for (var i = 1; i < 12; i++) {
  var index=i
  var book =  all_infor ["book"+i];
  var author = all_infor["author"+i];
  var genre= all_infor["genre"+i] ;
  var Q1=  all_infor ["Q1"+i];
  var Q2=  all_infor ["Q2"+i];
  var Q3=  all_infor ["Q3"+i];
  console.log (i,book,author,genre,Q1,Q2,Q3);
  string +='<tr><td ><div class="custom-control custom-checkbox"> <input name="single_chose" class="custom-control-input" type="radio" id="'+index+'"> <label class="custom-control-label" for="'+index+'"></label></div></td> <td name="input_bookname" >'+book+'</td><td name="Author">'+author+'</td><td name="Genre">'+genre+'</td><td name="Q1">'+Q1+'</td><td name="Q2">'+Q2+'</td><td name="Q3">'+Q3+'</td></tr>'
  // console.log(string);
    };
  body_booklist.innerHTML = string;
    
  };


function Getstring(action,bookname,author,genre1,Q1,Q2,Q3){
    all_infor={
      book1: "To Kill a Mockingbird"
      ,author1: "Harper Lee"
      ,genre1: "Classic Literature"
      ,Q11: "How sympathetic do you feel towards the character of Boo Radley?"
      ,Q21: "How sympathetic do you feel towards the Ewells?"
      ,Q31: "How much do you like the character of Scout?"
      ,n1: 1
      ,book2: "Harry Potter and the Philosopher's Stone"
      ,author2: "J.K. Rowling"
      ,genre2: "Young Adult"
      ,Q12: "How excited do you feel about Harry going to Hogwarts?"
      ,Q22: "How much do you like Harry?"
      ,Q32: "How scary do you find Voldemort?"
      ,n2: 2
      ,book3: "Pride and Prejudice"
      ,author3: "Jane Austen"
      ,genre3: "Classic Literature"
      ,Q13: "Do you find the mother, Mrs Bennett, annoying?"
      ,Q23: "How much do you like Darcy at this point?"
      ,Q33: "How happy does the ending of the novel make you feel?"
      ,n3: 3
      ,book4: "Lebs"
      ,author4: "Michael Mohamad"
      ,genre4: "Contemporary Literature"
      ,Q14: "How sympathetic do you feel towards Bani Adam?"
      ,Q24: "How much do you like Bani Adam at this point?"
      ,Q34: "How satisfied do you feel by the end of the novel?"
      ,n4: 4
      ,book5: "The Swan Book"
      ,author5: "Alexis Wright"
      ,genre5: "Contemporary Literature"
      ,Q15: "How sympathetic do you feel towards Oblivia?"
      ,Q25: "How much do you enjoy the language in this book?"
      ,Q35: "How satisfied do you feel by the end of the novel?"
      ,n5: 5
      ,book6: "The Big Sleep"
      ,author6: "Raymond Chandler"
      ,genre6: "Crime Thriller"
      ,Q16: "How much do you like Philip Marlowe?"
      ,Q26: "How much do you like Philip Marlowe at this point of the novel?"
      ,Q36: "How sympathetic do you feel towards Carmen?"
      ,n6: 6
      ,book7: "Gone Girl"
      ,author7: "Gillian Flynn"
      ,genre7: "Crime Thriller"
      ,Q17: "How much do you like Nick?"
      ,Q27: "How much do you like Amy?"
      ,Q37: "How much did you enjoy the twist of this novel?"
      ,n7: 7
      ,book8: "Lord of the Rings: Fellowship of the Ring"
      ,author8: "J.R.R. Tolkien"
      ,genre8: "Fantasy"
      ,Q18: "How excited do you feel about the beginning of the novel?"
      ,Q28: "Do you find the Nazgul scary?"
      ,Q38: "Do you admire Frodo?"
      ,n8: 8
      ,book9: "The Fifth Season"
      ,author9: "N.K. Jemisin"
      ,genre9: "Fantasy"
      ,Q19: "How much do you like Essun?"
      ,Q29: "How much do you like Damaya?"
      ,Q39: "How happy do you feel at the end of the book?"
      ,n9: 9
      ,book10: "Eleanor and Park"
      ,author10: "Rainbow Rowell"
      ,genre10: "Young Adult"
      ,Q110: "How much do you like the character of Eleanor?"
      ,Q210: "Does Richie make you angry?"
      ,Q310: "Do you admire Park?"
      ,n10: 10};
  
    if (action ==='read') {return all_infor;}
    // else if (action === 'ddelete'){
    // }
    }
















