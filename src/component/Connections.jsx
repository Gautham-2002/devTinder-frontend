import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/connectionSlice";

const Connections = () => {
  const connections = useSelector((store) => store.connection);
  const dispatch = useDispatch();
  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get(BASE_URL + "/user/connections", {
          withCredentials: true,
        });
        dispatch(addConnections(res.data.data));
      } catch (e) {
        console.log(e);
      }
    })();
  });

  if (!connections) return;

  if (connections.length === 0) return <h1>No Connections Found</h1>;
  return (
    <div className="text-center my-10">
      <h1 className="text-4xl text-bold">Connections</h1>

      {connections.map((connection) => {
        const { firstName, lastName, photoUrl, age, gender, about } =
          connection;
        return (
          <div
            key={connection._id}
            className="flex m-4 p-4 bg-gray-200 rounded-lg w-1/2 mx-auto"
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
          </div>
        );
      })}
    </div>
  );
};

export default Connections;
