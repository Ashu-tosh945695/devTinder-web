const UserCard = ({user})=>{
    const {firstName, lastName, photoUrl,age,gender,about} = user
    console.log(user)
    return (
      <div className="card bg-base-300 w-96 shadow-sm ">
        <figure>
          {/* <img src={user.photoUrl} alt="user photo" /> */}
          <img className=" p-6 w-70 h-70 "
            src="https://img.magnific.com/free-vector/blue-circle-with-white-user_78370-4707.jpg?semt=ais_hybrid&w=740&q=80"
            alt="user photo"
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title justify-center text-3xl">{firstName + " " + lastName}</h2>
          {age && gender && <p className="flex justify-center text-2xl">{age + ", " + gender}</p>}
          <p className="flex justify-center">{about}</p>
          <div className="card-actions justify-center my-4">
            <button className="btn btn-primary">Ignore</button>
            <button className="btn btn-secondary">Interested</button>
          </div>
        </div>
      </div>
    );
}
export default UserCard