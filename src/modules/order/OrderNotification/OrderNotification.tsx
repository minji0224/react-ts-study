import { useEffect, useState } from "react";
import {
  Container,
  ItemContainer,
  Wrapper,
} from "./styles";

const OrderNotification = () => {
  const [messages, setMessages] = useState<
    string[]
  >([]);

  useEffect(() => {
    // 컴포넌트가 처음 로딩될 때 응답 대기
    // content-type: text/event-stream
    const eventSource = new EventSource(
      "http://localhost:8082/orders/notifications"
    );

    // 메시지가 오면 실행
    eventSource.onmessage = (event) => {
      setMessages((prevMessages) => [
        ...prevMessages,
        event.data,
      ]);
    };

    // useEffect 훅에서 함수를 return하면
    // 컴포넌트가 없어질때(unmount) 반환 함수가 실행됨

    // 클린업
    // clearTimeout(id), clearInterval(id)
    // 서버에 응답대기: close()..
    return () => {
      eventSource.close();
    };
  }, []);

  return (
    <Wrapper>
      <Container>
        {messages.map((message, index) => (
          <ItemContainer key={index}>
            {message}
          </ItemContainer>
        ))}
      </Container>
    </Wrapper>
  );
};

export default OrderNotification;