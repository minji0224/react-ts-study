import * as React from "react";

import {createRoot} from "react-dom/client";
// 최상위 컴포넌트
import App from "./App";

// 리액트는 DOM앨리먼트에 리액트 컴포넌트를 삽입하는 코드가 한번은 꼭 존재.
// React 컴포넌트를 삽입할 위치를 지정
const root = createRoot(document.getElementById("root"));
root.render(<App />); // 루트에다가 App을 랜더링 한다.