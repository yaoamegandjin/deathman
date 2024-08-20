import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { signup } from "../server.js"
import { useNavigate} from "react-router-dom";
import "./authentication.css";
import useSound from 'use-sound';
import backgroundMusic from './sounds/tricky-fox.mp3'
function Signup() {
    const [play, {stop}] = useSound(backgroundMusic, {loop: true, interrupt: true});

    useEffect(() => {
        play();
        return () => stop();
    }, [play, stop])
    const navigate = useNavigate();
    const [formValues, setFormValues] = useState({
        email: "",
        username: "",
        password: "",
    });
    const { username, email, password} = formValues;
    const handleChange = username => event => {
        setFormValues({ ...formValues, [username]: event.target.value });
    }
    const errorMessage = (err) => {
        toast.error(err, {
            position: "bottom-left",
        })
    }
    const successMessage = () => {
        toast.success("Account created successfully!" , {
            position: "bottom-right",
        })
        setTimeout(() =>  navigate('/signin'), 1000);
    }
    const onSubmit = async event => {
        event.preventDefault();
        setFormValues({ ...formValues});
        signup({ username, email, password })
            .then(data => {
                if (data.error) {
                    setFormValues({ ...formValues});
                    errorMessage(data.error);
                } else {
                    setFormValues({ ...formValues});
                    successMessage();
                }
            })
            .catch();
    }
    const goToHome = () => {
        navigate('/');
    };

    return (
        <>
        <i onClick={goToHome} className="fa fa-home w3-xxxlarge"></i>
        <div className="form-container">
            <h1>Sign up</h1>
            <form>
                <div>
                    <label htmlFor="email">Email</label>
                    <input type="email" name="email" placeholder="Enter your email" onChange={handleChange("email")} required/>
                </div>
                <div>
                    <label htmlFor="username">Username</label>
                    <input type="text" name="username" placeholder="Enter your username" onChange={handleChange("username")} required/>
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" placeholder="Enter your password" onChange={handleChange("password")} required/>
                </div>
                <button onClick={onSubmit}type="submit">Submit</button>
                <span>Already have an account? <a href="/signin">Signin</a></span>
            </form>
        </div>
        <ToastContainer/>
        </>
    );
};

export default Signup;
