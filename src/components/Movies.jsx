import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../logo.jpeg';
import '../App.css';

function Movie() {
    const [searchBarInput, setSearchBarInput] = useState('');
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        fetchMovies('Guardians of the Galaxy');
    }, []);

    const fetchMovies = async (query) => {
        setLoading(true);
        try {
            const response = await fetch(`https://www.omdbapi.com/?s=${encodeURIComponent(query)}&apikey=${process.env.React_App_APIKEY}`);
            const data = await response.json();
            if (data.Response === "True" && data.Search) {
                setMovies(data.Search);
            } else {
                setMovies([]);
                console.log("No movies found or error:", data.Error);
            }
        } catch (error) {
            console.log("Error fetching movies:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = () => {
        fetchMovies(searchBarInput);
    };

    const handleMovieClick = (id) => {
        navigate(`/movie/${id}`);
    };

    return (
        <div>
            <header>
                <div className='title-cont top'>
                    <img src={logo} alt="logo" className='logo' />
                    <h2>Movie Search Application</h2>
                </div>
                <div className='title-cont bottom'>
                    <input 
                        type="text" 
                        placeholder='Enter a movie title...' 
                        value={searchBarInput} 
                        onChange={(e) => setSearchBarInput(e.target.value)} 
                    />
                    <button onClick={handleSearch}>Search</button>
                </div>
            </header>

            <div className='movies-container'>
                {loading ? (
                    <p>Loading...</p>
                ) : (
                    <ul>
                        {movies.map((movie) => (
                            <li key={movie.imdbID} onClick={() => handleMovieClick(movie.imdbID)}>
                                <img src={movie.Poster} alt={movie.Title} />
                                <p>{movie.Title} ({movie.Year})</p>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
}

export default Movie;
