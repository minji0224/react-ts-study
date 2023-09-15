// 리액트에서 컴포넌트는 JSX Element를 반환하는 함수이다.


interface WelcomeMessageProps{
  name?: string
}


// 리액트에서 컴포넌트는 JSX Element를 반환하는 함수이다.
// 컴포넌트에서 최상위 부모엘리먼트는 1개만 존재.
// 컴포넌트에서 매개변수도 객체타입으로 받아야함. props: Welco~ 이렇게 쓰고 . 찍고 들어갈수도있음.
// React Props: 함수의 객체형태의 매개변수
const WelcomeMessage = ({name}: WelcomeMessageProps) => { 
  // const name = "ChatGPT"


  // <></>: Fragment
  // return <></>
  // return부분이 JSX: js 가상DOM의 객체인데 HTML스타일로 작성할 수 있는 것.(JSX Element)
  return (
    // 바인딩: 데이터(변수값)를 템플릿에 연결
    // 리액트는 당방향 바인딩만 지원(코드->템플릿)
    // {name}: jsx의 자바스크립트의 표현식
    // style={{color: "green"}} 객체로 넣어야함 -> 속성={값} -> 속상={객체(css가 객체기때문?)}
  <div>
    <h1 style={{color: "green", backgroundColor: "black"}}>welcome, {name}!</h1>
    <p>This is an example of JSX in React.</p>
  </div>
  );
};

export default WelcomeMessage;