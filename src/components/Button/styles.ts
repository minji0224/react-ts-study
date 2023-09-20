import styled from "@emotion/styled";

// styled-component
// style집합에 대한 class를 생성함
// <button class= "css-해쉬"> : 이모션 라이브러리를 사용한 것

// label: 클래스명 추가해주는 방법
// -> 클래스명케밥케이스 - 클래스명으로 컴포넌트를 찾기 쉽다.

export const PrimaryButton = styled.button`
  label: primary-btn;
  background-color: #0000ff;
  color: white;
  width: 80px;
`;

// ButtonProps는 HTMLButtonElement의 HTML속성을 확장
export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  primary?: boolean;
  size?: "md" | "sm" | "lg";
}

const getHeight = ({ size }: ButtonProps) => {
  if (size === "sm") {
    return 30;
  } else if (size === "lg") {
    return 50;
  } else {
    return 40;
  }
};

// style.엘리먼트명<속성타입(제너릭)>`스타일목록`
// `${(속성)=>"반환식"}`
export const Button = styled.button<ButtonProps>`
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  background-color: ${({ primary }) => (primary ? "blue" : "gray")};
  font-size: ${({ primary }) => (primary ? 20 : 13)}px;
  height: ${getHeight}px;
  color: white;
  cursor: pointer;
  transition: background-color 0.3s ease;

  // &- 현재 스타일드 컴포넌트의 클래스명
  &:hover {
    background-color: ${({ primary }) => (primary ? "darkblue" : "darkgray")};
  }
`;

// 기존 스타일드 컴포넌트를 이용하여 다른 컴포넌트 생성
// 기존 스타일 + 신규 스타일의 css클래스가 생성됨
export const OutlinedButton = styled(Button)`
  border: 2px solid ${({ primary }) => (primary ? "blue" : "gray")};
  background-color: white;
  color: ${({ primary }) => (primary ? "blue" : "gray")};
`;
