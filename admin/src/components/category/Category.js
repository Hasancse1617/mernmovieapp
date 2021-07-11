import { useEffect } from "react";
import { Helmet } from "react-helmet";
import toast, {Toaster} from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { REMOVE_CATEGORY_MESSAGE, REMOVE_CATEGORY_LOADER, REMOVE_CATEGORY_ERRORS } from "../../store/types/CategoryType";
import { fetchcategories, fetchCategory, deleteAction } from '../../store/actions/CategoryAction';
import Loader from "../loader/Loader";
import Pagination from "../pagination/Pagination";
import AddModal from './AddModal';
import EditModal from "./EditModal";
import Swal from 'sweetalert2'

const Category = (props) => {
    const { message, loading} = useSelector((state) => state.CategoryReducer);
    const { categories, count, perPage, pageLink, categoryErrors } = useSelector((state)=>state.CategoryReducer);
    
    const dispatch = useDispatch();
    const query = new URLSearchParams(props.location.search);
    const page = query.get('page')
    // alert(page);

    const deleteCategory =  (id) =>{
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

    const editCategory = (id) =>{
        dispatch(fetchCategory(id));
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
          dispatch({type: REMOVE_CATEGORY_LOADER});
          dispatch({type: REMOVE_CATEGORY_MESSAGE});
          dispatch(fetchcategories(page));
       }  

    },[message]);

    useEffect(()=>{
        // alert(createErrors.length);
        if(categoryErrors.length > 0){
            categoryErrors.map((error)=>{
                toast.error(error.msg);
            });
            dispatch({type: REMOVE_CATEGORY_ERRORS});
        }
    },[categoryErrors])

    useEffect(() => {
      dispatch(fetchcategories(page));
   },[page]);
    return (
        <div class="content-wrapper">
            <Helmet>
                <title>Category - Ecommerce</title>
                <meta name="description" content="User Login Here" />
            </Helmet>
            <Toaster position="top-right" reverseOrder={false}/>
            <section class="content">
            <div class="container-fluid">
                <div class="row">
                <div class="col-12">
                    <div class="card">
                    <div class="card-header">
                        <h4 className="float-left">All Category</h4>
                        <h3><button type="button" class="btn btn-primary float-right text-bold" data-toggle="modal" data-target="#exampleModal">Add Category</button></h3>
                        <AddModal/>
                    </div>
                    <div class="card-body">
                        <table id="example2" class="table table-bordered table-hover">
                        <thead>
                        <tr>
                            <th>ID.</th>
                            <th>Category Name</th>
                            <th>Action</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                        !loading?
                            categories.length > 0 ?
                            categories.map((category)=>(
                            <tr key={category._id}>
                            <td>{ category._id }</td>
                            <td>{ category.name }</td>
                            <td>
                                <button id={category._id} onClick={ ()=>editCategory(category._id) } type="button" data-toggle="modal" data-target="#editModal" className="text-success"><i className="fas fa-edit"></i></button>
                                &nbsp;&nbsp;
                                <button onClick={() => deleteCategory(category._id)} className="text-danger"><i className="fas fa-trash"></i></button>
                            </td>
                            </tr>
                            ))
                            :'No Categories'
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

export default Category;