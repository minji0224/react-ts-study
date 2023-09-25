import { useNavigate } from "react-router-dom";
import { useContactsData } from "../data";
import { useState } from "react";

const ContactList = () => {

  const [page, setPage] = useState(0);
  console.log(`List컴포넌트의 page: ${page}`);
  /*
    로그가 2번 찍히는 이유는 
    컴포넌트가 마운팅될 때 1번 찍히고
    contactData를 fetcher()로 가져온 다음에 상태가 업데이트 돼서 그 다음 또 1번 찍힘  
  */ 

  const {contactsData: contacts, isContactDataValidating} = useContactsData(page);
  console.log(contacts);
  console.log(`validating: ${isContactDataValidating}`);

  const navigate = useNavigate();

  const handleClickItem = (id: number) => {
    navigate(`/contacts/detail/${id}`)
  };

  return (
    <div>
      <h3>Contact List</h3>
      <button onClick={() => {setPage(page + 1);}}>Next</button>
      <ul>
        {contacts.map((c) => (
        <li 
          style={{cursor: "pointer"}}
          key={`item-${c.id}`} 
          onClick={() => {handleClickItem(c.id)}}>
          {/* 여기 onClick에 ()=> 처음 이쪽 부분은 마우스 이벤트를 받거나 안받거나 정하는 쪽이기 때문에
              내가 쓸 함수의 매개변수를 저기다 넣으면 안되는 것 */}
            <span>{c.name}, {c.phone}</span>
        </li>))}
      </ul>
    </div>
  );
};

export default ContactList;