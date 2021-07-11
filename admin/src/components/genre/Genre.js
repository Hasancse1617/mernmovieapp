import { useEffect } from "react";
import { Helmet } from "react-helmet";
import toast, {Toaster} from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { REMOVE_GENRE_MESSAGE, REMOVE_GENRE_LOADER, REMOVE_GENRE_ERRORS } from "../../store/types/GenreType";
import { fetchgenries, fetchGenre, deleteAction } from '../../store/actions/GenreAction';
import Loader from "../loader/Loader";
import Pagination from "../pagination/Pagination";
import AddModal from './AddModal';
import EditModal from "./EditModal";
import Swal from 'sweetalert2'

const Genre = (props) => {
    const { message, loading} = useSelector((state) => state.GenreReducer);
    const { genries, count, perPage, pageLink, genreErrors } = useSelector((state)=>state.GenreReducer);
    
    const dispatch = useDispatch();
    const query = new URLSearchParams(props.location.search);
    const page = query.get('page')
    // alert(page);

    const deleteGenre =  (id) =>{
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

    const editGenre = (id) =>{
      //  alert(id);
        dispatch(fetchGenre(id));
    }
    useEffect(() => {
      
       if(message){
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: message,
            toast: true,
            showConfirmButton: false,
            timer: 2000
          })
          document.getElementById('close-modal').click();
          document.getElementById('edit-modal').click();
          dispatch({type: REMOVE_GENRE_LOADER});
          dispatch({type: REMOVE_GENRE_MESSAGE});
          dispatch(fetchgenries(page));
       }  

    },[message]);

    useEffect(()=>{
        // alert(createErrors.length);
        if(genreErrors.length > 0){
            genreErrors.map((error)=>{
                toast.error(error.msg);
            });
            dispatch({type: REMOVE_GENRE_ERRORS});
        }
    },[genreErrors])

    useEffect(() => {
      dispatch(fetchgenries(page));

   },[page]);
    return (
        <div class="content-wrapper">
            <Toaster position="top-right" reverseOrder={false}/>
            <Helmet>
                <title>Genre - Ecommerce</title>
                <meta name="description" content="User Login Here" />
            </Helmet>
            <section class="content">
            <div class="container-fluid">
                <div class="row">
                <div class="col-12">
                    <div class="card">
                    <div class="card-header">
                        <h4 className="float-left">All Genre</h4>
                        <h3><button type="button" class="btn btn-primary float-right text-bold" data-toggle="modal" data-target="#exampleModal">Add Genre</button></h3>
                        <AddModal/>
                    </div>
                    <div class="card-body">
                        <table id="example2" class="table table-bordered table-hover">
                        <thead>
                        <tr>
                            <th>ID.</th>
                            <th>Genre Name</th>
                            <th>Action</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                        !loading?
                            genries.length > 0 ?
                            genries.map((genre)=>(
                            <tr key={genre._id}>
                            <td>{ genre._id }</td>
                            <td>{ genre.name }</td>
                            <td>
                                <button id={genre._id} onClick={ ()=>editGenre(genre._id) } type="button" data-toggle="modal" data-target="#editModal" className="text-success"><i className="fas fa-edit"></i></button>
                                &nbsp;&nbsp;
                                <button onClick={() => deleteGenre(genre._id)} className="text-danger"><i className="fas fa-trash"></i></button>
                            </td>
                            </tr>
                            ))
                            :'No Genres'
                        :(<Loader/>)
                        }
                        <EditModal/>
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

export default Genre;