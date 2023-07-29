import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { useFormik } from 'formik'
import { registerSchema } from '../schemas/registerSchema'
import {Spinner } from 'react-bootstrap'
import axios from 'axios'

export function Register() {
    

    let [show, setShow] = useState(false)
    let [registered, setRegistered]= useState(false)
    let [logged, setLogged] = useState(false)
    let [takenMail, setTakenMail] = useState(false)


    let onSubmit = async (values, actions) => {
        try {
            setRegistered(false)
            let {email, password} = values
            let response = await axios.post('http://127.0.0.1:5000/register', {
                email,
                password
              });
            console.log(response.data)
            setTakenMail(false)
            setRegistered(true)
            setShow(true)
            setTimeout(() => {
                setShow(false)
                actions.resetForm()
            }, 1000);
        }catch(e){
            setTakenMail(true)
        }
    
    }

    let {
        values,
        handleChange,
        handleBlur,
        handleSubmit,
        errors,
        touched,
        isSubmitting,
    } = useFormik({
        initialValues: {
            email: "",
            password: "",
            confpassword: "",
        },
        validationSchema: registerSchema,
        onSubmit
    })  





  return (
    <div className='container'>
        <div className='row'>    
            <div className='my-5 p-5 col-lg-10 col-md-10 col-12 m-auto bg-light'>
                <form onSubmit={handleSubmit} autoComplete='off' >
                    <div className="mb-3 w-50">
                        <label for="email" >Email</label>
                        <input type="email" id="email"
                        value={values.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={errors.email && touched.email ? "form-control border-danger" : "form-control"}
                        />
                        {errors.email && touched.email && <label className='text-danger'>{errors.email}</label>}
                        {takenMail &&  <label className='text-danger'>This email is taken.</label>}

                    </div>
                    
                    <div className="mb-3 w-25">
                        <label for="password" >Password</label>
                        <input type="password" id="password"
                        
                        value={values.password}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={errors.password && touched.password ? "form-control border-danger" : "form-control"}
                        />
                        {errors.password && touched.password && <label className='text-danger'>{errors.password}</label>}
                    </div>

                    <div className="mb-3 w-25">
                        <label for="confpassword" >Confirm Password</label>
                        <input type="password" id="confpassword"
                        
                        value={values.confpassword}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={errors.confpassword && touched.confpassword ? "form-control border-danger" : "form-control"}
                        />
                        {errors.confpassword && touched.confpassword && <label className='text-danger'>{errors.confpassword}</label>}
                    </div>

                    <div >
                        {
                            registered && <p className='text-success'>Registrated successfully! You can login now</p>
                        }
                        <button disabled={isSubmitting || logged} type="submit" className="btn btn-success w-25 text-center">Register</button>
                        {show &&  (<Spinner className='mx-3 ' animation="border" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </Spinner>)}
                    </div>
                </form>

                    

                <hr/>
                <div className='container text-center'>
                        <label>
                            Already has an account? <NavLink className='nav-link text-primary d-inline' to='/'> Login </NavLink>
                        </label>
                </div>
            </div>
        </div>
    </div>
  )
}
