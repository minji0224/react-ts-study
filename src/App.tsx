// 리엑트는 컴포넌트 단위로 개발한다.
// 컴포넌트: 페이지, 세부화면, 위젯, 아이콘
// 컴포넌트: 템플릿(틀) + 작동코드 : 재사용이 가능한 UI조각

// 리액트 컴포넌트는 파일명과 함수명을 파스칼 케이스로 작성
// 원래 리액트 컴포넌트는 class/function 2가지 형태였고 기본이 class 형식이었음.
// 원래 자바스크립트에서 생성자함수 newPerson()은 파스칼 케이스임

// jsx문법을 쓰려면 이렇게 임포트를 해줘야된다.
// import * as React from "react";

import react_icon from "./assets/react-icon.png";
import intro from "./assets/intro.mp4"
import WelcomeMessage from "./components/WelcomeMessage";
import Button from "./components/Button";


// 리액트의 컴포넌트는 함수 : JSX Element를 반환하는 함수
// 요거는 함수표현식임 
// 여기서 div는 html태그가 아님/ jsx어쩌구임
const App = () => {

  const handleClickPrimaryButton = () => {
    alert("Click me");
  };
  const handleClickSecondaryButton = () => {
    alert("Cancel")
  };


  // React.createElement(component, props, ...children)
  // React.createElement("div", null, "Hello, React!!") - 이렇게 변환돼서 나옴
  return <div>
    <img src={react_icon} alt="react icon" height={30} />
    <span>Hello, React!!!</span>
    <div>
    <video width={480} height={270} controls loop autoPlay muted>
      <source src={intro} type="video/mp4" />
    </video>
  </div>
  {/* React Props에 값을 대입 */}
  <WelcomeMessage name={"React Typescript"} />
  <Button label="Click me!" color="primary" onClick={handleClickPrimaryButton}/>
  <Button label="Cancel!" color="secondary" onClick={handleClickSecondaryButton}/>
    </div>;
}

export default App;