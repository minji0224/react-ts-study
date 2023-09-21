import { Link, Outlet } from "react-router-dom";
import { Suspense } from "react";


function Layout () {

  return (
    <div id="layout">
      {/*   링크들이 들어가는 곳 
            a태그를 썼다면 a를 클릭했을 때 페이지이동이 되기 때문에 코드를 처음부터 다시 또 받아오는데
            Link to는 url에 맞는 컴포넌트만 로딩한다.
      */}
      <nav>
        <ul style={{display:"flex", gap: "40px"}}>
          <li>
          <Link to ="/">Home</Link>
          </li>
          <li>
          <Link to ="/todo">Todo</Link>
          </li>
        </ul>
        
      </nav>
      {/* 세부 화면들이 나오는 곳 */}
      <main>
        {/* 세부 경로의 컴포넌트들이 로딩위치 */}
        <Suspense fallback={<div>Loading...</div>} >
          <Outlet />
        </Suspense>
      </main>
    </div>
  )
};


export default Layout;