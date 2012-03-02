function Person (name, age) {
    this.name = name;
    var age = age;
    this.alertName = function() {
        alert(this.name);
    }
    function alertAge() {
        alert(this.age);
    }
}


function webDever(name,age,sex){
    Person.call(this,name,age);
    this.sex=sex;
    this.alertSex = function(){
        alert(this.sex);
    }
}
var test= new webDever("愚人码头",28,"男");
test.alertName();//愚人码头
//test.alertAge();//28
test.alertSex();//男

