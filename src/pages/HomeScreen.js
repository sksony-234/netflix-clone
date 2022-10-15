import React from 'react'
import Baner from '../components/Baner'
import Nav from '../components/Nav'
import Row from '../components/Row'
import requests from '../Requests'
// import styled from 'styled-components'

const HomeScreen = () => {
    return (
        <div style={{ background: "#111" }}>
            <Nav />

            <Baner />

            <Row title="Netflix Originals" fetchUrl={requests.fetchNetflixOriginals} isLarge />
            <Row title="Trending Now" fetchUrl={requests.fetchTrending} />
            <Row title="Top Rated" fetchUrl={requests.fetchTopRated} />
            <Row title="Action Movies" fetchUrl={requests.fetchActionMovies} />
            <Row title="Comedy Movies" fetchUrl={requests.fetchComedyMovies} />
            <Row title="Horror Movies" fetchUrl={requests.fetchHorrorMovies} />
            <Row title="Romance Movies" fetchUrl={requests.fetchRomanceMovies} />
            <Row title="Documentries" fetchUrl={requests.fetchDocumentries} />
        </div>
    )
}

export default HomeScreen