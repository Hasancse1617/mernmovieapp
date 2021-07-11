import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchVideos, movieGenres, fetchLoadMore } from "../../store/actions/AllMovieAction";
import { REMOVE_LOAD_MORE, REMOVE_LOAD_MOVIE } from "../../store/types/AllMovieType";
import { NavLink } from 'react-router-dom';

const AllMovie = () => {
    const dispatch = useDispatch();
    const [videotype, setVideoType] = useState('featured');
    const [page, setPage] = useState(1);
    const [genre, setGenre] = useState('');
    const [movies, setMovies] = useState([]);
    const  { allMovieGenres, allMovies, totalPage, load_movie, load_more } = useSelector((state)=>state.AllMovieReducer);
    
    
    const handleInput = (e) =>{
        setPage(1);
        setGenre(e.target.value);
    }
    const handleVideoType = (e) =>{
        setPage(1);
        setVideoType(e.target.value);
    }
    const handlePage = (e) =>{
        setPage( page+ 1 );
    }
    useEffect(()=>{
        dispatch(fetchVideos({genre,videotype,page}));
    },[genre, videotype]);

    useEffect(()=>{
        dispatch(fetchLoadMore({genre,videotype,page}));
    },[page]);

    useEffect(()=>{
        if(load_movie){
            setMovies([ ...allMovies]);
        }
        dispatch({type: REMOVE_LOAD_MOVIE});
    },[load_movie]);

    useEffect(()=>{
        if(load_more && page > 1){
            setMovies([...movies, ...allMovies]);
        }
        dispatch({type: REMOVE_LOAD_MORE});
    },[load_more,page]);

    useEffect(()=>{
        setMovies([]);
        dispatch(movieGenres());
    },[]);

    return (
        <div className="catalog">
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <div className="catalog__nav">
                            <div className="catalog__select-wrap">
                                <select className="catalog__sel" name="videogenre" onChange={handleInput}>
                                    <option value="">All genres</option>
                                    {
                                        allMovieGenres.map((genre)=>(
                                            <option key={genre._id} value={genre._id}>{genre.name}</option>
                                        ))
                                    }
                                    
                                </select>
                            </div>

                            <div className="slider-radio">
                                <input type="radio" name="video" value="featured" id="featured" checked={videotype==='featured'} onChange={handleVideoType} /><label for="featured">Featured</label>
                                <input type="radio" name="video" value="popular" id="popular" checked={videotype==='popular'} onChange={handleVideoType}/><label for="popular">Popular</label>
                                <input type="radio" name="video" value="newest" id="newest" checked={videotype==='newest'} onChange={handleVideoType}/><label for="newest">Newest</label>
                            </div>
                        </div>
                        {/* {!loading? */}
                        <div className="row row--grid"> 
                        {movies.map((movie)=>(
                            <div key={movie._id} className="col-6 col-sm-4 col-lg-3 col-xl-2">
                                <div className="card">
                                    <NavLink to={`/video/${movie._id}`} className="card__cover">
                                        <img src={`http://localhost:5000/images/video_thumbnails/${movie.thumbnail}`} alt=""/>
                                        <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M11 1C16.5228 1 21 5.47716 21 11C21 16.5228 16.5228 21 11 21C5.47716 21 1 16.5228 1 11C1 5.47716 5.47716 1 11 1Z" stroke-linecap="round" stroke-linejoin="round"/><path fill-rule="evenodd" clip-rule="evenodd" d="M14.0501 11.4669C13.3211 12.2529 11.3371 13.5829 10.3221 14.0099C10.1601 14.0779 9.74711 14.2219 9.65811 14.2239C9.46911 14.2299 9.28711 14.1239 9.19911 13.9539C9.16511 13.8879 9.06511 13.4569 9.03311 13.2649C8.93811 12.6809 8.88911 11.7739 8.89011 10.8619C8.88911 9.90489 8.94211 8.95489 9.04811 8.37689C9.07611 8.22089 9.15811 7.86189 9.18211 7.80389C9.22711 7.69589 9.30911 7.61089 9.40811 7.55789C9.48411 7.51689 9.57111 7.49489 9.65811 7.49789C9.74711 7.49989 10.1091 7.62689 10.2331 7.67589C11.2111 8.05589 13.2801 9.43389 14.0401 10.2439C14.1081 10.3169 14.2951 10.5129 14.3261 10.5529C14.3971 10.6429 14.4321 10.7519 14.4321 10.8619C14.4321 10.9639 14.4011 11.0679 14.3371 11.1549C14.3041 11.1999 14.1131 11.3999 14.0501 11.4669Z" stroke-linecap="round" stroke-linejoin="round"/></svg>
                                    </NavLink>
                                    <button className="card__add" type="button"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M16,2H8A3,3,0,0,0,5,5V21a1,1,0,0,0,.5.87,1,1,0,0,0,1,0L12,18.69l5.5,3.18A1,1,0,0,0,18,22a1,1,0,0,0,.5-.13A1,1,0,0,0,19,21V5A3,3,0,0,0,16,2Zm1,17.27-4.5-2.6a1,1,0,0,0-1,0L7,19.27V5A1,1,0,0,1,8,4h8a1,1,0,0,1,1,1Z"/></svg></button>
                                    <span className="card__rating"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M22,9.67A1,1,0,0,0,21.14,9l-5.69-.83L12.9,3a1,1,0,0,0-1.8,0L8.55,8.16,2.86,9a1,1,0,0,0-.81.68,1,1,0,0,0,.25,1l4.13,4-1,5.68A1,1,0,0,0,6.9,21.44L12,18.77l5.1,2.67a.93.93,0,0,0,.46.12,1,1,0,0,0,.59-.19,1,1,0,0,0,.4-1l-1-5.68,4.13-4A1,1,0,0,0,22,9.67Zm-6.15,4a1,1,0,0,0-.29.88l.72,4.2-3.76-2a1.06,1.06,0,0,0-.94,0l-3.76,2,.72-4.2a1,1,0,0,0-.29-.88l-3-3,4.21-.61a1,1,0,0,0,.76-.55L12,5.7l1.88,3.82a1,1,0,0,0,.76.55l4.21.61Z"/></svg> 8.3</span>
                                    <h3 className="card__title"><a href="details.html">{ movie.title }</a></h3>
                                    <ul className="card__list">
                                        <li>{ movie.price_status }</li>
                                        <li>{ movie.tags_id[0].name }</li>
                                        <li>{ new Date(movie.release_date).getFullYear()}</li>
                                    </ul>
                                </div>
                            </div>))}
                        </div>
                        {/* :<Loader/>} */}
                    </div>
                </div>		
              {totalPage !== page?
                <div className="row">
                    <div className="col-12">
                        <button className="catalog__more" type="button" onClick={handlePage}>Load more</button>
                    </div>
                </div>
                :''}
            </div>
        </div>
    );
}

export default AllMovie;