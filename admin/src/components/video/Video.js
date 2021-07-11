import { fetchVideos, deleteAction } from "../../store/actions/VideoAction";
import { NavLink } from "react-router-dom";
import { Helmet } from "react-helmet";
import toast, {Toaster} from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import Swal from 'sweetalert2'
import Loader from "../loader/Loader";
import Pagination from '../pagination/Pagination';
import { REMOVE_VIDEO_MESSAGE, REMOVE_VIDEO_REDIRECT, REMOVE_VIDEO_STATUS } from "../../store/types/VideoType";

const Video = (props) => {
  const dispatch = useDispatch();
  const query = new URLSearchParams(props.location.search);
  const page = query.get('page')
  const { message, videos, loading, perPage, count, pageLink } = useSelector((state)=>state.VideoReducer);
  const deleteVideo = (id) =>{
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteAction(id));
      }
    })
  }
  useEffect(()=>{
    if(message){
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: message,
          toast: true,
          showConfirmButton: false,
          timer: 2000
        })
      dispatch({type: REMOVE_VIDEO_MESSAGE});
      dispatch({type: REMOVE_VIDEO_REDIRECT});
      dispatch(fetchVideos(page));
    }
  },[message]);
  useEffect(()=>{
     dispatch(fetchVideos(page));
     dispatch({type: REMOVE_VIDEO_STATUS});
  },[page]);
    return (
    <div class="content-wrapper">
        <Helmet>
            <title>Videos - Movie website</title>
            <meta name="description" content="User Login Here" />
        </Helmet>
        <Toaster position="top-right" reverseOrder={false}/>
        <section class="content">
          <div class="container-fluid">
            <div class="row">
              <div class="col-12">
                <div class="card">
                  <div class="card-header">
                    <h4 className="float-left">All Video</h4>
                    <h3><NavLink exact to="/admin/video/create"><button type="button" class="btn btn-primary float-right text-bold">Add Video</button></NavLink></h3>
                  </div>
                  <div class="card-body">
                    <table id="example2" class="table table-bordered table-hover">
                      <thead>
                      <tr>
                        <th>ID.</th>
                        <th>Video Title</th>
                        <th>Category</th>
                        <th>Video Thumbnail</th>
                        <th>Action</th>
                      </tr>
                      </thead>
                      <tbody>
                    {
                      !loading?
                        videos.length > 0 ?
                        videos.map((video)=>(
                          <tr key={video._id}>
                          <td>{ video._id }</td>
                          <td>{ video.title }</td>
                          <td><span class="badge bg-success">{ video.user_type }</span></td>
                          <td><img width="100" width="100" src={`${process.env.REACT_APP_API_PATH}/images/video_thumbnails/${video.thumbnail}`}/></td>
                          <td>
                            <NavLink to={`/admin/video/edit/${video._id}`}><button  className="text-success"><i className="fas fa-edit"></i></button></NavLink>&nbsp;
                            <NavLink to={`/admin/video/details/${video._id}`}><button  className="text-primary"><i className="fas fa-eye"></i></button></NavLink>&nbsp;
                            <button onClick={() => deleteVideo(video._id)} className="text-danger"><i className="fas fa-trash"></i></button>
                          </td>
                        </tr>
                        ))
                        :'No Users found'
                      :(<Loader/>)
                    }
                      </tbody>
                    </table>
                    
                  </div>
                </div>
                </div>
              </div>
            </div>
           {!loading ? <Pagination page={page} perPage={perPage} count={count} pageLink={pageLink} /> : ''}
        </section>
        </div>
    );
}

export default Video;