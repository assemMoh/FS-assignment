import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { Record } from './Record'

export  function Table() {

  let nav = useNavigate()
  let [numbers, setNumbers] = useState([])
  let [new_number, setNew_number] = useState([])

  useEffect(() => {
    getNumbers()
  }, [])

  let getNumbers = async () => {
    try {
      let logged = localStorage.getItem("logged")
      console.log(logged)
      if (logged == 0)
      {
        nav('/')
      }
      let response  = await axios.get("http://localhost:5000/get_numbers")
      
      console.log(response.data)
      setNumbers(response.data)
      console.log(numbers)

    } catch(err) {
      console.log(err)
      nav('/')
    }
  }

  let handleNewNumber = (e) => {
    setNew_number(e.target.value)
  }

  let addnumber = async () => {
    try{
      let response  = await axios.post("http://127.0.0.1:5000/add_number", {
      new_number
    })
    getNumbers()
    } catch(e) {
      console.log(e)
    }
  }


  return (
    <div>
    <div className='container-fluid p-5 '>
      <input type='button' onClick={addnumber} className='btn btn-success my-2' value="Add number"  />
      <input 
        type='number' 
        placeholder='Add a number' 
        className=' form-control w-25 mx-2 d-inline'
        onChange={handleNewNumber}
        />
      <table className="table text-light">
          <thead className="text-dark">
              <tr>
              <th >#</th>
              <th >Numbers</th>
              <th >Saved numbers</th>
              <th >Percentage</th>
              </tr>
          </thead>
          <tbody>
            {numbers.map((val) => {
                return <Record key={val.num} num={val.num} refresh={getNumbers} />
            })}
          </tbody>
      </table>
    </div>
    </div>
  )
}
