import * as yup from "yup";

let passRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}$/

export const registerSchema = yup.object().shape({
    email: yup.string().email("Please enter valid email format.").required("Required"),
    password: yup.string("Password contains only letter.").min(5)
        .matches(passRegex, {message: "Password must contain at least 1 digit, small letter and capital letter"}).required("Required"),
    confpassword: yup.string().oneOf([yup.ref('password'), null], "Password does not match").required("Required")
})