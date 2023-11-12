import { useState, useEffect } from "react";

import { useMutation } from "@apollo/client";
import { LOGIN } from "../utilities/mutations";
import Auth from '../utilities/auth';

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
            setLoginErrorMsg('User not found');
        }
    }

    return (
        <>
            <section id="login-page-sect" style={{ display: 'flex', justifyContent: 'center'}}>
                <div id="login-page-holder" style={{ display: 'flex', flexDirection: 'column', width: '70%', height: 400, padding: 25, marginTop: 40}}>
                    <div id="login-header-hold" style={{ marginBottom: 30}}>
                        <h1 style={{ textAlign: 'center'}}>Login</h1>
                    </div>
                    <div id="login-form-hold">
                        <form id="login-form" action="submit" onSubmit={() => handleSubmit(event)}>
                            <div id="login-inputs-hold" style={{ display: 'flex', justifyContent: 'space-evenly', textAlign: 'left', marginBottom: 50 }}>
                                <div id="email-hold" style={{ display: 'flex', flexDirection: 'column', width: '40%' }}>
                                    <label htmlFor="email-input">Email:</label>
                                    <input style={{ padding: 5, paddingLeft: 10, marginTop: 5 }} type="email" name="email-input" id="email-input" onChange={() => changeInputs(event.target)} placeholder="Enter your email" value={formInputs.email} />
                                </div>
                                <div id="password-hold" style={{ display: 'flex', flexDirection: 'column', width: '40%' }}>
                                    <label htmlFor="password-input">Password:</label>
                                    <input style={{ padding: 5, paddingLeft: 10, marginTop: 5 }} type="password" name="password-input" id="password-input" onChange={() => changeInputs(event.target)} placeholder="Enter your password" value={formInputs.password} />
                                </div>
                            </div>
                            <div id="login-btn-hold" style={{ marginTop: 30 }}>
                                <button id="login-btn" type="submit">Enter</button>
                                <h4 id="login-err-msg" style={{ marginTop: 25 }}>{loginErrorMsg}</h4>
                            </div>
                        </form>
                    </div>
                </div>
            </section>        
        </>
    );
}