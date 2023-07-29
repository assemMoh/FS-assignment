import axios from 'axios'
import React, { useState } from 'react'

export function Record(props) {

  let {num, refresh} = props
  let [percentage, setPercentage] = useState(0)

  let handleOnChange = (e) => {
    let entry = e.target.value
    let diff = Math.min(entry, num) / Math.max(entry, num)
    let precision = 2
    let result = (diff * 100).toFixed(precision)
    setPercentage(result)
  }

  let deleteNumber = async () => {
    console.log(num)
    try{
      let response = await axios.delete("http://127.0.0.1:5000/delete_number", {
        params: {
          num: num
        }
      })
    refresh()
    } catch(e) {
      console.log(e)
    }
  }

  return (
    <tr>
        <td>
            <input type="button" onClick={deleteNumber} value='Delete'  className='btn btn-danger'/>
        </td>
        <th>
            <input 
            type='number' 
            placeholder='Enter a number' 
            className=' form-control w-50'
            onChange={handleOnChange}
            />
        </th>
        <td>{num}</td>
        <td>{percentage}%</td>
        {/* <td >
            <NavLink to={`/viewCars/${carObj.id}`}>
                <i className="text-info mx-2 bi bi-eye-fill"></i>
            </NavLink>
            <NavLink to={`/viewCars/${carObj.id}/edit`}>
                <i className="text-warning mx-2 bi bi-pencil-square"></i>
            </NavLink>
            <NavLink>
                <i onClick={erase} class="text-danger mx-2 bi bi-trash"></i>

            </NavLink>

        </td> */}
    </tr>
  )
}
