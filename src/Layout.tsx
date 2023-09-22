import { Link, Outlet, useNavigate } from "react-router-dom";
import { Suspense } from "react";
import { ProfileData, useProfileData } from "./modules/profile/data";
import useSWR from "swr";


function Layout () {

  // 말이 데이터지 상태값으로 생각하면 됨
  // swr데이터->상태값 : 데이터가 변경되면 컴포넌트가 다시 렌더링된다.
  // const { profileData, mutateProfileData } = useProfileData();
  const { profileData } = useProfileData();
  // 이렇게 이름 변경도 가능
  // const {nickname} = profileData; 
  console.log(profileData);

  const navigate = useNavigate();
  
  const handleEditProfile = () => {
    navigate("/profile/edit")
  };

  return (
    <div>
      <header><em style={{cursor:"pointer"}} onClick={handleEditProfile}>{profileData.nickname}</em></header>
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
          <li>
          <Link to ="/contacts">Contacts</Link>
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