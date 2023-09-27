import http from "@/utils/http";
import { useEffect, useRef, useState } from "react"

interface PostItem {
  id: number;
  title: string;
  content: string;
  files: PostFile[]; 
}

interface PostFile {
  contentType: string;
  originalFileName: string;
  uuidFileName: string;
}

/*
  코드가 길어져서 컴포넌트(함수)로 빼줌.
  컴포넌트로 쓸 때는 매개변수를 객체로 받아야함.
*/
function MeediaElement({contentType, uuidFileName}: {contentType: string; uuidFileName: string}) {
  if(contentType.includes("image")) {
    //includes(배열안에 해당사항 있는지)
    return (
      <img width= {300} src={`http://localhost:8080/posts/files/${uuidFileName}`} />
    );
  } else {
    return (
      // 비디오태그는 소스를 따로 빼줘야 됨
      <video>
        <source src={`http://localhost:8080/posts/files/${uuidFileName}`} type={contentType}>
        </source>
      </video>
    );
  }
}


const PostList = () => {

  const [posts, setPosts] = useState<PostItem[]>([]);

  const fileRef = useRef<HTMLInputElement>();
  const titleRef = useRef<HTMLInputElement>();
  const contentRef = useRef<HTMLTextAreaElement>();
  const formRef = useRef<HTMLFormElement>();


  // useEffect(() => {
  //   (async () => {
  //     const response = await http.get("/posts");
  //     // const response = await http.get("/post");
  //     console.log(response);
  //   })();
  // }, []);


  useEffect(()=> {}, []);

  const handlePost = (e: React.FormEvent) => {
    e.preventDefault();
    // onSummit을 하게 되면 e: React.FormEvent해줘야 됨 : 안그러면 현재페이지에 폼데이터 전송해서 서버에 안들어감
    // multipart/form-data를 파일업로드 하려면
    const formData = new FormData();
    // 파일목록(fileList)을 반복문 돌리려고 배열로 변환
    Array.from(fileRef.current.files).forEach(file => {
      formData.append("files", file)
    });

    formData.append("title", titleRef.current.value);
    formData.append("content", contentRef.current.value);

    (async()=> {
      const response = await http.post<PostItem>("/posts/with-file", formData);
      console.log(response);
      if(response.status === 201) {
        formRef.current.reset();
        setPosts([{...response.data}, ...posts]);
        console.log(response.data.id);
        
      }
    })();
  };

  return (
  <div>
    <h2>Post List</h2>  
    <form onSubmit={handlePost} ref={formRef} style={{display: "flex", flexDirection: "column", width: "400px"}}>
      <input type="file" multiple accept="image/*, video/*" ref={fileRef}/>
      <input placeholder="제목" ref={titleRef}/>
      <textarea placeholder="내용" ref={contentRef}></textarea>
      <button>게시</button>
    </form> 
    <div>
      <ul>
        {posts.map((post)=> (
          <li key={`post-item-${post.id}`}>
            <h3>{post.title}</h3>
            <p>{post.content}</p>
            <div>
              {post.files.map((file) => (
                <MeediaElement uuidFileName={file.uuidFileName} contentType={file.contentType} />
              ))}
            </div>
          </li>
        ))}
      </ul>
    </div>
  </div>
  );
};

export default PostList;