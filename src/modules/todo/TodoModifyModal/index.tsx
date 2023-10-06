import { MutableRefObject, useRef } from "react";
import { ButtonContainer, Container, Wrapper } from "./styled";
import { Button } from "@/components/Button/styles";

interface TodoModifyModalProps {
  index: number;
  memo: string;
  onConfirm: (payload: {index: number; memo: string}) => void;
  onCancle: () => void;
}


const TodoModifyModal = ({index, memo, onConfirm, onCancle}: TodoModifyModalProps) => {
  console.log(`부모로부터 받은 props : ${index}`);
  console.log(`부모로부터 받은 props : ${memo}`);
  
  
  
  
  
  //useRef()가 없으면 널체크를 해줘야함
  const inputRef = useRef() as MutableRefObject<HTMLInputElement>;

  const handleConfirm = () => {
    onConfirm({index, memo: inputRef.current.value});
    console.log(inputRef.current.value);
    
  };



  return (

  <Wrapper>
    <Container>
      <input defaultValue={memo} ref={inputRef}></input>
      <ButtonContainer>
        <Button primary onClick={handleConfirm}>수정</Button>
        <Button onClick={onCancle}>취소</Button>
      </ButtonContainer>
    </Container>
  </Wrapper>
 
  );
};

export default TodoModifyModal;