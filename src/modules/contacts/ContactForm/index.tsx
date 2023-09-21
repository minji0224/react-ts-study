import { useNavigate } from "react-router-dom";

const ContactForm = () => {

  // programatic방식으로 라우팅 처리
  const navigate = useNavigate();

  const handleSave = () => {
    // save하면 검증, 서버연동 등 완료가 되면 목록 화면으로 이동
    navigate("/contacts");
  };

  return (
    <div>
      <h3>Contact Form</h3>
      <button onClick={handleSave}>Save - Go to list</button>
    </div>
  );  
};

export default ContactForm;