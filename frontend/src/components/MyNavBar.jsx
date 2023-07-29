import axios from 'axios'
import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'

export function MyNavBar() {

  let nav = useNavigate()

  let logout = () => {
    // nav('/')
    localStorage.setItem("logged", 0)
  }

  return (
    <div>
       <nav className="navbar navbar-expand-lg navbar-light" style={{backgroundColor: "aliceblue"}}>
          <div className="container">
            <NavLink className="navbar-brand"  to="#">
              <img 
                src='marketeers-logo.png'
                width={"300px"}
                height={"100px"}
              />
            </NavLink>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav ms-auto mb-2 mb-lg-0 fs-3">
                <li className="nav-item">
                  <NavLink className="nav-link active" aria-current="page" to="#">Home</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" onClick={logout} to={'/'}>Logout</NavLink>
                </li>
              </ul>
            </div>
          </div>
        </nav>
    </div>
  )
}
