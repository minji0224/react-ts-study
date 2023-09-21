import { useNavigate } from "react-router-dom";

const ContactList = () => {

  const contacts = [
    {id: 1, name:"Alice", phone: "010-1234-4567"},
    {id: 2, name:"Don", phone: "010-6666-4567"},
  ];

  const navigate = useNavigate();

  const handleClickItem = (id: number) => {
    navigate(`/contacts/detail/${id}`)
  };

  return (
    <div>
      <h3>Contact List</h3>
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