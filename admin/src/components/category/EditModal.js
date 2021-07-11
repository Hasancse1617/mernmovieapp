import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateAction, fetchCategory } from "../../store/actions/CategoryAction";
import { REMOVE_CATEGORY_STATUS } from "../../store/types/CategoryType";

const EditModal = (props) => {
    
    let { category, categoryStatus, categoryErrors } = useSelector((state)=>state.CategoryReducer);
    const [state, setState] = useState({
        id:'',
        name:'',
    });

    const dispatch = useDispatch();
    const updateCategory = (e) =>{
        e.preventDefault();
        dispatch(updateAction(state,state.id));
    }
    useEffect(() => { 
        if(categoryStatus){
            setState({
                id:category._id,
                name:category.name,
            });
            dispatch({type: REMOVE_CATEGORY_STATUS});
        }
     },[category,categoryStatus]);
    return(
        <div class="modal fade" id="editModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Add Category</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <form onSubmit={updateCategory}>
                    <div class="modal-body">
                        <div class="form-group">
                            <label for="recipient-name" class="col-form-label">Category Name:</label>
                            <input type="text" onChange={(e)=>setState({...state,name:e.target.value})} class="form-control" name="name" value={state.name} />
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" id="edit-modal" data-dismiss="modal">Close</button>
                        <button type="submit" class="btn btn-primary" >Save</button>
                    </div>
                </form>
                </div>
            </div>
        </div>
    );
}

export default EditModal;