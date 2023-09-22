import { MutableRefObject, useRef } from "react";
import { useProfileData } from "../data";

const ProfileEdit = () => {
  // useRef는 null체크 안해도 됨.
  const nicknameRef = useRef() as MutableRefObject<HTMLInputElement>;
  const emailRef = useRef() as MutableRefObject<HTMLInputElement>;

  const {profileData, mutateProfileData} = useProfileData();
  const {nickname, email} = profileData;

  const handleSave = () => {
    // 서버하고 연동한 다음에 mutate (동시에 여러개 내보내야 될때는 다른 방법)
    mutateProfileData({nickname: nicknameRef.current.value, email: emailRef.current.value});
  };

  return <div>
    <input ref={nicknameRef} defaultValue={nickname}/>
    <input ref={emailRef} defaultValue={email}/>
    <button onClick={handleSave}>save</button>
  </div>;

}


export default ProfileEdit;