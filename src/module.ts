// js:es-module 방법에서 모듈을 내보내는 방법
// - 내보내고 싶은 모듈앞에 export를 쓰면 됨
// 모듈: 코드집합, 변수, 함수, 객체, 클래스, 인터페이스 등

// export(수출): 내보내기
// 매개변수가 옵셔널 (매개변수?: 타입)
// 매개변수가 default (매개변수: 타입 = 디폴트값)
// 매개변수가 union (매개변수: 값1| 값2| 값3 )
export function greet(
  name: string, 
  gendor?: "unspecifide" | "female" | "male",
  age?: number, 
  nation: string="korea") {
  console.log(age); // 옵셔널일때는 값이 없으면 nudefined로 뜸
  return `Hello, ${name}!`;
}



export const appName = "myapp";

// 인터페이스: 객체 구조를 선언
interface Person {
  name: string;
  gendor?: "unspecifide" | "female" | "male",
  age?: number;
}

interface User extends Person {
  nickname?: string;
  printInfo?: () => void // 보이드함수임 // 매개변수가없고 타입이없는
 }


// // 처음 타입이 결정되면 이후 속성 추가가 안됨.
// export const user = {username: "Alice", age: 30}
// // 속성 추가가 안됨
// //user.nation = "UA"  

export const user: User = {
  // Person 인터페이스 속성(프로퍼티)
  name: "앨리스",
  gendor: "male",
  // User인터페이스 필드
  nickname: "닉네임",
  printInfo: () => {
    console.log(user.nickname);
    
  }
}

// 기본 모듈 내보내기
export default{
  version: '1.0',
  creator: "Minji Choi",
}

// 제네릭타입: 타입을 매개변수로 넣는다.
function identity<T>(arg: T): T {
  return arg;
}

// result의 타입은 string, result2의 타입은 age, result3의 타입은 User
const result = identity<string>(user.name);
const result2 = identity(user.age);
const result3 = identity(user);
