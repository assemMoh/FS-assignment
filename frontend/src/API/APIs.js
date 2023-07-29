import axios from "axios";

let login = () => axios({
    method: "POST",
    url: "http://localhost:5000/login",
    headers: {
        "Content-Type": "application/json"
    },
    body:
    {
        "email": 'foo1@gmail.com',
        "password": "111"
    }
}).then((response) => {
    console.log(response.data)
}).catch((error) => {
    console.log(error)
})

export {login}
