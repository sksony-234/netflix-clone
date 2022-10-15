import axios from '../axios';
import React, { useEffect, useState } from 'react';
import Styled from 'styled-components';

const Row = ({ title, fetchUrl, isLarge = false }) => {
    const [movies, setMovies] = useState([]);
    const base_url = "https://image.tmdb.org/t/p/original/";
    useEffect(() => {
        const fetchData = async () => {
            const request = await axios.get(fetchUrl);
            setMovies(request.data.results);
            return request;
        }

        fetchData();
    }, [fetchUrl]);

    // console.log(movies);

    return (
        <RowStyle>
            <h2>{title}</h2>
            <div className="row__posters">
                {movies.map((movie) => (
                    ((isLarge && movie.poster_path) || (!isLarge && movie.backdrop_path)) && (
                        <img
                            className={`row__poster ${isLarge && "row__posterLarge"}`}
                            key={movie.id}
                            src={`${base_url}${isLarge ? movie.poster_path : movie.backdrop_path}`} alt={movie.name}
                        />
                    )

                ))}
            </div>
        </RowStyle>
    )
}

export default Row;

const RowStyle = Styled.section`
    color:#fff;
    h2{
        margin-left:20px;
    }
    .row__posters{
        display:flex;
        overflow-y:hidden;
        overflow-x: scroll;
        padding:20px;

        &::-webkit-scrollbar{
            display:none;
        }
        .row__poster{
            max-height:100px;
            object-fit:content;
            margin-right:10px;
            width:100%;
            transition:transform 0.4s;
            &:hover{
                transform:scale(1.08);
                /* opacity:1; */
                /* z-index:-1; */
            }
        }
        .row__posterLarge{
            max-height:250px;
            &:hover{
                transform:scale(1.09);
                opacity:1;
            }
        }
    }

`;
