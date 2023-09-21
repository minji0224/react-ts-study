

/*
  /contacts -> Layout -> ContactSidebar
  /contacts/form -> Layout / ContactSideber -> ContactForm(Outlet)
*/

import { Link, Outlet } from "react-router-dom";


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
        <Outlet />
      </section>
    </div>
  );
};

export default ContactSidebar;