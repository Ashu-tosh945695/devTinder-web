import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
const Login = ()=>{

    const [emailId, setEmailId] = useState("");
    const [password, setPassword] = useState("");
    const [error,setError] = useState("")
    const [firstName,setFirstName] = useState("")
    const [lastName, setLastName] = useState("");
    const [isLoginForm,setLoginForm] = useState(false)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const handleLogin = async () =>{
        try{
          const res = await axios.post(BASE_URL+"/login", {
            emailId, password
          },{withCredentials:true});
          
          dispatch(addUser(res.data))
          return navigate("/")
        }catch(err){
            setError(err?.response?.data|| "something went Wrong")
            console.error(err)
        }
    }

    const handleSignUp = async()=>{
      try{
       const res = await axios.post(BASE_URL+ "/signup", {firstName,lastName,emailId,password} , {withCredentials: true})
       console.log(res.data)
                 dispatch(addUser(res.data.data))
                 return navigate("/profile")
                }catch(err){
                   setError(err?.response?.data|| "something went Wrong")

      }
    }


    return (
      <div className="flex justify-center my-20">
        <div className="card bg-base-300 w-96 shadow-sm">
          <div className="card-body">
            <h2 className="card-title justify-center">
              {isLoginForm ? "Login" : "SignUp"}
            </h2>
            <div>
              {!isLoginForm && (
                <>
                  <label className="form-control w-full max-w-xs">
                    <div className="label">
                      <span className="label-text my-2">First Name</span>
                    </div>
                    <input
                      type="text"
                      value={firstName}
                      className="input input-bordered w-full max-w-xs"
                      onChange={(e) => setFirstName(e.target.value)}
                    />
                  </label>

                  <label className="form-control w-full max-w-xs">
                    <div className="label">
                      <span className="label-text my-2">Last Name</span>
                    </div>
                    <input
                      type="text"
                      value={lastName}
                      className="input input-bordered w-full max-w-xs"
                      onChange={(e) => setLastName(e.target.value)}
                    />
                  </label>
                </>
              )}

              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text my-2">Email ID</span>
                </div>
                <input
                  type="text"
                  value={emailId}
                  className="input input-bordered w-full max-w-xs"
                  onChange={(e) => setEmailId(e.target.value)}
                />
              </label>

              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text my-2">Password</span>
                </div>
                <input
                  type="text"
                  value={password}
                  className="input input-bordered w-full max-w-xs"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </label>
            </div>
            <p className="text-red-500">{error}</p>
            <div className="card-actions justify-center">
              <button className="btn btn-primary my-2" onClick={isLoginForm ? handleLogin: handleSignUp}>
                {isLoginForm ? "Login" : "SignUp"}
              </button>
            </div>

            <p className="m-auto cursor-pointer" onClick={() => setLoginForm((value) => !value)}>
              {isLoginForm ? "New User? Sign Up" : "Please Login"}
            </p>
          </div>
        </div>
      </div>
    );
}

export default Login;