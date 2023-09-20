import { MutableRefObject, useRef, useState } from "react";
import PostModifyModal from "./PostModifyModal";


interface PostItem {
  // id: number;
  title: string;
  content: string;
}


const Post = () => {

  const divStyle = {
    width: "200px",
    height: "200px",
    border: "1px solid black",
    margin: "10px"
  }

  const [postList, setPostList] = useState<PostItem[]>([]);
  const [showModifyModal, setShowModifyModal] = useState(false);
  const [modifyItem, setModifyItem] = useState({index: 0, title: "", content: ""}); 

  const inputRefTitle = useRef() as MutableRefObject<HTMLInputElement>;
  const inputRefContent = useRef() as MutableRefObject<HTMLInputElement>;

  const handleAdd = () => {

    const titleRef = inputRefTitle.current;
    const contentRef = inputRefContent.current;

    setPostList([{title: titleRef.value, content: contentRef.value}, ...postList]);
    titleRef.value = "";
    contentRef.value = "";
  };

  const handleRemove = (index: number) => {
    setPostList(postList.filter((_, idx) => idx !== index));
  }

  /*
  이 함수 자체로 모달창이 열리는 것이 아니라 
  이 함수는 수정버튼을 눌렀을 때 실행되면서 
  ShowModifymodal의 state가 true로 바뀌고,
  해당 인덱스의 본문 값을 set한 다음 -> 
  밑에 return 구문에서 PostModifyModal 컴포넌트가 ShowModifymodal의 state값이 true일 때라는 
  조건을 달아서 실행되는 듯.
  결국엔 PostModifyModal 컴포넌트를 실행하기 위해 이 함수로 state값을 true로 만들어 준 거인 듯? 
  */ 
  const handleOpenModifyModal = (index: number) => {
    setShowModifyModal(true);
    setModifyItem({index, title: postList[index].title, content: postList[index].content});
    console.log(postList[index].title);
    console.log(postList[index].content);
    
    
  }

  /*
  이 함수는 
  PostModifyModal 컴포넌트의 프롭스를??
  ModifyModal의 수정버튼에 onClick={onConfirm} 이 함수에서 받아온 객체를 분해해서 속성값을 받는 것?
  */
  const handleModifyModalConfirm = ({index, title, content} : {index: number; title: string; content: string;}) => {
    setPostList(postList.map((item, idx) => {
      if(index === idx) {
        return {index, title, content};
      }
      return item;
    }));
    setShowModifyModal(false);
  }

  const handleModifyModalCancel = () => {
    setShowModifyModal(false);
  };




  return (
    <div>
      {/* form태그로 감쌌더니 안됨 */}
        <input placeholder="제목" ref={inputRefTitle}/>
        <input placeholder="본문" ref={inputRefContent} />
        <button onClick={handleAdd}>추가</button>
      {postList.map((item, index) => (
          <div key={index} style={divStyle}>
            <p>{item.title}</p>
            <span>{item.content}</span>
            <button onClick={() => handleOpenModifyModal(index)}>수정</button>
            <button onClick={() => handleRemove(index)}>삭제</button>
          </div>
      ))}
      {showModifyModal && (
        <PostModifyModal index={modifyItem.index} title={modifyItem.title} content={modifyItem.content} 
          onConfirm={handleModifyModalConfirm} onCancle={handleModifyModalCancel}
        />
      )}
    </div>
  )
};

export default Post;