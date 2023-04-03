import React from 'react'
import Avatar from '@mui/material/Avatar'
import "./Header.css"
import logo from "../img/logo.pnj"
const Header = () => {
  return (
    <div>
        <header>
          <nav>
            <img src={logo}  alt=""/>
            <div className='avtar'>
              <Avatar style={{background :"Black"}}>P</Avatar>
            </div>
          </nav>
        </header>
    </div>
  )
}

export default Header
