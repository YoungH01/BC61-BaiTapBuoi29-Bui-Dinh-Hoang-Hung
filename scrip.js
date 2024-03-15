var typeUser= document.querySelector("#loaiNguoi");
var sortLoaiNguoi=document.querySelector("#sortLoaiNguoi");
var value1= document.querySelector("#value1");
var value2=document.querySelector("#value2");
var value3=document.querySelector("#value3");
class Person{
    name="";
    address="";
    code="";
    email="";
    constructor(name,address,code,email){
        this.name=name;
        this.address=address;
        this.code=code;
        this.email=email;
    };
};
class Student extends Person{
    math="";
    physic="";
    chemistry="";
    type="";
    constructor(name,address,code,email,math,physic,chemistry,type){
        super(name,address,code,email);
        this.math=math;
        this.physic=physic;
        this.chemistry=chemistry;
        this.type=type;
    }
    calculateScore(){
      var a= Number(this.math);
      var b=Number(this.physic);
      var c=Number(this.chemistry);
      var ansScore= (a+b+c)/3.0;
      return ansScore;
    }
};
class Employee extends Person{
    numberWork="";
    salary="";
    type="";
    constructor(name,address,code,email,numberWork,salary,type){
        super(name,address,code,email);
        this.numberWork=numberWork;
        this.salary=salary;
        this.type=type;

    }
    calculateSalary(){
        var a= Number(this.numberWork);
        var b=Number(this.salary);
        var ansSalary= a*b;
        return ansSalary;
    }
};
class Customer extends Person{
    nameCompany=0;
    invoice=0;
    evaluate=0;
    type="";
    constructor(name,address,code,email,nameCompany,invoice,evaluate,type){
        super(name,address,code,email);
        this.nameCompany=nameCompany;
        this.invoice=invoice;
        this.evaluate=evaluate;
        this.type=type;

    }
};
class ListPerson{
    // arrStudent= [new Student];
    // arrEmployee= [new Employee];
    // arrCustomer= [new Customer];
    arrPerSon=[];
};
var user=new ListPerson;
console.log(typeUser.value);
function chooseType(){
  if(typeUser.value=="Student"){
    value1.innerHTML="Điểm toán";
    value2.innerHTML="Điểm lý";
    value3.innerHTML="Điểm hoá";
    document.querySelector("#valueDescript1").placeholder="Nhập điểm toán";
    document.querySelector("#valueDescript2").placeholder="Nhập điểm lý";
    document.querySelector("#valueDescript3").placeholder="Nhập điểm hoá";
    document.querySelector("#input3").style.display="block";

  };
  if(typeUser.value=="Employee"){
    value1.innerHTML="Số ngày làm việc";
    value2.innerHTML="Lương theo ngày";
    document.querySelector("#valueDescript1").placeholder="Nhập số ngày làm việc";
    document.querySelector("#valueDescript2").placeholder="Nhập lương theo ngày";
    document.querySelector("#input3").style.display="none";
  };
  if(typeUser.value=="Customer"){
    value1.innerHTML="Tên công ty";
    value2.innerHTML="Giá trị hoá đơn";
    value3.innerHTML="Đánh giá";
    document.querySelector("#valueDescript1").placeholder="Nhập tên công ty";
    document.querySelector("#valueDescript2").placeholder="Nhập giá trị hoá đơn";
    document.querySelector("#valueDescript3").placeholder="Nhập đánh giá";
    document.querySelector("#input3").style.display="block";
  }
}
function getInfo(codeUser){
  var arr= user.arrPerSon;
  var directUser;
  for(var i=0;i<arr.length;i++){
    var character=arr[i];
    if(character.code==codeUser){
      directUser=character;
      break;
    }
  };
  var arrField = document.querySelectorAll('form input,form select');
  for (var i = 0; i < arrField.length; i++) {
    var id = arrField[i].id;
    if(id=="maWorker"){
      arrField[i].value=directUser.code;
    }
    if(id=="tenWorker"){
      arrField[i].value=directUser.name;
    }
    if(id=="email"){
      arrField[i].value=directUser.email;
    }
    if(id=="soDiaChi"){
      arrField[i].value=directUser.address;
    }
    if(id=="loaiNguoi"){
      arrField[i].value=directUser.type;
    }
    if(id=="valueDescript1"){
      if(directUser.type=="Student"){
        arrField[i].value=directUser.math;
      }
      if(directUser.type=="Employee"){
        arrField[i].value=directUser.numberWork;
      }
      if(directUser.type=="Customer"){
        arrField[i].value=directUser.nameCompany;
      }
    }
    if(id=="valueDescript2"){
      if(directUser.type=="Student"){
        arrField[i].value=directUser.physic;
      }
      if(directUser.type=="Employee"){
        arrField[i].value=directUser.salary;
      }
      if(directUser.type=="Customer"){
        arrField[i].value=directUser.invoice;
      }
    }
    if(id=="valueDescript3"){
      if(directUser.type=="Student"){
        arrField[i].value=directUser.chemistry;
      }
      if(directUser.type=="Customer"){
        arrField[i].value=directUser.evaluate;
      }
    }
  }
  // ngăn chặn người dùng chỉnh sửa mã số
  document.getElementById('maWorker').readOnly = true;
}
function renderUser(arr) {
  var content = '';
  // chạy vòng lặp duyệt qua dữ liệu
  for (var i = 0; i < arr.length; i++) {
    // log và kiểm tra cấu trúc object đang được đưa lên giao diện
    console.log(arr[i]);
    var character = arr[i];
    content += `
      <tr>
        <td>${character.code}</td>
        <td>${character.name}</td>
        <td>${character.email}</td>
        <td>${character.type}</td>
    `;
    if(character.type=="Student"){
      var score=character.calculateScore();
      content+=`
      <td>${score}</td>
      <td>0</td>
      <td>
        <button onclick="deleteUser('${character.code}')" class="btn btn-danger me-2">Xoá</button>
        <button class="btn btn-warning" onclick="getInfo('${character.code}')">Sửa</button>
      </td>
    </tr>`
    }else if(character.type=="Employee"){
      var salary=character.calculateSalary();
      content+=`
      <td></td>
      <td>${salary}</td>
      <td>
        <button onclick="deleteUser('${character.code}')" class="btn btn-danger me-2">Xoá</button>
        <button class="btn btn-warning" onclick="getInfo('${character.code}')">Sửa</button>
      </td>
    </tr>`
    }else{
      content+=`
      <td>0</td>
      <td>0</td>
      <td>
        <button onclick="deleteUser('${character.code}')" class="btn btn-danger me-2">Xoá</button>
        <button class="btn btn-warning" onclick="getInfo('${character.code}')">Sửa</button>
      </td>
    </tr>`
    }
  }
  // dom tới tbody và đưa dữ liệu lên
  // console.log(content);
  document.querySelector('tbody').innerHTML = content;
}
function addWorker(){
   var code= document.querySelector("#maWorker").value;
   var name= document.querySelector("#tenWorker").value;
   var address=document.querySelector("#soDiaChi").value;
   var emailWorker=document.querySelector("#email").value;
   var typeWorker= document.querySelector("#loaiNguoi").value;
   var valueDescription1=document.querySelector("#valueDescript1").value;
   var valueDescription2=document.querySelector("#valueDescript2").value;
   var valueDescription3=document.querySelector("#valueDescript3").value;
   if(typeWorker=="Student"){
     var userStudent= new Student(name,address,code,emailWorker,valueDescription1,valueDescription2,valueDescription3,"Student");
     user.arrPerSon.push(userStudent);
   }
   if(typeWorker=="Employee"){
    var userEmployee=new Employee(name,address,code,emailWorker,valueDescription1,valueDescription2,"Employee");
    user.arrPerSon.push(userEmployee);
   }
   if(typeWorker=="Customer"){
    var userCustomer= new Customer(name,address,code,emailWorker,valueDescription1,valueDescription2,valueDescription3,"Customer");
    user.arrPerSon.push(userCustomer);
   }
   console.log(user);
   renderUser(user.arrPerSon);
   document.querySelector('form').reset();
}
document.querySelector('.btn-success').onclick = addWorker;
function getValueUser(){
  var arr={};
  var arrField = document.querySelectorAll('form input,form select');
  // console.log(arrField);
  for (var i = 0; i < arrField.length; i++) {
    var value = arrField[i].value;
    var id = arrField[i].id;
    // id = maSinhVien - value = huhu
    if(id=="maWorker"){
      arr['code']=value;
    }
    if(id=="tenWorker"){
      arr['name']=value;
    }
    if(id=="email"){
      arr['email']=value;
    }
    if(id=="soDiaChi"){
      arr['address']=value;
    }
    if(id=="loaiNguoi"){
      arr['type']=value;
    }
    if(id=="valueDescript1"){
      if(arr['type']=="Student"){
        arr['math']=value;
      }
      if(arr['type']=="Employee"){
        arr['numberWork']=value;
      }
      if(arr['type']=="Customer"){
        arr['nameCompany']=value;
      }
    }
    if(id=="valueDescript2"){
      if(arr['type']=="Student"){
        arr['physic']=value;
      }
      if(arr['type']=="Employee"){
        arr['salary']=value;
      }
      if(arr['type']=="Customer"){
        arr['invoice']=value;
      }
    }
    if(id=="valueDescript3"){
      if(arr['type']=="Student"){
        arr['chemistry']=value;
      }
      if(arr['type']=="Customer"){
        arr['evaluate']=value;
      }
    }
  }
  return arr;
}
function updateInfo(){
  document.getElementById('maWorker').readOnly = false;
  var arrUser=user.arrPerSon;
  var infoChange=getValueUser();
  for(var i=0;i<arrUser.length;i++){
      var arr=arrUser[i];
      if(arr.code==infoChange.code){
        user.arrPerSon[i]=infoChange;
        break;
      }
  }
  document.querySelector('form').reset();
  renderUser(user.arrPerSon);
}
document.querySelector('.btn-dark').onclick = updateInfo;
function deleteUser(maUser){
  var arr= user.arrPerSon;
  for(var i=0;i<arr.length;i++){
    var item=arr[i];
    if(item.code==maUser){
      user.arrPerSon.splice(i,1);
      break;
    }
  }
  renderUser(user.arrPerSon);
}
function sortForName(){
  console.log("hello");
  var arr= user.arrPerSon;
  for (let i = 0; i < arr.length - 1; i++) {
    let minIndex = i;
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[j].name < arr[minIndex].name) {
        minIndex = j;
      }
    }
    if (minIndex !== i) {
      [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
    }
  }
  renderUser(arr);
}
function sortForType(){
  var arr= user.arrPerSon;
  var newArr=[]
  for(var i=0;i<arr.length;i++){
    var item=arr[i];
    if(item.type==sortLoaiNguoi.value){
      newArr.push(item);
    }
  }
  if(sortLoaiNguoi.value=="Student" ||sortLoaiNguoi.value=="Employee") renderUser(newArr);
  else{
    
  }
}

