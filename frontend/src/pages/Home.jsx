import React, { useEffect, useState } from 'react'
import { Footer } from '../components/Footer';
import { Navbar } from '../components/Navbar';

export const Home = () => {

    const [movies, setMovies] = useState([]);
    const [movieId, setMovieId] = useState('')

    const fetchMovies = async () => {
        const res = await fetch("http://localhost:8080/movies/getall")
        const result = await res.json()
        console.log(result)
        setMovies(result);
    }

    useEffect(() => {
        fetchMovies();
    }, [])

    const handleAddToWatchlist = async (movieId) => {
        try {
            const res = await fetch("http://localhost:8080/api/users/6785944c5d0e94a06b0c6f0f/watchlist", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ movieId }),
            });
            const result = await res.json();
            if (res.ok) {
                alert("Movie added to watchlist successfully.");
                setMovieId('');
                fetchMovies();
            } else {
                alert(result.message || "Failed to add movie to watchlist.");
            }
        } catch (error) {
            console.error("Error adding movie to watchlist:", error);
            alert("An error occurred while adding the movie.");
        }

        console.log(id);
    }

    return (
        <>
            <Navbar />
            <div className="grid grid-cols-1 mt-14 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">

                {movies.map((el, index) => (
                    <div
                        key={index}
                        className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800">
                        <a href="#">
                            <img className="rounded-t-lg" src={el.image} alt={el.name} />
                        </a>
                        <div className="p-5">
                            <a href="#">
                                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">
                                    {el.name}
                                </h5>
                            </a>
                            <p className="mb-3 font-normal text-gray-700">Name: {el.title}</p>
                            <p className="mb-3 font-normal text-gray-700">description: {el.description}</p>
                            <p className="mb-3 font-normal text-gray-700">IMDB Rating: {el.rating}</p>
                            <button type="button" class="text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Watch Now</button>
                            <button type="button" class="text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900" onClick={() => handleAddToWatchlist(el._id)}>Add to Watchlist</button>
                        </div>
                    </div>
                ))}
            </div>
            <Footer />
        </>
    )
}
