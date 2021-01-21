var express = require('express');
var router = express.Router();
/* index.js */
var mongoose = require('mongoose');
var mongoUrl = "mongodb://127.0.0.1:27017/test";
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useUnifiedTopology', true);
mongoose.connect(mongoUrl);

var db = mongoose.connection;
// 4. 연결 실패
db.on('error', function(){
  console.log('Connection Failed!');
});
// 5. 연결 성공
db.once('open', function() {
  console.log('Connected!');
})

var student = mongoose.Schema({
  name : 'string',
  address : 'string',
  age : 'number'
});

var Student = mongoose.model('mongoTests', student);
var newStudent = new Student({name:'Hong Gil Dong', address:'서울시 강남구 논현동', age:'25'});

//저장
router.get('/insert', function(req, res, next) {
  res.send("저장 입니다.");

  newStudent.save(function(error, student){
    if(error){
      console.log(error);
    }else{
      console.log('Saved!')
    }
  });
});

//리스트
router.get('/list', function(req, res, next) {
  Student.find(function(error, students){
    console.log("리스트");
    if(error){
      console.log(error);
    }else{
      console.log(students)
      res.send(students);
    }
  });
});

//특정 ID 셀렉트
router.get('/select', function(req, res, next) {
  Student.findOne({name:'동동이'},function(error, students){
    console.log("특정 ID 셀렉트");
    if(error){
      console.log(error);
    }else{
      console.log(students)
      res.send(students);
    }
  });
});

//수정
router.get('/update', function(req, res, next) {
  res.send("업데이트 입니다.");

  //1. 업데이트 해야할 객체가 존재 하는 확인
  Student.findById({_id:'6008e8fbfcb3ef32302f7433'},function(error, student){
    console.log(student.name)
    console.log(student.address)
    console.log(student.age)

    if(error){
      console.log(error);
    }else{
      student.name = "수정ㅋㅋ";
      student.age = 100;
      student.save(function(error, modified_student){
        if(error){
          console.log(error);
        }else{
          console.log("변경 성공");
          console.log(modified_student);
        }
      })
    }
  });
});

//삭제
router.get('/delete', function(req, res, next) {
  res.send("삭제 입니다.");

  //1. 삭제 할 객체가 존재 하는 확인
  Student.remove({_id:'6008e8fbfcb3ef32302f7433'},function(error, student){
    if(error){
      console.log(error);
    }
  });
});

module.exports = router;
