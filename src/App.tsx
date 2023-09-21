import { BrowserRouter, Routes, Route,} from "react-router-dom";
import Home from "./pages/Home";
import Layout from "./Layout";
import { lazy } from "react";
// - 정적 import 방식
// import Todo from "./components/todo/Todo";

/*
 - 동적으로 import 방식 (lazy-loading 기법)
   컴포넌트 로딩 시점에 import를 함
   웹팩으로 빌드하면 스크립트 파일(dist)이 나눠짐
*/ 

// const Todo = lazy(() => {
//   // 0.5초의 지연을 시뮬레이션하기 위해
//   return new Promise<{
//     default: React.ComponentType;
//   }>((resolve) =>
//     setTimeout(() => {
//       resolve(import("@/modules/todo/Todo"));
//     }, 500)
//   );
// });

const Todo = lazy (
  () => import("@/modules/todo/Todo")
);

const ContactSidebar = lazy(
  () => import("./modules/contacts/ContactSidebar")
);

const ContactList = lazy(
  () => import("./modules/contacts/ContactList")
);

const ContactDetail = lazy(
  () => import("./modules/contacts/ContactDetail")
);

const ContactForm = lazy(
  () =>  import("./modules/contacts/ContactForm")
);


const App = () => {
  
  //SPA(Single Page Application) : 페이지(index.html) 1개의 경로에 맞는 컴포넌트를 스크립트로 로딩한다


  // 라우팅 처리하는 곳의 가장 최상위에 <BrowserRouter>를 감싸줘야 함.
  return <BrowserRouter>   
    <Routes>

      <Route path="/" element={<Layout />}>


        {/* 컨텐츠 페이지 */}
        {/* index: 해당경로의 기본 화면 */}
        <Route element={<Home />} index/>

        {/* 기능 모듈 */}
        <Route path="todo" element={<Todo />} index />


        {/* /contacts */}
        <Route path="contacts" element={<ContactSidebar/>}>
          {/* /contacts */}
          <Route  element={<ContactList />} index />
          {/* /contacts/form */}
          <Route path="form" element={<ContactForm />} />
          {/* /contacts/detail/:id */}
          <Route  path="detail/:id" element={<ContactDetail />} />        
        </Route>




      </Route>
    </Routes>
  </BrowserRouter>;
};

export default App;