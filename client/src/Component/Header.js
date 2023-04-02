import React from 'react'
import Avatar from '@mui/material/Avatar'
import "./Header.css"
const Header = () => {
  return (
    <div>
        <header>
          <nav>
            <h1>Instagram</h1>
            <div className='avtar'>
              <Avatar style={{background :"Orange"}}>P</Avatar>
            </div>
          </nav>
        </header>
    </div>
  )
}

export default Header
