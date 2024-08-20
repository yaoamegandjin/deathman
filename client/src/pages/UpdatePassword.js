import React, {useState} from "react";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import {updatePassword} from '../server';
import { useNavigate } from 'react-router-dom';
import "./authentication.css";
function UpdatePassword() {
    const navigate = useNavigate();
    const [values, setValues] = useState({
        newPassword: "",
        cNewPassword: "",
        error: "",
        message: "",

    })

    const {newPassword, cNewPassword} = values;
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
        if (newPassword === cNewPassword) {
            updatePassword({ newPassword })
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
        else {
            errorMessage("Passwords don't match");
        }
    }
    return (
        <>
            <div className="form-container">
                <h1>Update Password</h1>
                <form>
                    <div>
                        <label htmlFor="newPassword">New Password</label>
                        <input type="password" name="newPassword" placeholder="New Password" onChange={handleChange("newPassword")} required/>
                    </div>
                    <div>
                        <label htmlFor="cNewPassword">Confirm New Password</label>
                        <input type="password" name="cNewPassword" placeholder="Confirm New Password" onChange={handleChange("cNewPassword")} required/>
                    </div>
                    <button onClick={onSubmit} type="submit">Submit</button>
                </form>
            </div>
            <ToastContainer />
        </>
    )
}
export default UpdatePassword;
