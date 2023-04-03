import React from 'react'
import "./mix.css"
import { useState } from 'react'
import { NavLink } from "react-router-dom"
const Register = () => {

    const [passShow, setPassShow] = useState(false)
    const [inpVal, setInpVal] = useState({
        name: "",
        email: "",
        password: "",
        phone: ""

    })


    const setVal = (e) => {
        const { name, value } = e.target;
        setInpVal(() => {
            return {
                ...inpVal,
                [name]: value
            }
        })

    }

    const addUserData = async(e) => {
        e.preventDefault();
        const {name, email, password,phone}=inpVal;
        if(name===""){
            alert("Name is Mandatory !")
        }else if(email===""){
            alert("Email is Required !")
        }else if(!email.includes("@")){
            alert("Invalid Email !")
        }else if(password===""){
            alert("Password is Mandatory !")
        }else if(password.length < 7){
            alert("Invalid Password !")
        }else if(phone ===""){
            alert("Phone Number is Required !")
        }else if(phone.length !== 10){
            alert("Invalid Phone Number !")
        }else{
            const data= await fetch("/createUser",{
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify({
                    name, email, password,phone
                })
            });
            const res = await data.json();
            // console.log(res);
            if(res.status === true){
                alert("Registration Done !");
                setInpVal({...inpVal, name:"",email:"",password:"",phone:""})
            }
        }

    }
    return (
        <div>
            <section>
                <div className='form_data'>
                    <div className='form_heading'>
                        <h1>Sign Up</h1>
                        <p>Welcome to Instagram </p>
                    </div>

                    <form>
                        <div className='form_input'>
                            <lable htmlFor="name">Name</lable>
                            <input type="text" onChange={setVal} value={inpVal.name} name='name' id='name' placeholder='Enter your name..' />
                        </div>

                        <div className='form_input'>
                            <lable htmlFor="email">Email</lable>
                            <input type="email" onChange={setVal} value={inpVal.email} name='email' id='email' placeholder='Enter your email..' />
                        </div>

                        <div className='form_input'>
                            <lable htmlFor="password">Password</lable>
                            <div className='two'>
                                <input type={!passShow ? "password" : "text"} value={inpVal.password} onChange={setVal} name='password' id='password' placeholder='Enter your password..' />
                                <div className='showpass' onClick={() => setPassShow(!passShow)}  >
                                    {!passShow ? "Show" : "Hide"}
                                </div>
                            </div>
                        </div>
                        <div className='form_input'>
                            <lable htmlFor="phone">Phone</lable>
                            <input type="text" onChange={setVal} value={inpVal.phone} name='phone' id='phone' placeholder='Enter your phone number...' />
                        </div>
                        <button className='btn' onClick={addUserData}>Sign Up</button>
                        <p>Already have an Account ? <NavLink to={"/"}  >Log In</NavLink></p>

                    </form>
                </div>
            </section>
        </div>
    )
}

export default Register
