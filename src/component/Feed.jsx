import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/feedSlice";
import { useEffect } from "react";
import UserCard from "./UserCard";

const Feed = () => {
  const dispatch = useDispatch();
  const feed = useSelector((store) => store.feed);

  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get(BASE_URL + "/user/feed", {
          withCredentials: true,
        });
        dispatch(addFeed(res.data.data));
      } catch (error) {
        console.log(error);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  console.log(feed);

  return (
    <div className="flex justify-center my-10 flex-wrap ">
      {feed && <UserCard key={feed[0]._id} user={feed[0]} />}
    </div>
  );
};

export default Feed;
