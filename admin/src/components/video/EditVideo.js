import { useEffect, useState } from "react";
import {NavLink} from 'react-router-dom';
import { Helmet } from "react-helmet";
import { useDispatch, useSelector } from 'react-redux'
import toast, {Toaster} from "react-hot-toast";
import Loader from "../loader/Loader";
import { updateAction, videoCategory, editAction } from "../../store/actions/VideoAction";
import { REMOVE_VIDEO_ERRORS } from "../../store/types/VideoType";

const EditVideo = (props) => {
    const dispatch = useDispatch();
    const [preview, setPreview] = useState('');
    const id = props.match.params.id;
    const [state, setState] = useState({
        title:'',
        description:'',
        category:'',
        thumbnail:'',
        release_date:'',
        duration:'',
        quality:'',
        price_status:'',
        featured:false,
    });
    const handleThumnail = (e) =>{
        if(e.target.files.length !== 0){
            setPreview('');
            const reader = new FileReader();
            setState({
                ...state,
                [e.target.name]: e.target.files[0]
            });
            reader.onloadend = () =>{
                setPreview(reader.result);
            }
            reader.readAsDataURL(e.target.files[0]);
        }
    }
    const handleInput = (e) =>{
        setState({
            ...state,
            [e.target.name]: e.target.value
        })
    }
    const handleCheckd = (e) =>{
        setState({
            ...state,
            [e.target.name]: e.target.checked
        })
    }
    const handleSubmit = (e) =>{
        e.preventDefault();
        const { title, description, category, thumbnail, release_date, duration, quality, price_status, featured } = state;
        const formData = new FormData();
        formData.append('title', title);
        formData.append('description', description);
        formData.append('category', category);
        formData.append('thumbnail', thumbnail);
        formData.append('release_date', release_date);
        formData.append('duration', duration);
        formData.append('quality', quality);
        formData.append('price_status', price_status);
        formData.append('featured', featured);
        dispatch(updateAction(formData,id));
    }
    const { videoErrors, categories, redirect, videoStatus, video, loading } = useSelector((state)=>state.VideoReducer);
    useEffect(()=>{
        dispatch(videoCategory());
    },[]);
    useEffect(()=>{
        if(redirect){
            props.history.push('/admin/video/all?page=1');
        }
        if(videoErrors.length > 0){
            videoErrors.map((error)=>{
                toast.error(error.msg);
            });
            dispatch({type: REMOVE_VIDEO_ERRORS});
        }
    },[videoErrors,redirect])
    useEffect(()=>{
        dispatch(editAction(id))
    },[]);
    
    useEffect(()=>{
        if(videoStatus){
            setState({
                title: video.title,
                description: video.description,
                release_date: video.release_date,
                duration: video.duration,
                category: video.category_id,
                quality: video.quality,
                price_status: video.price_status,
                featured: video.featured
            });
            setPreview(`${process.env.REACT_APP_API_PATH}/images/video_thumbnails/${video.thumbnail}`);
        }
    },[videoStatus]);
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
                    <h4 className="float-left">Edit Video</h4>
                    <h3><NavLink exact to="/admin/video/all?page=1" className="btn btn-sm btn-success float-right text-bold">All Video</NavLink></h3>
                </div>
                {!loading ?
                <form role="form" onSubmit={handleSubmit}>
                    <div class="card-body">
                    <div class="form-group row">
                        <label for="exampleInputName" className="col-sm-2  col-form-label">Title</label>
                        <div className="col-sm-8">
                           <input type="text" name="title" value={state.title} onChange={handleInput} class="form-control" id="exampleInputName" placeholder="Enter Title"/>
                        </div> 
                    </div>
                    <div class="form-group row">
                        <label for="exampleInputEmail1" className="col-sm-2  col-form-label">Description</label>
                        <div className="col-sm-8">
                           <textarea name="description" value={state.description} onChange={handleInput} class="form-control" id="exampleInputEmail1" placeholder="Description"></textarea>
                        </div> 
                    </div>
                    <div class="form-group row">
                        <label for="exampleInputImage" className="col-sm-2  col-form-label">Thumbnail (190x270)</label>
                        <div className="col-sm-8">
                            <input type="file" onChange={handleThumnail} name="thumbnail"  class="form-control"/>
                        </div>
                    </div>
                    {preview?(
                    <div class="form-group row">
                        <label for="exampleInputPreview" className="col-sm-2  col-form-label">Thumbnail Preview</label>
                        <div className="col-sm-8">
                            <img src={preview} width="100" height="100"></img>
                        </div>
                    </div>
                    ):('')}
                    <div class="form-group row">
                        <label for="exampleInput" className="col-sm-2  col-form-label">Category</label>
                        <div className="col-sm-8">
                          <select class="form-control" name="category" onChange={handleInput}>
                              <option value="">Select Category</option>
                              {videoStatus?
                                  categories.map((category)=>(
                                    <option value={category._id} selected={video.category_id._id === category._id}>{category.name}</option>
                                  ))
                                  :''
                              }
                          </select>
                        </div> 
                    </div>
                    <div class="form-group row">
                        <label for="exampleInputPassword" className="col-sm-2  col-form-label">Release Date</label>
                        <div className="col-sm-8">
                           <input type="date" name="release_date" value={state.release_date} onChange={handleInput} class="form-control" id="exampleInputPassword" placeholder="Release Date"/>
                        </div> 
                    </div>
                    <div class="form-group row">
                        <label for="exampleInputPassword" className="col-sm-2  col-form-label">Duration</label>
                        <div className="col-sm-8">
                           <input type="text" name="duration" value={state.duration} onChange={handleInput} class="form-control"  placeholder="Duration"/>
                        </div> 
                    </div>
                    <div class="form-group row">
                        <label for="exampleInput" className="col-sm-2  col-form-label">Quality</label>
                        <div className="col-sm-8">
                          <select class="form-control" name="quality" onChange={handleInput}>
                              <option value="">Select Quality</option>
                              <option value="1080p" selected={video.quality === '1080p'}>1080p</option>
                              <option value="720p" selected={video.quality === '720p'}>720p</option>
                              <option value="400p" selected={video.quality === '400p'}>400p</option>
                          </select>
                        </div> 
                    </div>
                    <div class="form-group row">
                        <label for="exampleInput" className="col-sm-2  col-form-label">Price Status</label>
                        <div className="col-sm-8">
                          <select class="form-control" name="price_status" onChange={handleInput}>
                              <option value="">Select Price Status</option>
                              <option value="Paid" selected={video.price_status === 'Paid'}>Paid</option>
                              <option value="Free" selected={video.price_status === 'Free'}>Free</option>
                          </select>
                        </div> 
                    </div>
                    <div class="form-group row">
                        <label for="exampleInputPassword" className="col-sm-2">Featured Video</label>
                        <div className="col-sm-8">
                           <input type="checkbox" name="featured" value={state.featured} onChange={handleCheckd}   placeholder="Duration" checked={video.featured === true}/>
                        </div> 
                    </div>
                    <div class="form-group col-6 offset-sm-2">
                        <button type="submit" class="btn btn-primary">Update</button>
                    </div>
                    </div>
                </form> : <Loader/>}
                </div>
                </div>
            </div>
            </div>
        </section>
        </div>
    );
}

export default EditVideo;