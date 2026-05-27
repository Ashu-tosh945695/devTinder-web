import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../utils/constants";
import { addRequests } from "../utils/requestSlice";
import { useEffect } from "react";

const Requests = () => {
  const dispatch = useDispatch();
  const requests = useSelector((store) => store.requests);

  const fetchRequests = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/requests/received", {
        withCredentials: true,
      });

      dispatch(addRequests(res.data.data));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  if (!requests) return null;

  if (requests.length === 0) {
    return <h1 className="text-center my-10">No Requests Found</h1>;
  }

  return (
    <div className="text-center my-10">
      <h1 className="font-bold text-4xl my-10">Requests</h1>

      {requests.map((request) => {
        const { firstName, lastName, photoUrl, age, gender, about } = request.fromUserId;

        return (
          <div
            key={request._id}
            className="flex justify-between items-center p-4 rounded-lg bg-base-300 w-1/2 mx-auto mb-4"
          >
            <div>
              <img
                alt="photo"
                className="w-20 h-20 rounded-full"
                src={photoUrl}
              />
            </div>

            <div className="text-left mx-4">
              <h2 className="font-bold text-xl">
                {firstName} {lastName}
              </h2>

              {age && gender && (
                <p>
                  {age}, {gender}
                </p>
              )}

              <p>{about}</p>
            </div>
            <div>
              <button className="btn btn-primary mx-2">Reject</button>
              <button className="btn btn-secondary mx-2">Accept</button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Requests;

// import axios from "axios"
// import { useDispatch } from "react-redux"
// import { BASE_URL } from "../utils/constants"
// import { addRequests } from "../utils/requestSlice"
// import { useEffect } from "react"

// const Requests = ()=>{

//     const fetchRequests = async() =>{
//         const dispatch = useDispatch()
//         try{
//             const res = await axios.get(BASE_URL+ "/user/requests/received",{withCredentials:true},)
//          dispatch(addRequests(res.data.data))
//         }catch(err){

//         }
//     }

//     useEffect(()=>{
//        fetchRequests()
//     },[])
//     return (
//       <div>
//         if(!requests) return;
//          if(connections.length === 0 ) return{" "}
//         <h1>No Connections found</h1>
//         return (
//         <div className=" text-center my-10">
//           <h1 className="text-bold text-4xl my-10">Connections</h1>

//           {requests.map((request) => {
//             const { firstName, lastName, photoUrl, age, gender, about } =
//               request;

//             return (
//               <div
//                 key={request._id}
//                 className="flex p-4 rounded-lg bg-base-300 w-1/2 mx-auto"
//               >
//                 <div>
//                   <img
//                     alt="photo"
//                     className="w-20 h-20 rounded-full"
//                     src={photoUrl}
//                   />
//                 </div>

//                 <div className="text-left mx-4">
//                   <h2 className="font-bold text-xl">
//                     {firstName + " " + lastName}
//                   </h2>

//                   {age && gender && <p>{age + ", " + gender}</p>}

//                   <p>{about}</p>
//                 </div>
//               </div>
//             );
//           })}
//         </div>
//         );
//       </div>
//     );
// }
// export default Requests
