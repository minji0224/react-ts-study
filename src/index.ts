// ecmascipt(ex, js) module
/*
import구문은
구조분해할당
const {username, age} = {username: "Alice", age: 30}
// const person = {username: "Alice", age: 30} -> person.username / person.age
*/



import { appName, greet, user } from "./module";

// 디폴트 모듈
// 자동완성으로 파일명하고 모듈명을 동일하게 해줌.
// import module from "./module";
import metadata from "./module";


// 타입 추론 
const name = "Javascript!!!!!!!!";
// 타입선언(타입 선언하면 타입 못바꿈)
let name1 : string;


console.log(
  greet(`${name}-${appName}-
  ${metadata.version}-${metadata.creator}-
  ${user.name}-${user.age}`, "unspecifide")
  );


  console.log(user.nickname, user.printInfo);
  


document.getElementById("root").innerHTML = greet(
  `${name}-${appName}-${metadata.version}-${metadata.creator}-${user.name}-${user.age}-${user.gendor}`
  );


