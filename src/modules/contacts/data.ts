import axios from "axios";
import useSWR from "swr";

const contactApi = axios.create({ baseURL: "http://localhost:9090" });

interface ContactData {
  id?: number;
  name: string;
  phone: string;
}

const INIT_DATA: ContactData[] = [];
const CONTACTS_DATA_KEY = "/contacts";
// const CONTACTS_DATA_KEY = "@data/contacts";

// 데이터를 가져오는 함수(서버, 로컬스토리지, 캐시, webSQL 등)
const contactsFetcher = async ([key, page]) => {
  console.log("call fetcher");
  console.log(`call fetcher--contactsFetcher() 키값: ${key}`);
  console.log(`call fetcher--contactsFetcher() 페이지값: ${page}`);

  try {
    const response = await contactApi.get<ContactData[]>(
      `${key}?_sort=id?_sort=id&_order=desc`
    );
    return response.data;
  } catch (e: any) {
    return INIT_DATA;
  }

  // const jsonStr = localStorage.getItem(CONTACTS_DATA_KEY);

  // // 로컬스토리지에 데이터가 있으면 읽은 값을 객체 변환해서 반환
  // if (jsonStr) {
  //   return JSON.parse(jsonStr) as ContactData[];
  // }

  // // 로컬스토리지에 데이터가 없으면 기존 초기값을 반환
  // return INIT_DATA;
};

export const useContactsData = (page: number) => {
  const {
    data: contactsData,
    mutate,
    isValidating: isContactDataValidating,
  } = useSWR<ContactData[]>([CONTACTS_DATA_KEY, page], contactsFetcher, {
    fallbackData: INIT_DATA, // 캐시나 데이터를 가져오기 이후에 데이터가 없을 때 반환하는 데이터

    // rebalidate: 캐시와 fetcher로 가져온 데이터를 비교 후 반환
    revalidateOnFocus: false, // 포커스될때 fetcher로 가져오기 해제

    // refreshInterval: 5000 : (특정 주기별로 데이터 가져오는 법)
  });

  function createContactData(contact: ContactData) {
    // 배열데이터 변경(mutation): 기존배열에 매개변수로 받은 객체를 추가하고 새로운 배열 반환

    // mutate(처리함수, false); : 데이터를 변경하고 변경된 데이터를 반환
    // mutate((이전데이터) => {... return 변경된데이터})
    // mutate 이후에 캐시만 업데이트 하고, fetcher를 처리하지 않음.

    mutate(async (prevData: ContactData[] = [...INIT_DATA]) => {
      console.log(`이전데이터- ${prevData}`);
      // contactsFetche() - 데이터가져오는 함수 이전이고,
      // 이전에 상태변경 없이 지금이 최초의 상태변경이면 undefined로 나옴

      // 기존 데이터로 신규 배열 생성
      let nextData = [...prevData];

      try {
        const response = await contactApi.post(CONTACTS_DATA_KEY, contact);

        if (response.status === 201) {
          nextData.unshift({ ...response.data });
        }
      } catch (e: any) {
        console.log(e);
      }

      // // 로컬스토리지에 있던거
      // if (!prevData) {
      //   // 캐시에 데이터가 없는 경우 초기 데이터로 복사
      //   nextData = [...INIT_DATA];
      // } else {
      //   // 캐시에 데이터 있는 경우 이전 데이터로 복사
      //   nextData = [...prevData];
      // }

      // // 이후 배열 앞쪽에 추가
      // nextData.unshift({ id: nextData.length + 1, ...contact });

      // // 로컬스토리지에 저장(배열을 저장)
      // localStorage.setItem(CONTACTS_DATA_KEY, JSON.stringify(nextData));

      // 변경된 데이터(상태값)를 반환
      return nextData;
    }, false);
  }

  return { contactsData, createContactData, isContactDataValidating };
};
