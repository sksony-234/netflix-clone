import React, { useState } from 'react'
import Styled from 'styled-components';
import login_background from '../images/login_background.png';
import SignInScreen from './SignInScreen';
import logo from '../images/logo.png';

const Login = () => {
    const [signIn, setSignIn] = useState(false);
    return (
        <LoginStyle>
            <div className="login__background">
                <img className="logo" src={logo} alt="netflix logo" />
                <button onClick={() => setSignIn(true)} className="signIn__button">Sign In</button>
                {
                    signIn ? <SignInScreen /> : (
                        <div className="login__body">
                            <h1>Unlimited Films, TV programs and many more.</h1>
                            <h2>watch anywhere, cancel at any time</h2>
                            <h3>Ready to watch? Enter your email to create or restart your membership</h3>
                            <div className="loginScreen__input">
                                <form>
                                    <input type="email" placeholder="Enter your email address" />
                                    <button onClick={() => setSignIn(true)} className="btn">GET STARTED</button>
                                </form>
                            </div>
                        </div>
                    )}
            </div>
        </LoginStyle>
    )
}

export default Login;

const LoginStyle = Styled.div`
    color: #fff;
    position: relative;
    width: 100%;
    background: url(${login_background}) center no-repeat;
    background-size: cover;
    height: 100vh;
    z-index:1;
    .login__background{
        .logo{
            height:50px;
            object-fit:content;
            position: fixed;
            top:19px;
            left:20px;
        }
        .signIn__button{
            position: fixed;
            top:20px;
            right:20px; 
            padding:7px 15px;
            font-size:1rem;
            color:#fff;
            background-color: #e50914;
            border:none;
            outline:none;
            border-radius:3px;
            cursor:pointer;
        }
        background-image:linear-gradient(to top, rgba(0, 0, 0, 0.8) 0, rgba(0, 0, 0, 0) 60%, rgba(0, 0, 0, 0.8) 100%);
        height:100vh;
        display:flex;
        justify-content:center;
        align-items:center;

        .login__body{
            text-align: center;
            width:100vw;
            h1{
                font-size:2.2rem;
                /* margin-bottom: 5px; */
            }
            h2{
                font-size:2rem;
                font-weight:400;
                margin-bottom: 15px;
            }
            h3{
                font-size:1.3rem;
                font-weight:400;
                margin-bottom: 8px;
            }
            .loginScreen__input{
                form
                    input{
                        padding:16px 20px;
                        outline:none;
                        /* height:30px; */
                        font-size:1rem;
                        width:30%;
                        border:none;
                        max-width:600px;
                    }
                    .btn{
                        padding:16px 20px;
                        border:none;
                        color:#fff;
                        font-size:1rem;
                        background:#e50914;
                        font-weight: 600;;
                    }
                }
            }
        }
    }
`;