import { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addRequests, removeRequest } from "../utils/requestSlice";

const Requests = () => {
  const requests = useSelector((store) => store.requests);
  const dispatch = useDispatch();

  const reviewequest = async (status, requestId) => {
    try {
      await axios.post(
        BASE_URL + `/request/review/${status}/${requestId}`,
        null,
        {
          withCredentials: true,
        }
      );
      dispatch(removeRequest(requestId));
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get(BASE_URL + "/user/requests/recieved", {
          withCredentials: true,
        });
        dispatch(addRequests(res.data.data));
      } catch (e) {
        console.log(e);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!requests) return;

  if (requests.length === 0)
    return <h1 className="flex justify-center my-10">No Requests Found</h1>;
  return (
    <div className="text-center my-10">
      <h1 className="text-4xl text-bold">Connections</h1>

      {requests.map((request) => {
        const { firstName, lastName, photoUrl, age, gender, about } =
          request.fromUserId;
        return (
          <div
            key={request._id}
            className="flex m-4 p-4 bg-gray-200 rounded-lg w-1/2 mx-auto  items-center"
          >
            <div>
              <img
                alt="photo"
                src={photoUrl}
                className="w-20 h-20 rounded-full"
              ></img>
            </div>
            <div className="text-left mx-4">
              <h2 className="font-bold text-xl">
                {firstName + " " + lastName}
              </h2>
              <p>
                {age}, {gender}
              </p>
              <p>{about}</p>
            </div>
            <div className="ml-auto">
              <button
                className="btn btn-primary mx-2"
                onClick={() => reviewequest("rejected", request._id)}
              >
                Reject
              </button>
              <button
                className="btn btn-secondary mx-2"
                onClick={() => reviewequest("accepted", request._id)}
              >
                Accept
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Requests;
