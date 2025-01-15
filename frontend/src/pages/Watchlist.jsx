import React, { useEffect, useState } from 'react'
import { Navbar } from '../components/Navbar';

export const Watchlist = () => {
    const [movies, setMovies] = useState([]);

    const fetchMovies = async () => {
        const res = await fetch("http://localhost:8080/api/users/6785944c5d0e94a06b0c6f0f/watchlist")
        const result = await res.json()
        console.log(result)
        setMovies(result);
    }

    useEffect(() => {
        fetchMovies();
    }, [])

    return (
        <>
        <Navbar/>
        <div className='mt-24'>
          My Watchlist
        </div>
        </>
    )
}
