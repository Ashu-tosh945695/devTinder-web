import { useState } from "react";
import UserCard from "./UserCard";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import axios from "axios";
const EditProfile = ({user})=>{
    const [firstName, setFirstName] = useState(user.firstName);
    const [lastName, setLastName] = useState(user.lastName);
    const [photoUrl, setPhotoUrl] = useState(user.photoUrl);
    const [age, setAge] = useState(user.age);
    const [gender, setGender] = useState(user.gender);
    const [about, setAbout] = useState(user.about);
    const [error,setError] = useState("")
    const dispatch  = useDispatch("")



    const saveProfile = async ()=>{
        try{
            const res = await axios.patch(BASE_URL+"/profile/edit",{
                firstName,lastName,photoUrl,age,gender,about
            },{withCredentials:true}
        )
        dispatch(addUser(res?.data?.data))

        }catch(err){
             setError(err.data)
        }
    }
    return (
      <div className="flex justify-center gap-7">
        <div className="h-48 scroll-py-5 ">
          <div className="flex justify-center my-0">
            <div className="card bg-base-300 w-96 shadow-sm">
              <div className="card-body">
                <h2 className="card-title justify-center">Edit Profile</h2>
                <div>
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

                  <label className="form-control w-full max-w-xs">
                    <div className="label">
                      <span className="label-text my-2">PhotoUrl</span>
                    </div>
                    <input
                      type="text"
                      value={photoUrl}
                      className="input input-bordered w-full max-w-xs"
                      onChange={(e) => setPhotoUrl(e.target.value)}
                    />
                  </label>

                  <label className="form-control w-full max-w-xs">
                    <div className="label">
                      <span className="label-text my-2">Age</span>
                    </div>
                    <input
                      type="text"
                      value={age}
                      className="input input-bordered w-full max-w-xs"
                      onChange={(e) => setAge(e.target.value)}
                    />
                  </label>

                  <label className="form-control w-full max-w-xs">
                    <div className="label">
                      <span className="label-text my-2">Gender</span>
                    </div>
                    <input
                      type="text"
                      value={gender}
                      className="input input-bordered w-full max-w-xs"
                      onChange={(e) => setGender(e.target.value)}
                    />
                  </label>

                  <label className="form-control w-full max-w-xs">
                    <div className="label">
                      <span className="label-text my-2">About</span>
                    </div>
                    <input
                      type="text"
                      value={about}
                      className="input input-bordered w-full max-w-xs"
                      onChange={(e) => setAbout(e.target.value)}
                    />
                  </label>
                </div>
                <p className="text-red-500"></p>
                <div className="card-actions justify-center">
                  <button className="btn btn-primary my-2" onClick={saveProfile}>Update Profile</button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <UserCard user={{firstName,lastName,photoUrl,age,gender,about}}/>
      </div>
    );
}

export default EditProfile