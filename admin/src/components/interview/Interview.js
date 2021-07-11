import { useEffect } from "react";
import { Helmet } from "react-helmet";
import toast, {Toaster} from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import Swal from 'sweetalert2'
import Loader from "../loader/Loader";
import Pagination from '../pagination/Pagination';
import { fetchInterview, deleteAction } from "../../store/actions/InterviewAction";
import { REMOVE_INTERVIEW_MESSAGE, REMOVE_INTERVIEW_REDIRECT } from "../../store/types/InterviewType";

const Interview = (props) => {
    const query = new URLSearchParams(props.location.search);
    const page = query.get('page')
    const dispatch = useDispatch();
    const { message, interviews, loading, perPage, count, pageLink } = useSelector((state)=>state.InterviewReducer);
    useEffect(()=>{
        dispatch(fetchInterview(page));
    },[]);
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
          dispatch({type: REMOVE_INTERVIEW_MESSAGE});
          dispatch({type: REMOVE_INTERVIEW_REDIRECT});
          dispatch(fetchInterview(page));
        }
      },[message]);

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
    return (
        <>
        <div class="content-wrapper">
            <Helmet>
                <title>Interviews - Movie website</title>
                <meta name="description" content="User Login Here" />
            </Helmet>
            <Toaster position="top-right" reverseOrder={false}/>
            <section class="content">
            <div class="container-fluid">
                <div class="row">
                <div class="col-12">
                    <div class="card">
                    <div class="card-header">
                        <h4 className="float-left">All Interview</h4>
                        <h3><NavLink exact to="/admin/interview/create"><button type="button" class="btn btn-primary float-right text-bold">Add Interview</button></NavLink></h3>
                    </div>
                    <div class="card-body">
                        <table id="example2" class="table table-bordered table-hover">
                        <thead>
                        <tr>
                            <th>ID.</th>
                            <th>Title</th>
                            <th>Thumbnail</th>
                            <th>Action</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                        !loading?
                        interviews.length > 0 ?
                        interviews.map((interview)=>(
                            <tr key={interview._id}>
                            <td>{ interview._id }</td>
                            <td>{ interview.title }</td>
                            <td><img width="100" width="100" src={`${process.env.REACT_APP_API_PATH}/images/interview/${interview.thumbnail}`}/></td>
                            <td>
                                <NavLink to={`/admin/interview/edit/${interview._id}`}><button  className="text-success"><i className="fas fa-edit"></i></button></NavLink>&nbsp;
                                <button onClick={() => deleteVideo(interview._id)} className="text-danger"><i className="fas fa-trash"></i></button>
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
        </>
    );
}

export default Interview;