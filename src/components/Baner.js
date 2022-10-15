import axios from '../axios';
import React, { useEffect, useState } from 'react'
import Styled from 'styled-components';
import requests from '../Requests';

const Baner = () => {

    const [movies, setMovies] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            const request = await axios.get(requests.fetchNetflixOriginals);
            setMovies(
                request.data.results[Math.floor(Math.random() * request.data.results.length - 1)]
            );
            return request;
        };
        fetchData();
    }, []);

    const baner = `https://image.tmdb.org/t/p/original/${movies?.backdrop_path}`;
    const truncate = (string, n) => {
        return string?.length > n ? string.substr(0, n - 1) + "..." : string;
    }
    return (
        <Header style={{
            backgroundImage: `url(${baner})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center center'
        }}>
            <div className="baner__contents">
                <h1 className="baner__title">{movies?.title || movies?.name}</h1>
                <div className="baner__buttons">
                    <button className="baner__button">play</button>
                    <button className="baner__button">My List</button>
                </div>
                <h1 className="baner__description">{truncate(movies?.overview, 150)}</h1>
            </div>
            <div className="banner--fadeBottom"></div>
        </Header>
    )
}

export default Baner;


const Header = Styled.header`
    &{
        object-fit:content;
        /* z-index:-1; */
        color:#fff;
        background: #111;
    }

    .baner__contents{
        margin-left:60px;
        padding-top:140px;
        height:300px;
        .baner__title{
            font-size:3rem;
            font-weight:800;
            padding-bottom:2px;
        }
        .baner__description{
            width:55rem;
            line-height:1.3rem;
            padding-top:1rem;
            max-width:460px;
            font-size:1.3rem;
            height:80px;
        }

        .baner__button{
            cursor:pointer;
            color:#fff;
            outline:none;
            border:none;
            color:none;
            font-weight:700;
            border-radius:0.2rem;
            padding:0.5rem 2rem;
            margin-right:1rem;
            background-color: rgba(51, 51, 51, 0.51);
            font-size:1.3rem;
            &:hover{
                color:#111;
                background:#e6e6e6;
                transition:0.25s ease-in-out;
            }
        }
    }

    .banner--fadeBottom{
        height:7.4rem;
        background-image:linear-gradient(180deg, transparent, rgba(37, 37, 37, 0.61), #111);
    }
`;