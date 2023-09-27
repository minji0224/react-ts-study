import { useEffect, useState } from "react"

const Ex = (prop) => {

  const [count, setCount] = useState(0)
  useEffect(()=> {
    console.log(prop);
    console.log(prop.label);
    console.log(count);
    console.log(setCount);
    
    
  },[count])
  

  return (
    <div>
      <p>버튼state값: ${count}</p>
      <button style={{width: "80px", height: "50px"}} onClick={()=> setCount(count +1)}>버튼</button>
    </div>
  )
}

export default Ex;