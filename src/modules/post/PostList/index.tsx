import http from "@/utils/http";
import { useEffect } from "react"

const PostList = () => {
  useEffect(()=> {
    (async()=> {
      const response = await http.get("/posts");
      console.log(response); 
    })();
  }, []);

  return <div>Post List</div>;
};

export default PostList;