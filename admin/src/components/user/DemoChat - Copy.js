import { useParams, withRouter } from "react-router-dom";
import { Helmet } from "react-helmet";
import Swal from 'sweetalert2'
import toast, {Toaster} from "react-hot-toast";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';



const DemoChat = ({socket}) => {
    const dispatch = useDispatch();
    const { user: {_id} } = useSelector((state)=>state.AuthReducer);
    const {id} = useParams();
//    console.log(id,socket);
    const [message,setMessage] = useState('');
    const [chats, setChats] = useState([]);
    const handleInput = (e) =>{
        setMessage(e.target.value);
    }
    useEffect(()=>{
        if(socket){
            socket.emit("createroom", {id})
            socket.on('newmessage',(payload)=>{
                console.log(payload)
                if(payload.sender_id===id){
                    const newmessage = [...chats, payload];
                    setChats(newmessage)
                }
            }) 
        }
        return () =>{
            if(socket){
               socket.emit("leaveroom", {id});
            }
        }
    });
    const SendMessage = (e) =>{
        e.preventDefault();
        socket.emit('message',{ receiver_id: id, sender_id: _id, message});
        const newmessage = [...chats, { receiver_id: id, sender_id: _id, message}];
        setChats(newmessage)
        setMessage('');
    }
    return (
        <div class="content-wrapper">
        <Helmet>
            <title>Send message - Ecommerce</title>
            <meta name="description" content="Password Update Here" />
        </Helmet>
        <Toaster position="top-right" reverseOrder={false}/>
        <section class="content">
        <div class="container-fluid">
            <div class="row">
            <div class="col-12">
                <div class="card">
                <div class="card-header">
                    <h4 className="float-left">Send Message</h4>
                </div>
                {/* {chats} */}
                <ul>
                    {
                        chats.map((payload,index)=>(
                            <li key={index}>{payload.message}</li>
                        ))
                    }
                </ul>
                <form role="form" onSubmit={SendMessage}>
                    <div class="card-body">
                    <div class="form-group row">
                        <label for="exampleInputName" className="col-sm-2  col-form-label">Send Message</label>
                        <div className="col-sm-8">
                           <input type="text" name="text" value={message} onChange={handleInput} class="form-control" id="exampleInputName" placeholder="Enter Message"/>
                        </div> 
                    </div>
                    <div class="form-group col-6 offset-sm-2">
                        <button type="submit" class="btn btn-primary">Update</button>
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

export default withRouter(DemoChat);