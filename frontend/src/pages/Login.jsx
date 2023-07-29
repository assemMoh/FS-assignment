import axios from 'axios'
import React, { useState } from 'react'
import { Button, Form, Spinner } from 'react-bootstrap'
import { NavLink, useNavigate } from 'react-router-dom'

export function Login() {

  let nav = useNavigate()
  let [userData, setUserData] = useState({
    email: "",
    password: ""
  })
  let [error, setError] = useState(false)
  let [loading, setLoading] = useState(false)

  let handleChange = (e) => {
    setUserData({
      ...userData, [e.target.name]: e.target.value 
    })
  }

  let saveFormValues = (e) => {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => {
      check_credentials()
      setLoading(false)
    }, 500);
  }

  let check_credentials = async () => {
    let email = userData['email']
    let password = userData['password']
    console.log(email, password)
    try {
      let response = await axios.post('http://127.0.0.1:5000/login', {
        email,
        password
      });
      setError(false)
      console.log(response)
      localStorage.setItem("logged", 1)
      nav('/main')
    } catch (error) {
      console.log(error.response.data.message);
      setError(true);
    }
  };



  return (
    <div className='login-screen'>
      <div className="container-fluid p-3">
        <div className="row " >
          <div className="d-flex justify-content-center align-items-center col-12 col-md-12 col-lg-5" >
              <img src='marketeers.png' 
                width={"600px"} 
                height={"350px"}
                style={{objectFit: "cover"}}
                />
          </div>
          <div className="d-sm-none d-md-none col-lg-2" 
            style={{width:"0.1px", height: "80vh", backgroundColor: "white" }}
          >
          </div>
          <div className=" p-3 d-flex justify-content-center align-items-center col-12 col-md-12 col-lg-5"
          style={{flexDirection:"column" }} >
              <Form onSubmit={saveFormValues} className='w-50' method='POST'>
                
                <Form.Group className="mb-3">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control required onChange={handleChange} type="email" placeholder="Enter email" name="email" />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Password</Form.Label>
                  <Form.Control required onChange={handleChange} type="password" placeholder="Enter password" name="password"/>
                </Form.Group>

                {error && 
                  <Form.Group className="mb-3">
                    <Form.Text className="text-danger">
                      Invalid email or password.
                    </Form.Text>
                  </Form.Group>
                }
                
                <Button className='w-25' variant="success" type="submit">
                  login
                </Button>
                {loading &&  (<Spinner className='mx-3 ' animation="border" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </Spinner>)}
              </Form>
              <div className='container text-center my-3 '>
                <label>
                    Don't have an account? <NavLink className='nav-link text-primary d-inline' to='/register'> Register </NavLink>
                </label>
              </div>
          </div>
        </div>
      </div>
    
    </div>
    // </div>
  )
}
