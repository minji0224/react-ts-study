import { ButtonProps, OutlinedButton, PrimaryButton } from "./components/Button/styles";
// FC: function component
import FCButton from "./components/Button"
import {Button} from "./components/Button/styles";
import { useState } from "react";

const App = () => {

  // 인터페이스의 필드형식을 가져오려면 우선 인터페이스는 export해주고
  // <인터페이스명["필드명"]> -> 
  const [size, setSize] = useState<ButtonProps["size"]>("md");




  return (
    <>
    {/* HTMLButtonElement의 기본 속성을 모두 사용할 수 있음 */}
     <PrimaryButton onClick={()=> {alert("click")}}>버튼</PrimaryButton>

     {/* Function Component에 선언된 속성만 사용가능(타입스크립트 / js는 상관무) */}
     <FCButton label="버튼" />
     <hr />
     <Button primary>primary</Button>
     <Button>default</Button>
     <hr />

     <Button size="md">deafult -md</Button>
     <Button size="sm">deafult -sm</Button>
     <Button size="lg">deafult -lg</Button>
     <hr />

      {/* 배열로 바꿔서 넣을 수 있음 */}
      {/* styled-components의 속성이 바뀌면 클래스가 변경됨(단순히 안의 스타일속성이 바뀌는게 아님) 
          현재 없는 클래스면 style태그와 클래스를 header에 생성(느려진다)*/}
     <button onClick={()=>{setSize("lg")}}>스타일변경-lg</button>
     <button onClick={()=>{setSize("sm")}}>스타일변경-sm</button>
     <button onClick={()=>{setSize("md")}}>스타일변경-md</button>
     <Button size={size} primary> default-dynamic</Button>

     <hr />

     {/* 기존 버튼 스타일을 재활용한 버튼 */}
     <OutlinedButton>기본</OutlinedButton>
     <OutlinedButton primary>primary</OutlinedButton>



     



    </>
  );
};

export default App;