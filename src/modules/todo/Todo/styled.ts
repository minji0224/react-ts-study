import styled from "@emotion/styled";

export const TodoContainer = styled.div`
  label: todo-container;

  header {
    input {
      border: 1px solid green;
    }

    /* 자식선택자만 이용 */
    > button {
      border: 1px solid green;
      background-color: white;
    }
  }

  ul {
    margin-top: 20px;

    li {
      padding: 7px;
      border: 1px solid green;
      margin-bottom: 3px;
      width: fit-content;

      button {
        border: 1px solid black;
      }
    }
  }

  footer {
    color: green;

    data {
      font-weight: bold;
    }
  }

  /* 
  1. id가 app-theme인 요소의 클래스가 light인 요소 선택.
  2. #app-theme.light 요소의 자손인 현재클래스(&) 선택  
  */
  #app-theme.light & {
    header {
      input {
        background-color: white;
        color: black;
      }
    }
  }

  #app-theme.dark & {
    header {
      input {
        background-color: black;
        color: white;
      }
    }
  }
`;
