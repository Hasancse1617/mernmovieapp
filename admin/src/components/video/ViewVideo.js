import { useEffect, useState } from "react";
import {NavLink} from 'react-router-dom';
import { Helmet } from "react-helmet";
import { useDispatch, useSelector } from 'react-redux'
import toast, {Toaster} from "react-hot-toast";
import Loader from "../loader/Loader";
import { updateAction, videoCategory, editAction } from "../../store/actions/VideoAction";
import { REMOVE_VIDEO_ERRORS, REMOVE_VIDEO_STATUS } from "../../store/types/VideoType";

const ViewVideo = (props) => {
    const dispatch = useDispatch();
    const id = props.match.params.id;

    const { videoErrors, categories, redirect, videoStatus, video, loading } = useSelector((state)=>state.VideoReducer);
    useEffect(()=>{
        dispatch(editAction(id))
    },[]);
    return (
        <div class="content-wrapper">
        <Helmet>
            <title>Edit video - Movie</title>
            <meta name="description" content="Video Edit Here" />
        </Helmet>
        <Toaster position="top-right" reverseOrder={false}/>
        <section class="content">
        <div class="container-fluid">
            <div class="row">
            <div class="col-12">
                <div class="card">
                <div class="card-header">
                    <h4 className="float-left">Video Details</h4>
                    <h3><NavLink exact to="/admin/video/all?page=1" className="btn btn-sm btn-success float-right text-bold">All Video</NavLink></h3>
                </div>
                {!loading && videoStatus ?
                    <div class="card-body">
                    <div class="form-group row">
                        <label for="exampleInputName" className="col-sm-2  col-form-label">Title</label>
                        <div className="col-sm-8">
                           <p>{video.title}</p>
                        </div> 
                    </div>
                    <div class="form-group row">
                        <label for="exampleInputEmail1" className="col-sm-2  col-form-label">Description</label>
                        <div className="col-sm-8">
                           <p>{video.description}</p>
                        </div> 
                    </div>
                    <div class="form-group row">
                        <label for="exampleInputPreview" className="col-sm-2  col-form-label">Thumbnail</label>
                        <div className="col-sm-8">
                            <img src={`${process.env.REACT_APP_API_PATH}/images/video_thumbnails/${video.thumbnail}`} width="100" height="100"></img>
                        </div>
                    </div>
                    <div class="form-group row">
                        <label for="exampleInputPreview" className="col-sm-2  col-form-label">Video</label>
                        <div className="col-sm-8">
                            <video src={`${process.env.REACT_APP_API_PATH}/videos/movie_videos/${video.video}`} controls height={250} width={300}></video>
                        </div>
                    </div>
                    <div class="form-group row">
                        <label for="exampleInput" className="col-sm-2  col-form-label">Category</label>
                        <div className="col-sm-8">
                           <p>{video.category_id.name}</p>
                        </div> 
                    </div>
                    <div class="form-group row">
                        <label for="exampleInput" className="col-sm-2  col-form-label">Genres</label>
                        <div className="col-sm-8">
                          {video.tags_id.map((tag)=>(<span><span className='badge bg-success'>{tag.name}</span>&nbsp;</span>  ))}
                        </div> 
                    </div>
                    <div class="form-group row">
                        <label for="exampleInputPassword" className="col-sm-2  col-form-label">Release Date</label>
                        <div className="col-sm-8">
                            <p>{video.release_date}</p>
                        </div> 
                    </div>
                    <div class="form-group row">
                        <label for="exampleInputPassword" className="col-sm-2  col-form-label">Duration</label>
                        <div className="col-sm-8">
                           <p>{video.duration}</p>
                        </div> 
                    </div>
                    <div class="form-group row">
                        <label for="exampleInput" className="col-sm-2  col-form-label">Quality</label>
                        <div className="col-sm-8">
                           <p>{video.quality}</p>
                        </div> 
                    </div>
                    <div class="form-group row">
                        <label for="exampleInput" className="col-sm-2  col-form-label">Price Status</label>
                        <div className="col-sm-8">
                          <p>{video.price_status}</p>
                        </div> 
                    </div>
                    <div class="form-group row">
                        <label for="exampleInputPassword" className="col-sm-2">Featured Video</label>
                        <div className="col-sm-8">
                           <p>{video.featured === true? 'true':'false'}</p>
                        </div> 
                    </div>
                    </div>
                    : <Loader/>}
                </div>
                </div>
            </div>
            </div>
        </section>
        </div>
    );
}

export default ViewVideo;