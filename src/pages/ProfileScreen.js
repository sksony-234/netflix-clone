import React from 'react'
import Nav from '../components/Nav'
import Styled from 'styled-components'
import avatar from '../images/avatar.png'
import { selectUser } from '../features/UserSlice'
import { useSelector } from 'react-redux'
import { auth } from '../firebase'
import Plans from '../components/Plans'

const ProfileScreen = () => {
    const user = useSelector(selectUser)

    return (
        <ProfileStyle>
            <Nav />
            <div className="profile__body">
                <h1>Edit Profile</h1>
                <div className="profile__info">
                    <img src={avatar} alt="profile" />
                    <div className="profile__details">
                        <h2>{user.email}</h2>
                        <div className="profile__plans">
                            <h3>Plans</h3>
                            <Plans />
                            <button onClick={() => auth.signOut()} className="profile__signout">Sign Out</button>
                        </div>
                    </div>
                </div>
            </div>
        </ProfileStyle>
    )
}

export default ProfileScreen;

const ProfileStyle = Styled.div`
    min-height:100vh;
    background:#111;
    color:#fff;
    .profile__body{
        width:50%;
        margin-left:auto;
        margin-right:auto;
        padding-top:5%;

        h1{
            font-size:3rem;
            font-weight:600;
            margin-bottom:15px;
        }

        .profile__info{
            display:flex;
            img{
                height:100px;
                border:3px solid gray;
            }
            .profile__details{
                margin-left:21px;
                flex:1;
                width:100%;
                h2{
                    
                    background-color: gray;
                    padding:7px 15px;
                }

                .profile__plans{
                    margin-top:20px;
                    h3{
                        border-bottom: 2px solid #282e2c;
                    }
                    .profile__signout{
                        padding:10px 20px;
                        font-size:1rem;
                        margin-top:2%;
                        width:100%;
                        color:#fff;
                        background-color: #e50914;
                        border:none;
                        outline:none;
                        cursor: pointer;
                    }
                }
            }
        }
    }
`;