import React, { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

export const RefreshHandler = ({ setIsAuthanticated }) => {
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        if (localStorage.getItem('token')) {
            setIsAuthanticated(true)
            if (location.pathname === '/' || location.pathname === '/login' || location.pathname === '/signup') {
                console.log("yyyyy");
                navigate('/home', { replace: true })
            }
        }
    }, [location,navigate, setIsAuthanticated])
    return null;
}
