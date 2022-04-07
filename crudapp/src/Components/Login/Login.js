import { useDispatch ,useSelector} from "react-redux";
import UserService from "../../Services/UserService";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {email,password,isLogged}=useSelector((state)=>state);
    // console.log(isLogged);
    useEffect(()=> {
        const localData = localStorage.getItem("token"); //if we are already logged in and if any refershes happen then it take us to list page not login page
        if(localData) {
            navigate("/list");
        }
    },[]);
    const emailChangeHandler = (event) => {
        dispatch({type: "email",value: event.target.value});
    };

    const passwordChangeHandler = (e) => {
        dispatch({type: "password", value: e.target.value});
    };
    
    const loginHandler = (event) => {
        event.preventDefault();

        UserService.loginUser({"email":email,"password":password}).then((res)=>{
            console.log(res);
            if(res.data != ""){
                localStorage.setItem("token",res.data.token); //see in application
                dispatch({type:"logged",value: true});
                navigate("/list");
            }
            else{
                dispatch({type:"logged",value: false});
            }
        });
    }
    
    
    
    
    
    return (
        <div className="container mt-3">
            {isLogged === false ? (
                <div className="alert alert-danger">
                    <strong>Error:</strong> Login Credentials Failed 
                </div>
            ):( "")

            }

            <form onSubmit={loginHandler}>
                <div className="mb-3 mt-3">
                    <label htmlFor="email">Email</label>
                    <input type="email" name="email" id="email" className="form-control" 
                    placeholder="Enter email" 
                    onChange={emailChangeHandler}
                    />
                </div>
                <div className="mb-3 mt-3">
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" id="password" placeholder="Enter Password" 
                    className="form-control"
                    onChange={passwordChangeHandler}
                    ></input>
                </div>
                <button type="submit" className="btn btn-primary">
                    Login
                </button>
            </form>
        </div>
    )
}

export default Login;