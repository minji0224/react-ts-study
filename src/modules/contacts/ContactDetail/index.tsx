import { useParams } from "react-router-dom";

const ContactDitail = () => {

  // /contacs/detail/:id (:매개변수명)
  // useParams<{필드명:문자열}>   - 타입은 string밖에 안됨(나중에 형변환)   
  // ->   :매개변수명 == 필드명
  
  const {id} = useParams<{id: string}>();

  return (
    <div>
      <h3>Contact Detail</h3>
      <p>{id}</p>
    </div>
  );
};

export default ContactDitail;