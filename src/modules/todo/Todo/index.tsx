/*
모듈 가져올 때 
1차 시도: ./TodoModifyModal.ts/tsx/js/jsx
2차 시도: 1차 시도: ./TodoModifyModal/index.ts/tsx/js/jsx
*/ 
import { MutableRefObject, useEffect, useRef, useState } from "react";
import TodoModifyModal from "@/modules/todo/TodoModifyModal";
import { TodoContainer } from "@/modules/todo/Todo/styled";
import axios from "axios";

interface TodoItem {
  id?: number;
  memo: string;
  // done: boolean;
}

const Todo = () => {

  // 할일 목록 상태(string[])
  // 빈배열만 넣으면 any[]로 나와서 꼭 타입써주기
  // const [todoList, setTodoList] = useState<string[]>([]);
  const [todoList, setTodoList] = useState<TodoItem[]>([]);
  
  const[showModifyModal, setShowModifyModal] = useState(false);
  const [modifyItem, setModifyItem] = useState({index: 0, memo: ""});
  // 입력박스 참조
  // useRef(참조변수 생성: 기본이 null) as MutableRefObject<참조할 변수의 타입>
  const inputRef = useRef() as MutableRefObject<HTMLInputElement>;

  // 배열에 추가할 때는 새로운 배열을 생성하고 -> 기존 배열을 나열하고 -> 신규 요소를 넣는다.
  const handleAdd = () => {
    // 참조하는 객체의 현재상태는 참조변수.current
    console.log(inputRef);
    console.log(inputRef.current);
    console.log(inputRef.current.value);

    (async()=> {
      try{
        const response = await axios.post<TodoItem>("http://localhost:9090/todos",{
          memo: inputRef.current.value,
        });
        console.log(response);
        // console.log(response.data);
        
        if(response.status === 201) {
          // 배열에 추가하기 (push, unshift 안됨) : 리액트 state를 변경할 때는 다른 참조로 넣어야 함
          /*
          상태변경은 항상 상태변경 함수로만 처리해야함
          매개변수에는 기존 상태와 다른 참조를 매객변수로 넣어얗.ㅁ
          1. 새로운 객체를 생성해야함. : [] -> setTodoList([]);
          2. ...arr : 배열요소 나열 -> ...todoList
          3. [...arr] : arr배열요소를 나열해서 새로운 배열 생성 -> setTodoList([...todoList]);    
          */ 

          // filter, map.. 이런 형태의 새로운 배열을 반환하는 함수
          // setTodoList([inputRef.current.value, ...todoList]);
          setTodoList([{...response.data}, ...todoList]);
          inputRef.current.value = "";   
        }        
      } catch(e: any){
        console.log(e);
      }
    })();
  };

  // 삭제할 때는 해당 조건에 맞는 요소만 제외된 배열을 만든다(filter)
  const handleRemove = (index: number) => {
    (async()=> {
      const id = todoList[index].id;
      const response = await axios.delete(`http://localhost:9090/todos/${id}`);

      if(response.status === 200) {
        setTodoList(todoList.filter((_, idx) => idx !== index));
        // id값이 있을때는  setTodoList(todoList.filter((item, idx) => item.id !== id));
      }
    })();
  };

  // 모달창을 여는 것
  const handleOpenModifyModal = (index: number) => {
    // 모달열기
    setShowModifyModal(true);
    // 선택한 데이터 넘겨주기
    setModifyItem({index, memo: todoList[index].memo});
  };


  // 수정 후 확인버튼
  const handleModifyModalConfirm = ({index, memo}: {index: number; memo: string;}) => {

    (async()=> {
      const response = await axios.put(`http://localhost:9090/todos/${todoList[index].id}`,{
        memo,
      });
      console.log(response);

      // 특정 요소의 값만 변경된 배열을 생성하여 반환 (map)
      setTodoList(todoList.map((item, idx) => {
        // 수정중인 요소와 같은 인덱스이면
        if(index === idx) {
          // 메모를 수정
          return {index, memo};
        }
        return item;
      }));
      setShowModifyModal(false);
    })();
  };

  // 취소 버튼
  const handleModifyModalCancel = () => {
    setShowModifyModal(false);
  };

  // useEffect(()=> {
  //   // console.log(todoList[1]); 
  //   console.log(todoList);

  //   for(let [idx, item] of todoList.entries()){
  //     console.log(`인덱스 ${idx}: ${item.memo}`);   
  //   } 
  // }, [todoList]);
  useEffect(()=> {
    console.log(todoList);
  }, [todoList]);

  /*
    useEffect(함수블럭, [의존변수]) : 변수값(상태, 속성)이 변경되면 함수 블럭이 실행됨
    useEffect(()=> {}, []);
    []: 빈배열로 넣게되면, 처음 컴포넌트가 렌더링 됐을 때 한번만 실행된다.
    의존변수 배열을 안넣게 되면 컴포넌트가 업데이트 될 때 마다 실행된다. 
  */

  // useEffect함수에 async를 못써서 안에 즉시실행함수로 넣어주기.
  useEffect(()=>{
    (async()=> {
      try {
        const response = await axios.get<TodoItem[]>("http://localhost:9090/todos?_sort=id&_order=desc");
        console.log(response);
        setTodoList([...response.data]);  
      } catch (e:any) {
        console.log(e);
      }
    })();
  },[]);
  

  return (
      <TodoContainer>
        <header>
          {/* ref속성에 참조변수 넣기 */}
          <input placeholder="..할일" ref={inputRef}></input>
          <button onClick={handleAdd}>추가</button>
        </header>
    
        {/* 삼항연산을 쓰면 가독성 많이 떨어져서 그냥 두개로만드는것이 나음 */}
        {todoList.length === 0 && <p>할 일 목록이 없습니다.</p>}
        {todoList.length > 0 && (
          <>
            <ul>
            {/* string[] => <li>[] : 데이터 -> JSX.Element로 변경하는 것 */}
            {/* key속성: 엘리먼트 변동여부를 추적할 때 사용하는 것 
                key가 변동되면, 엘리먼트를 다시 새로 만듦 
                key값을 변동되는 인덱스보다 유일한 idd값을 쓰는게 좋다.       */}
            {todoList.map((item, index) => (
              // <li key={index}>{item}</li>    
              // <li key={index} onClick={()=> {handleRemove(index)}}>{item.memo}</li>    
              <li key={`todo-item-${item.id}`} onClick={() => { handleOpenModifyModal(index) }}>
                 <button onClick={(e) => { e.stopPropagation(); handleRemove(index);}}>
                  삭제
                </button>
                <span>{item.memo}</span>
              </li>   
            ))}
          </ul>
          <footer>
            <data>{todoList.length}</data> 개의 할일
          </footer>
        </>  
      )}
      {showModifyModal && (
      <TodoModifyModal 
        // 상태값을 자식의 속성으로 넘겨줘야 함
        index={modifyItem.index}
        memo={modifyItem.memo}
        // 자식의 이벤트를 처리하는 함수를 속성으로 넘겨줘야 함
        onConfirm={handleModifyModalConfirm}
        onCancle={handleModifyModalCancel}
      /> 
    )}
    </TodoContainer>
  );
};

export default Todo;