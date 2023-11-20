import { useState, useEffect } from "react";

import { useMutation } from "@apollo/client";
import { LOGIN } from "../utilities/mutations";
import Auth from '../utilities/auth';
import { Link } from "react-router-dom";

export default function LoginPage() {

    const [formInputs, setFormInputs] = useState({
        email: '',
        password: '',
    });
    const [loginErrorMsg, setLoginErrorMsg] = useState('');

    const [login, { error }] = useMutation(LOGIN);

    const changeInputs = (element) => {
        if (element.name === 'email-input') {
            setFormInputs({
                email: element.value,
                password: formInputs.password,
            });
        } else {
            setFormInputs({
                email: formInputs.email,
                password: element.value,
            });
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const { data } = await login({
                variables: { ...formInputs },
            });
            if (!data) {
                console.log('No acc found');
            } else {
                setLoginErrorMsg('');
                setFormInputs({
                    email: '',
                    password: '',
                });
                Auth.login(data.login.token);
            }
        } catch (err) {
            console.log(err);
            setLoginErrorMsg('Incorrect username or password');
        }
    }

    return (
        <>
            <section id="login-page-sect" style={{ display: 'flex', justifyContent: 'center', padding: '70px 0px', width: '65%', margin: 'auto'}}>
                <div id="login-page-holder" style={{ display: 'flex', flexDirection: 'column', width: '65%', minHeight: 450, padding: 25, justifyContent: 'space-evenly', boxShadow: 'rgba(0, 0, 0, 0.1) 7px 7px 7px 5px', borderRadius: 25}}>
                    <div id="login-header-hold" style={{ margin: '30px 0px'}}>
                        <h1 style={{ textAlign: 'center'}}>Login</h1>
                    </div>
                    <div id="login-form-hold">
                        <form id="login-form" action="submit" onSubmit={() => handleSubmit(event)} style={{ boxShadow: 'rgba(0, 0, 0, 0.05) 5px 5px 12px 0px', borderRadius: 25 }}>
                            <div id="login-inputs-hold" style={{ display: 'flex', textAlign: 'left', marginBottom: 40, alignItems: 'center', flexDirection: 'column' }}>
                                <div id="email-hold" style={{ display: 'flex', flexDirection: 'column', width: '80%', marginBottom: 20 }}>
                                    <label htmlFor="email-input">Email:</label>
                                    <input className="login-inputs" style={{ padding: '5px 10px', marginTop: 5, minWidth: 230 }} type="email" name="email-input" id="email-input" onChange={() => changeInputs(event.target)} placeholder="Enter your email" value={formInputs.email} />
                                </div>
                                <div id="password-hold" style={{ display: 'flex', flexDirection: 'column', width: '80%' }}>
                                    <label htmlFor="password-input">Password:</label>
                                    <input className="login-inputs" style={{ padding: '5px 10px', marginTop: 5, minWidth: 230 }} type="password" name="password-input" id="password-input" onChange={() => changeInputs(event.target)} placeholder="Enter your password" value={formInputs.password} />
                                </div>
                            </div>
                            <div id="login-btn-hold" style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column' }}>
                                <button id="login-btn" type="submit" style={{ width: 100, height: 55, margin: 'auto' }}>Enter</button>
                                <p id="login-err-msg" style={{ margin: '25px 0px' }}>{loginErrorMsg}</p>
                                <p className="listing-not" style={{ marginBottom: 5}}>Don't have an account?</p>
                        <Link to={'/create-account'}><p className="linkanchor">Create a profile</p></Link>
                            </div>
                        </form>
                    </div>
                </div>
            </section>        
        </>
    );
}