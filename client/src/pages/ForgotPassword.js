import React, {useState} from "react";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import {forgotPassword} from '../server';
import { useNavigate } from 'react-router-dom';
import "./authentication.css";
function ForgotPassword() {
    const navigate = useNavigate();
    const [values, setValues] = useState({
        email: "",
        error: "",
        message: "",

    })

    const {email} = values;
    const handleChange = name => event => {
        setValues({...values, [name]: event.target.value });
    }

    const errorMessage = (err) => {
        toast.error(err, {
            position: "bottom-left",
        })
    }
    const successMessage = (msg) => {
        toast.success(msg, {
            position: "bottom-right", 
        })
        setTimeout(() => navigate('/signin'), 2000)
    }
    const onSubmit = async event => {
        event.preventDefault();
        setValues({...values});
        forgotPassword({ email })
            .then(data => {
                if (data.error) {
                    setValues({...values, error: data.error})
                    errorMessage(data.error);
                } else {
                    setValues({...values, message: data.message})
                    successMessage(data.message)
                }
            })
            .catch();
    }
    return (
        <>
            <div className="form-container">
                <h1>Forgot Password</h1>
                <form>
                    <div>
                        <label htmlFor="email">Email</label>
                        <input type="email" name="email" placeholder="Enter your email" onChange={handleChange("email")} required/>
                    </div>
                    <button onClick={onSubmit} type="submit">Submit</button>
                </form>
            </div>
            <ToastContainer />
        </>
    )
}
export default ForgotPassword;
