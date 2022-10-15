import React, { useEffect, useState } from 'react'
import Styled from 'styled-components';
import logo from '../images/logo.png';
import avatar from '../images/avatar.png'
import { useNavigate } from 'react-router-dom';

const Nav = ({ user }) => {
    const [show, handelShow] = useState(false);
    const navigate = useNavigate();

    const transitionNavbar = () => {
        if (window.scrollY > 100) {
            handelShow(true);
        } else {
            handelShow(false);
        }
    }

    useEffect(() => {
        window.addEventListener("scroll", transitionNavbar);
        return () => window.removeEventListener("scroll", transitionNavbar);
    }, []);

    return (
        <NavbarStyle>
            <div className={`${show && "nav"}`}>
                <div className="nav__content">
                    <img onClick={() => navigate('/')} className="logo" src={logo} alt="netflix logo" />
                    {/* <img className="logo" src={logo} alt="netflix logo" /> */}
                    <img onClick={() => navigate('/profile')} className="avatar" src={avatar} alt="profil logo" />
                    {/* <img className="avatar" src={avatar} alt="profil logo" /> */}
                </div>
            </div>
        </NavbarStyle>
    )
}

export default Nav;



// Style section
const NavbarStyle = Styled.nav`
    &{
        z-index:1000;
    }
    .nav{
        position: fixed;
        top:0;
        z-index:1000;
        left: 0;
        right: 0;
        background:#111111e8;
        height:80px;
        transition: all 0.5s ease-in-out;
    }

    .nav__content {
        .logo{
            height:50px;
            object-fit:content;
            position: fixed;
            top:19px;
            left:20px;
            cursor:pointer;
        }

        .avatar{
            border:2px solid rgba(222,222,222, 0.7);
            height:50px;
            width:50px;
            border-radius:50%;
            padding:5px;
            position: fixed;
            top:10px;
            right:20px;
            cursor:pointer;
        }
    }
`;