import { useEffect, useState } from "react";
import {NavLink} from 'react-router-dom';
import { Helmet } from "react-helmet";
import { useDispatch, useSelector } from 'react-redux'
import toast, {Toaster} from "react-hot-toast";
import {useDropzone} from 'react-dropzone';
import { createAction } from "../../store/actions/InterviewAction";
import { REMOVE_INTERVIEW_ERRORS } from "../../store/types/InterviewType";

const AddInterview = (props) => {
    const dispatch = useDispatch();
    const { redirect, interviewErrors } = useSelector((state)=>state.InterviewReducer);
    const [preview, setPreview] = useState('');
    const [videoPreview, setVideoPreview] = useState('');
    const [state, setState] = useState({
        title: '',
        description: '',
        thumbnail: '',
        video: ''
    })
    const onDrop = (acceptedFiles) =>{
        setVideoPreview(`Uploading ${acceptedFiles[0].size} bytes...`)
        setState({
            ...state,
            video: acceptedFiles[0]
        })
    }
    const { getRootProps, getInputProps } = useDropzone({ accept: 'video/*', multiple: false, onDrop });
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
    const handleSubmit = (e) =>{
        e.preventDefault();
        console.log(state);
        const { title, description, thumbnail, video } = state;
        const formData = new FormData();
        formData.append('title', title);
        formData.append('description', description);
        formData.append('thumbnail', thumbnail);
        formData.append('video', video);
        dispatch(createAction(formData));
    }

    useEffect(()=>{
        if(redirect){
            props.history.push('/admin/interview/all?page=1');
        }
        if(interviewErrors.length > 0){
            interviewErrors.map((error)=>{
                toast.error(error.msg);
            });
            dispatch({type: REMOVE_INTERVIEW_ERRORS});
        }
    },[interviewErrors,redirect])

    return (
        <>
         <div class="content-wrapper">
            <Helmet>
                <title>Create interview - Movie</title>
                <meta name="description" content="Video add Here" />
            </Helmet>
            <Toaster position="top-right" reverseOrder={false}/>
            <section class="content">
            <div class="container-fluid">
                <div class="row">
                <div class="col-12">
                    <div class="card">
                    <div class="card-header">
                        <h4 className="float-left">Add Interview</h4>
                        <h3><NavLink exact to="/admin/interview/all?page=1" className="btn btn-sm btn-success float-right text-bold">All Interview</NavLink></h3>
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
                            <label for="exampleInputImage" className="col-sm-2  col-form-label">Thumbnail (414x280)</label>
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
        </>
    );
}

export default AddInterview;