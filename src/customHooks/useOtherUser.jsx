import axios from "axios";
import { useEffect } from "react";
import { serverUrl } from "../main";
import { useDispatch, useSelector } from "react-redux";
import { setOtherUserData } from "../redux/UserSlice";

const useOtherUser = () => {
  const dispatch = useDispatch();
  const { userData, otherUserData } = useSelector((state) => state.user);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`${serverUrl}/api/user/getUsers`, {
          withCredentials: true,
        });

        // assuming response.data is an array of users
        // console.log(response.data);
        dispatch(setOtherUserData(response.data));
      } catch (err) {
        console.error("Error fetching all users:", err);
      }
    };

    // fetch only once or when userData changes
    if (userData?._id) {
      fetchUsers();
    }
  }, [userData, dispatch]);

  return otherUserData;
};

export default useOtherUser;
