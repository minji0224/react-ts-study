

/*
  /contacts -> Layout -> ContactSidebar
  /contacts/form -> Layout / ContactSideber -> ContactForm(Outlet)
*/

import { Link, Outlet } from "react-router-dom";
import { Suspense } from "react";


const ContactSidebar = () => {
  return (
    <div style={{display:"flex", gap:"20px"}}>
      <aside style={{width:"200px"}}>
        <h2>Contacts</h2>
        <ul>
          <li><Link to="/contacts/form">Form</Link></li>
          <li><Link to="/contacts">List</Link></li>
        </ul>
      </aside>
      <section>
        <Suspense fallback={<div>Loading...</div>}>
          {/* 중첩된 라우트에서 자식 컴포넌트를 렌더링하기 위한 Outlet */}
          <Outlet />
        </Suspense>
      </section>
    </div>
  );
};

export default ContactSidebar;