import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { removeUserFromFeed } from "../utils/feedSlice";

/* eslint-disable react/prop-types */
const UserCard = ({ user }) => {
  const { firstName, lastName, photoUrl, about, skills, age, gender } = user;
  const dispatch = useDispatch();

  const handleSendRequest = async (status, userId) => {
    try {
      await axios.post(BASE_URL + `/request/send/${status}/${userId}`, null, {
        withCredentials: true,
      });
      dispatch(removeUserFromFeed(userId));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div className="card bg-base-100 w-96 shadow-xl">
        <figure>
          <img src={photoUrl} alt="Shoes" />
        </figure>
        <div className="card-body">
          <h2 className="card-title">
            {firstName} {lastName}
          </h2>
          <div>
            {age}, {gender}
          </div>
          <div className="flex flex-wrap">
            {skills.map((skill) => (
              <p
                className="badge badge-outline m-1 py-3 flex-grow-0"
                key={skill}
              >
                {skill}
              </p>
            ))}
          </div>
          <p>{about}</p>
          <div className="card-actions justify-end">
            <button
              className="btn btn-secondary"
              onClick={() => handleSendRequest("ignored", user._id)}
            >
              Ignore
            </button>
            <button
              className="btn btn-primary"
              onClick={() => handleSendRequest("interested", user._id)}
            >
              Interested
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
