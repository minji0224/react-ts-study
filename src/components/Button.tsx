interface ButtonProps{
  label: string;
  color?: "primary" | "secondary";
  onClick?: () => void;
  // 함수를 매개변수로 돌려주는
}

const Button = ({label,color="primary", onClick}:ButtonProps) => {
  const buttonStyle = color === "primary"
                        ? {backgroundColor: "blue" }
                        : {backgroundColor: "gray"};

  const handleClick = (e: React.MouseEvent) => {
    // 속성(props)으로 넘어온 함수가 있으면 함수를 호출
    onClick && onClick();


  };


  return <button style={buttonStyle} onClick={handleClick}>{label}</button>
  
}

export default Button;