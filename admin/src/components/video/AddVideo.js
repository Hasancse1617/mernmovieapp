import { useEffect, useState } from "react";
import {NavLink} from 'react-router-dom';
import { Helmet } from "react-helmet";
import { useDispatch, useSelector } from 'react-redux'
import toast, {Toaster} from "react-hot-toast";
import Select from 'react-select';
import {useDropzone} from 'react-dropzone';
import './AddVideo.css';
import { createAction, videoCategory, videoGenre } from "../../store/actions/VideoAction";
import { REMOVE_VIDEO_ERRORS } from "../../store/types/VideoType";

const AddVideo = (props) => {
    const dispatch = useDispatch();
    const [preview, setPreview] = useState('');
    const [videoPreview, setVideoPreview] = useState('');
    const [genres, setGenres] = useState('')
    
    const [state, setState] = useState({
        title:'',
        description:'',
        category:'',
        thumbnail:'',
        video:'',
        release_date:'',
        duration:'',
        quality:'',
        price_status:'',
        featured:false,
    });

    const onDrop = (acceptedFiles) =>{
        setVideoPreview(`Uploading ${acceptedFiles[0].size} bytes...`)
        setState({
            ...state,
            video: acceptedFiles[0]
        })
    }
    const { getRootProps, getInputProps } = useDropzone({ accept: 'video/*', multiple: false, onDrop });
    
    const handleGenre = (option) =>{
        const genre = [];
        option.map((a)=>{
            genre.push(a.value)
        })
        setGenres(genre.toString());
    }
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
        const { title, description, category, thumbnail, video, release_date, duration, quality, price_status, featured } = state;
        const formData = new FormData();
        formData.append('title', title);
        formData.append('description', description);
        formData.append('category', category);
        formData.append('genres', genres);
        formData.append('thumbnail', thumbnail);
        formData.append('video', video);
        formData.append('release_date', release_date);
        formData.append('duration', duration);
        formData.append('quality', quality);
        formData.append('price_status', price_status);
        formData.append('featured', featured);
        dispatch(createAction(formData));
        console.log(genres)
    }
    const { videoErrors, categories, genress, redirect } = useSelector((state)=>state.VideoReducer);
    useEffect(()=>{
        dispatch(videoCategory());
        dispatch(videoGenre());
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
    const options = [];
    for (let index = 0; index < genress.length; index++) {
        options.push({value: genress[index]._id, label: genress[index].name})
    }
    console.log(options)
    return (
        <div class="content-wrapper">
        <Helmet>
            <title>Create video - Movie</title>
            <meta name="description" content="Video add Here" />
        </Helmet>
        <Toaster position="top-right" reverseOrder={false}/>
        <section class="content">
        <div class="container-fluid">
            <div class="row">
            <div class="col-12">
                <div class="card">
                <div class="card-header">
                    <h4 className="float-left">Add Video</h4>
                    <h3><NavLink exact to="/admin/video/all?page=1" className="btn btn-sm btn-success float-right text-bold">All Video</NavLink></h3>
                </div>
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
                              {
                                  categories.map((category)=>(
                                    <option value={category._id}>{category.name}</option>
                                  ))
                              }
                          </select>
                        </div> 
                    </div>
                    <div class="form-group row">
                        <label for="exampleInput" className="col-sm-2  col-form-label">Genre</label>
                        <div className="col-sm-8">
                          <Select options={options} class="form-control" name="genres[]" onChange={handleGenre} isMulti>

                          </Select>
                        </div> 
                    </div>
                    <div class="form-group row">
                        <label for="exampleInputImage" className="col-sm-2  col-form-label">Video</label>
                        <section className="container-dropzone col-sm-8">
                            <div {...getRootProps({ className: 'dropzone' })}>
                                <input {...getInputProps()} />
                                <p>Drag 'n' drop some files here, or click to select files</p>
                                <em>(1 file  you can drop here)</em>
                            </div>
                            {videoPreview}
                        </section>
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
                              <option value="1080p">1080p</option>
                              <option value="720p">720p</option>
                              <option value="400p">400p</option>
                          </select>
                        </div> 
                    </div>
                    <div class="form-group row">
                        <label for="exampleInput" className="col-sm-2  col-form-label">Price Status</label>
                        <div className="col-sm-8">
                          <select class="form-control" name="price_status" onChange={handleInput}>
                              <option value="">Select Price Status</option>
                              <option value="Paid">Paid</option>
                              <option value="Free">Free</option>
                          </select>
                        </div> 
                    </div>
                    <div class="form-group row">
                        <label for="exampleInputPassword" className="col-sm-2">Featured Video</label>
                        <div className="col-sm-8">
                           <input type="checkbox" name="featured" value={state.featured} onChange={handleCheckd}   placeholder="Duration"/>
                        </div> 
                    </div>
                    <div class="form-group col-6 offset-sm-2">
                        <button type="submit" class="btn btn-primary">Submit</button>
                    </div>
                    </div>
                </form>
                </div>
                </div>
            </div>
            </div>
        </section>
        </div>
    );
}

export default AddVideo;