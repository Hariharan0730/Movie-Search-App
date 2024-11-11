import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import logo from '../logo.jpeg';
import '../App.css';

function MovieDetails() {
    const { id } = useParams();
    const [movieDetails, setMovieDetails] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchMovieDetails = async () => {
            setLoading(true);
            try {
                const response = await fetch(`https://www.omdbapi.com/?i=${id}&apikey=${process.env.React_App_APIKEY}`);
                const data = await response.json();
                if (data.Response === "True") {
                    setMovieDetails(data);
                } else {
                    console.log("No movie details found or error:", data.Error);
                }
            } catch (error) {
                console.log("Error fetching movie details:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchMovieDetails();
    }, [id]);

    if (loading) return <p className='loading-p-tag'>Loading...</p>;
    if (!movieDetails) return <p>No details available</p>;

    return (
        <>
            <header>
                <div className='title-cont top header-cont'>
                    <img src={logo} alt="logo" className='logo' />
                    <h2>Movie Search Application</h2>
                </div>
            </header>
            <div className='master-cont'>

                <div className="movie-details">
                    <div className='title-poster'>
                        <h2 className='p-tag-details'>{movieDetails.Title}</h2>
                        <img src={movieDetails.Poster} alt={movieDetails.Title} className='poster-img-det' />
                    </div>

                    <div className='details'>
                        <span className='p-tag-details'><strong>Year:</strong> {movieDetails.Year}</span><br></br>
                        <span className='p-tag-details'><strong>Genre:</strong> {movieDetails.Genre}</span><br></br>
                        <span className='p-tag-details'><strong>Director:</strong> {movieDetails.Director}</span><br></br>
                        <span className='p-tag-details'><strong>Plot:</strong> {movieDetails.Plot}</span><br></br>
                        <span className='p-tag-details'><strong>Actors:</strong> {movieDetails.Actors}</span><br></br>
                        <span className='p-tag-details'><strong>IMDB Rating:</strong> {movieDetails.imdbRating}</span>
                    </div>
                </div>
            </div>
        </>

    );
}

export default MovieDetails;
