import { MutableRefObject, useRef } from "react";

interface PostModifyModalProps {
  index: number;
  title: string;
  content: string;
  onConfirm: (modify: {index: number; title: string; content: string}) => void;
  onCancle: () => void;
}




const PostModifyModal = ({index, title, content, onConfirm, onCancle}: PostModifyModalProps) => {

  const grayModal = {
    width: "100%", 
    height: "100vh", 
    position: "fixed", 
    top: 0,
    left: 0,
    zIndex: 9990, 
    backgroundColor: "rgba(0,0,0,0.7)",
  }

  const whiteModal = {
    width: "300px", 
    padding: 20, 
    backgroundColor: "white"
  }


  const inputRefTitle = useRef() as MutableRefObject<HTMLInputElement>;
  const inputRefContent = useRef() as MutableRefObject<HTMLInputElement>;

  // 수정한 컨텐트 값을 Post 컴포넌트에 전달? 
  const handleConfirm = () => {
    onConfirm({index, title:inputRefTitle.current.value, content:inputRefContent.current.value});
  }




  return (
    <div style={grayModal}>
      <div style={whiteModal}>
        <input defaultValue={title} ref={inputRefTitle}></input>
        <input defaultValue={content} ref={inputRefContent}></input>
        <div>
          <button onClick={handleConfirm}>수정</button>
          <button onClick={onCancle}>취소</button>
        </div>
      </div>
    </div>
  )
};

export default PostModifyModal;