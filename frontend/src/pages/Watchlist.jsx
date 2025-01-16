import React, { useEffect, useState } from 'react';
import { Navbar } from '../components/Navbar';
import { useJwt } from "react-jwt";

export const Watchlist = () => {
    const [movies, setMovies] = useState([]);
    const [userId, setUserId] = useState("");

    const token = localStorage.getItem('token');
    console.log(token, "ttt");

    const { decodedToken, isExpired } = useJwt(token);

    useEffect(() => {
        if (decodedToken) {
            console.log(decodedToken._id, "decoded");
            setUserId(decodedToken._id);
        }
    }, [decodedToken]);

    const fetchWishlist = async () => {
        if (!userId) {
            console.error('User ID could not be retrieved from token');
            return;
        }
        try {
            const response = await fetch(`http://localhost:8080/api/wishlist/${userId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response.ok) {
                const data = await response.json();
                console.log('Wishlist data:', data.watchlist);
                setMovies(data.watchlist);
            } else {
                const errorData = await response.json();
                console.error('Error fetching wishlist:', errorData);
            }
        } catch (error) {
            console.error('Error during fetch:', error);
        }
    };

    const Rating = ({ currentRating, onRatingChange }) => {
        const [rating, setRating] = useState(currentRating);

        const handleRating = (newRating) => {
            setRating(newRating);
            onRatingChange(newRating);
        };

        return (
            <div className="flex space-x-1">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((star) => (
                    <svg
                        key={star}
                        onClick={() => handleRating(star)}
                        xmlns="http://www.w3.org/2000/svg"
                        fill={star <= rating ? 'currentColor' : 'none'}
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                        className={`w-6 h-6 cursor-pointer ${star <= rating ? 'text-yellow-400' : 'text-gray-300'
                            }`}
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l2.177 6.684a1 1 0 00.95.69h7.034c.969 0 1.371 1.24.588 1.81l-5.704 4.115a1 1 0 00-.364 1.118l2.177 6.684c.3.921-.755 1.688-1.538 1.118l-5.704-4.115a1 1 0 00-1.176 0l-5.704 4.115c-.783.57-1.838-.197-1.538-1.118l2.177-6.684a1 1 0 00-.364-1.118L2.049 11.11c-.783-.57-.381-1.81.588-1.81h7.034a1 1 0 00.95-.69l2.177-6.684z"
                        />
                    </svg>
                ))}
            </div>
        );
    };

    const handleRatingChange = async (movieId, score) => {
        try {
            const data = {
                "movieId": movieId,
                "userId": userId,
                "score": score
            }
          
            const response = await fetch(`http://localhost:8080/movies/rating`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                console.log(`Rating for movie ${movieId} updated to ${score}`);
                setMovies((prevMovies) =>
                    prevMovies.map((movie) =>
                        movie._id === movieId ? { ...movie, rating: score } : movie
                    )
                );
            } else {
                console.error('Failed to update rating');
            }
        } catch (error) {
            console.error('Error updating rating:', error);
        }
    };

    useEffect(() => {
        if (userId) {
            fetchWishlist();
        }
    }, [userId]);

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
                            <p className="mb-3 font-normal text-gray-700">Description: {el.description}</p>
                            <p className="mb-3 font-normal text-gray-700">IMDB Rating: {el.rating}</p>

                            {/* Rating Component */}

                            <div className='text-center ml-12 mb-8'>
                                <Rating currentRating={el.rating || 0} onRatingChange={(newRating) => handleRatingChange(el._id, newRating)} />
                            </div>
                            <button type="button" className="text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800" >  Watch Now </button>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
};
