import React, { useEffect } from 'react'
import "./Home.css" 
const Home = () => {

  const homepage = async ()=>{
    let token= localStorage.getItem("UserCookieee");
    const res = await fetch("/createPost",{
      method:"POST",
      headers:{
        "Content-Type":"application/json",
        "x-api-key":token
      }

    })

    const data= await res.json();
    console.log(data)

  }

  useEffect(()=>{
    homepage();
  },[])
  return (
    <div className='Home-Page'>
      <div className='divOne'>
          <div className='a'>
            <div className='addPic'>
              
            </div>
          </div>
      </div>
      <div className='divTwo'>

      </div>
      <div className='divThree'>

      </div>
      
    </div>
  )
}

export default Home
