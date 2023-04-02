import React, { useState } from 'react'
import "./mix.css"
import {NavLink} from "react-router-dom"


function Login() {

    const [passShow,setPassShow]=useState(false);//true/false

    const [inpVal,setInpVal]=useState({
        "email":"",
        "password":""

    })

    const setVal =(e)=>{
        const {name,value}=e.target;
        setInpVal(()=>{
            return{
                ...inpVal,
                [name]:value
            }
        })
    }
    
    const loginUser = (e) => {
        e.preventDefault();
        const {email, password}=inpVal;
        if(email===""){
            alert("Email is Required !")
        }else if(!email.includes("@")){
            alert("Invalid Email !")
        }else if(password===""){
            alert("Password is Mandatory !")
        }else if(password.length < 7){
            alert("Invalid Password !")
        }else{
            alert("Registration Done !")
        }

    }

    return (
        <div>
            <section>
                <div className='form_data'>
                    <div className='form_heading'>
                        <h1>Welcome Back </h1>
                        <p>Please give valid credentials !</p>
                    </div>

                    <form>
                        <div className='form_input'>
                            <lable htmlFor="email">Email</lable>
                            <input type="email" onChange={setVal} value={inpVal.email} name='email' id='email' placeholder='Enter your email..' />
                        </div>
                        <div className='form_input'>
                            <lable htmlFor="password">Password</lable>
                            <div className='two'>
                                <input type={!passShow ? "password" :"text"} onChange={setVal} value={inpVal.password} name='password' id='password' placeholder='Enter your password..' />
                                <div className='showpass' onClick={()=>setPassShow(!passShow)}  >
                                    {!passShow ? "Show":"Hide"}
                                </div>
                            </div>
                        </div>
                        <button className='btn' onClick={loginUser} >Log In</button>
                        <p>Dont't have an Account ?<NavLink to={"/register"} >Sign Up</NavLink> </p>

                    </form>
                </div>
            </section>
        </div>
    )
}

export default Login