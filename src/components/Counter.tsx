import { useCallback, useEffect, useState } from "react";
import Alert from "./Alert";

/*
1. props와 state 둘다 렌더링 결과물에 영향을 부는 변수
2. props는 함수 매개변수처럼 컴포넌트에 전달
3. state는 함수 내에 선언된 변수(변수 변경 함수가 존재)
*/

const Counter = () => {
  // const[상태변수, 상태변경함수] = useState<상태타입>(초깃값)
  // 상태값 정의: UI에 변경이 필요한 변수
  /*
  상태값이 변경이 생기면 컴포넌트를 다시 렌더링한다.
  1. 상태값이 변경이 생기면 컴포넌트 렌더링 요청이 발생
  2. 컴포넌트의 속성값 변동이 있으면 렌더링 한다.

  처음 렌더링할 때(mounted)만 초깃값이 적용되고,
  그 이후에 렌더링될 때는 기존에 저장된 값을 다시 불러옴
  */
  const [count, setCount] = useState(0);
  const [showAlert, setShowAlert] = useState(false);

  console.log("렌더링하는 상태 값(카운트): " + count);
  console.log("렌더링하는 상태 값(얼럿창): " + showAlert);
  
  

  const handleIncrement = () => {
    // 숫자값 증가
    // 상태값 변경함수에 변경값을 대입
    // 상태값 변경 요청 -> innerText가 변경 -> 렌더링
    console.log("카운트값 증가");
   
    setCount(count +1);
    // setShowAlert(true);

    // 변경된 상태값 출력
    // 상태값은 바로 변경안되고 이후 다음에 -> 렌더링하는 시점에 변경된 상태값이 적용
    console.log("변경된 상태값: " + count);
    console.log("변경된 상태값: " + showAlert);
    
    
  };

  // const handleAlertClosed = () => {
  //   setShowAlert(false);
  // };

  // 유즈콜백은 성능최적화를 위해 사용해야되지 렌더링 막으려고 쓰면 버그 투성이
  const handleAlertClosed = useCallback(() => {
    if(showAlert) {
      setShowAlert(false);
    }    
  }, [showAlert]);

  // 상태값 변경, 컴포넌트 라이프사이클 변동에 따른 처리
  // useEffect({함수블럭},[의존변수배열])
  // 의존변수가 바뀌면 함수 블럭이 실행됨.
  // 가장 처음에 (의존변수가 초기화되는 시점)도 실행됨 -> 조건문 걸어서 실행안되게해주기
  useEffect(()=>{
    if(count !=0) {
      console.log("얼럿박스 표시");  
      setShowAlert(true);
    }   
  },[count])



  return (
  <>  
    {/* 조건부 렌더링 */}
    {showAlert && (
      <Alert message="증가되었습니다" onClose={handleAlertClosed}/>
    )}  
    <div>
      <p>현재 카운트: {count}</p>
      <button onClick={handleIncrement}>증가</button>
    </div>
   </>
  );

};

export default Counter;