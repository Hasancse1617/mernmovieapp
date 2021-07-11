import { useParams, withRouter } from "react-router-dom";
import { Helmet } from "react-helmet";
import Swal from 'sweetalert2'
import toast, {Toaster} from "react-hot-toast";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import Peer from 'simple-peer';



const DemoChat = ({socket}) => {
    const dispatch = useDispatch();
    const { user: {_id, name} } = useSelector((state)=>state.AuthReducer);
    const {id} = useParams();
//    console.log(id,socket);
    const [message,setMessage] = useState('');
    const [chats, setChats] = useState([]);
    const [users, setUsers] = useState([]);
    const handleInput = (e) =>{
        setMessage(e.target.value);
    }
    useEffect(()=>{
        if(socket){
            socket.on('newmessage',(payload)=>{
                // console.log(payload)
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
    useEffect(()=>{
        if(socket){
           socket.emit("addUser", _id);
           socket.on("getUsers", payload =>{
               console.log(payload);
           })
        }
    },[socket]);
    const SendMessage = (e) =>{
        e.preventDefault();
        socket.emit('message',{ receiver_id: id, sender_id: _id, message});
        const newmessage = [...chats, { receiver_id: id, sender_id: _id, message}];
        setChats(newmessage)
        setMessage('');
    }
    // Message Sending code Up
    // Video calling code start
    const [ stream, setStream ] = useState()
	const [ receivingCall, setReceivingCall ] = useState(false)
	const [ caller, setCaller ] = useState("")
	const [ callerSignal, setCallerSignal ] = useState()
	const [ callAccepted, setCallAccepted ] = useState(false)
	const [ idToCall, setIdToCall ] = useState("")
	const [ callEnded, setCallEnded] = useState(false)
	const [ names, setNames ] = useState("")
    const myVideo = useRef('')
	const userVideo = useRef('')
	const connectionRef= useRef('')
    const [videotrue, setVideotrue] = useState(false);

    // useEffect(()=>{

    //         navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then((stream) => {
    //             setStream(stream)
    //             console.log("video stream",stream)
    //             myVideo.current.srcObject = stream
    //         });

    // },[]);
    useEffect(() => {
        if(socket){
            socket.on("callUser", (data) => {
                // console.log('Hasan', data);
                setReceivingCall(true)
                setCaller(data.from)
                setNames(data.name)
                setCallerSignal(data.signal)
            })
        }	
	},[socket])

    const callUser = () =>{
        navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then((stream) => {
			setStream(stream)
            setVideotrue(true)
			myVideo.current.srcObject = stream
            
		});
        if(stream){
            const peer = new Peer({
                initiator: true,
                trickle: false,
                stream: stream
            });
            peer.on("signal", data =>{
                socket.emit("callUser", {
                    userToCall: id,
                    signalData: data,
                    from: _id,
                    name: name
                })
            })
            
            peer.on("stream", (stream) => {
                console.log('UservStream',stream)
                userVideo.current.srcObject = stream		
            })
            
            socket.on("callAccepted", (signal) => {
                console.log('UserAccept',signal)
                setCallAccepted(true)
                peer.signal(signal)
            })
            connectionRef.current = peer
        }
    }
    const answerCall =() =>  {
      
		setCallAccepted(true)
		const peer = new Peer({
			initiator: false,
			trickle: false,
			stream: stream
		})
        
		peer.on("signal", (data) => {
            console.log('Signal',caller)
			socket.emit("answerCall", { signal: data, to: caller })
		})
        // navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then((stream) => {
		// 	setStream(stream)
        //     setVideotrue(true)
		// 	myVideo.current.srcObject = stream
            
		// });
        peer.on("stream", (stream) => {
            console.log('User2ndStream',stream)
            userVideo.current.srcObject = stream
        })
		

		peer.signal(callerSignal)
		connectionRef.current = peer
	}
    const leaveCall = () => {
		setCallEnded(true)
		connectionRef.current.destroy()
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
                    <h4 className="float-left">Send Message</h4> {callAccepted && !callEnded ? ( <span onClick={leaveCall} className="text-success ml-5" style={{fontSize:20,cursor:"pointer"}}>End Call</span> ) :( <span onClick={callUser} className="text-success ml-5" style={{fontSize:20,cursor:"pointer"}}><i className="fas fa-video"></i></span>) }
                </div>
                <div>
                {userVideo.current.srcObject}
                    {receivingCall && !callAccepted ? (
                            <div className="caller">
                            <h1 >{name} is calling...</h1>
                            <button onClick={answerCall}>
                                Answer
                            </button>
                        </div>
                    ) : null}
                </div>
                {/* {chats} */}
                <ul>
                    {
                        chats.map((payload,index)=>(
                            <li key={index}>{payload.message}</li>
                        ))
                    }
                </ul>
                <div className="video-container">
                    <div className="video">
                        {stream &&  <video playsInline muted ref={myVideo} autoPlay style={{ width: "300px" }} />}
                    </div>
                    <div className="video">
                       
                        {callAccepted ?
                        <video playsInline ref={userVideo} autoPlay style={{ width: "300px"}} />:
                        null}
                    </div>
                </div>
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