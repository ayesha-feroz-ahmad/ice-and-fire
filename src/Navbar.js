import React from 'react'
import { NavLink , useNavigate } from 'react-router-dom'

function Navbar() {
  const navigate=useNavigate()
  return (
    <nav className="navbar navbar-default">
    <div className="container">
      <div className="navbar-header">
        <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#myNavbar">
          <span className="icon-bar"></span>
          <span className="icon-bar"></span>
          <span className="icon-bar"></span>
        </button>
        <a className="navbar-brand" onClick={()=>navigate("/")}  style={{cursor:"pointer"}}>Ice and Fire</a>
      </div>
      <div className="collapse navbar-collapse" id="myNavbar">
        <ul className="nav navbar-nav navbar-right">
          <li><NavLink to="/books" className={({ isActive }) => isActive ? 'active' : ''}>Books</NavLink></li>
          <li><NavLink to="/characters">Characters</NavLink></li>
          <li><NavLink to="/houses">Houses</NavLink></li>
        </ul>
      </div>
    </div>
  </nav>
  )
}

export default Navbar