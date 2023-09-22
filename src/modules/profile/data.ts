import useSWR from "swr";

export interface ProfileData {
  nickname: string;
  email: string;
}

/*
    함수를 호출을 하면 함수를 내보내는 함수(클로저객체를 생성하는 것)
    use...

*/
export function useProfileData() {
  /*
    useSWR은 data, error, isLoading등 쓸 수 있다.
    우리는 필요한 두개만 구조분해할당 했다.(: 이름변경)
    const {데이터, 데이터변경함수} = useSWR<데이터형식>("데이터키"(필수), 데이터조회함수, 옵션(fallbacck:초기값))
  */

  const { data: profileData, mutate: mutateProfileData } = useSWR<ProfileData>(
    "@data/profile",
    {
      // 초기값(데이터조회함수를 통해서 최초에 받아오기 전에 반환할 값) - 안넣으면 undefind
      fallbackData: { nickname: "Alice", email: "alice@gmail.com" },
    }
  );

  return { profileData, mutateProfileData };
}
