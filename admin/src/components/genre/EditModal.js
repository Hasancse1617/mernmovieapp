import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateAction, fetchGenre } from "../../store/actions/GenreAction";
import { REMOVE_GENRE_STATUS } from "../../store/types/GenreType";

const EditModal = (props) => {
    
    let { genre, genreStatus, genreErrors } = useSelector((state)=>state.GenreReducer);
    const [state, setState] = useState({
        id:'',
        name:'',
    });

    const dispatch = useDispatch();
    const updateGenre = (e) =>{
        e.preventDefault();
        dispatch(updateAction(state,state.id));
    }
    // alert(genreStatus);
    useEffect(() => { 
        // alert(genreStatus);
        if(genreStatus){
            setState({
                id:genre._id,
                name:genre.name,
            });
            dispatch({type: REMOVE_GENRE_STATUS});
        }
     },[genre,genreStatus]);
    return(
        <div class="modal fade" id="editModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Add Genre</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <form onSubmit={updateGenre}>
                    <div class="modal-body">
                        <div class="form-group">
                            <label for="recipient-name" class="col-form-label">Genre Name:</label>
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