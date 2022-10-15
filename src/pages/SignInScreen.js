import React, { useRef } from 'react';
import Styled from 'styled-components';
import { auth } from '../firebase';

const SignInScreen = () => {
    const emailRef = useRef(null)
    const passwordRef = useRef(null)

    const register = (e) => {
        e.preventDefault();

        auth.createUserWithEmailAndPassword(
            emailRef.current.value,
            passwordRef.current.value).then((authUser) => {
                console.log(authUser);
            }).catch((error) => {
                alert(error.message);
            })
    }
    const signIn = (e) => {
        e.preventDefault();

        auth.signInWithEmailAndPassword(
            emailRef.current.value,
            passwordRef.current.value).then((authUser) => {
                console.log(authUser);
            }).catch((error) => {
                alert(error.message);
            })
    }
    return (
        <SignInStyle>
            <form>
                <h1>Sign In</h1>
                <input ref={emailRef} placeholder="Email" type="email" />
                <input ref={passwordRef} placeholder="Password" type="password" />
                <button onClick={signIn} type="submit">Sign In</button>
                <h4>
                    <span className="gray">New to Netflix? </span>
                    <span onClick={register} className="signUp__link">Sign Up now.</span>
                </h4>
            </form>
        </SignInStyle>
    )
}

export default SignInScreen;

const SignInStyle = Styled.div`
    max-width:500px;
    padding:70px;
    background:#000;
    form{
        display:flex;
        flex-direction: column;
        justify-content:center;
        text-align:center;
        h1{
            margin-bottom:20px;
            text-align:left;
        }
        input{
            padding:10px 17px;
            margin:5px;
            border:none;
            outline:none;
            border-radius:5px;
            font-size:1.1rem;
            width:300px;
        }
        button{
            padding:10px;
            color:#fff;
            background: #e50914;
            font-size:1.1rem;
            font-weight:600;
            border:none;
            outline:none;
            border-radius: 3px;
            margin:20px 0px;
            cursor:pointer;
        }

        h4{
            .gray{
                color:gray;
            }
            .signUp__link{
                cursor: pointer;
                &:hover{
                    text-decoration: underline;
                }
            }
        }
    }
`;