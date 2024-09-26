import React, {useState} from 'react';



function Home() {
  const [inputValue, setInputValue] = useState('');
const handlechange = (e)=> {
  setInputValue(e.target.value);
  console.log(e.target.value);
}
  return(
  <div>
     <h1>{"Home"}</h1>;
       <input  value={inputValue} onChange={ handlechange}/>

  </div>
  )
}
export default Home;