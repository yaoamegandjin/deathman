import React, {useEffect, useState} from "react";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { signin, authenticate } from '../server';
import { useNavigate } from 'react-router-dom';
import "./authentication.css"
import useSound from 'use-sound';
import backgroundMusic from './sounds/overworld-melody.mp3'
function Signin() {
    const [play, { stop }] = useSound(backgroundMusic, {loop: true, interrupt: true});
    useEffect(() => {
        play();
        return () => stop();
    }, [play, stop])
    const navigate = useNavigate();
    const [values, setValues] = useState({
        username: "",
        password: "",
        success: false,
    });

    const {username, password} = values;
    const handleChange = name => event => {
        setValues({ ...values, [name]: event.target.value });
    }
    const errorMessage = (err) => {
        toast.error(err, {
            position: "bottom-left",
        })
    }
    const successMessage = (username) => {
        toast.success("User signed in successfully!" , {
            position: "bottom-right",
        })
        setTimeout(() =>  navigate(`/${username}`), 1000);
    }
    const onSubmit = async event => {
        event.preventDefault();
        setValues({ ...values, success: false,});
        signin({username, password })
            .then(data => {
                if (data.error) {
                    setValues({ ...values, error: data.error})
                    errorMessage(data.error);

                } else {
                    authenticate(data, () => {
                        setValues({ ...values});
                        successMessage(values.username);
                    })
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
                <h1>Sign in</h1>
                <form>
                    <div>
                        <label htmlFor="username">Username</label>
                        <input type="username" name="username" placeholder="Enter your username" onChange={handleChange("username")} required/>
                    </div>
                    <div>
                        <label htmlFor="password">Password</label>
                        <input type="password" name="password" placeholder="Enter your password" onChange={handleChange("password")} required/>
                    </div>
                    <button onClick={onSubmit} type="submit">Sign in</button>
                    <span>Don't have an account? <a href="/signup">Signup</a> <a href="/forgotpassword">Forgot password?</a></span>
                </form>
            </div>
            <ToastContainer />
        </>
    );

};

export default Signin;
