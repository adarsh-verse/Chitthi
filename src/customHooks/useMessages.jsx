import axios from "axios";
import { useEffect } from "react";
import { serverUrl } from "../main";
import { useDispatch, useSelector } from "react-redux";
import { setMessages, setLoading, setError } from "../redux/messageSlice";

const useMessages = (receiverId) => {
  const dispatch = useDispatch();
  const { messages, loading, error } = useSelector((state) => state.message);

  useEffect(() => {
    const fetchMessages = async () => {
      if (!receiverId) return;

      dispatch(setLoading(true));
      try {
        const result = await axios.get(
          `${serverUrl}/api/message/${receiverId}`, {
            withCredentials:true
          }
        );
        
        dispatch(setMessages(result.data || []));
      } catch (err) {
        console.error("Error fetching messages:", err);
        dispatch(setError(err.response?.data?.message || err.message));
      } finally {
        dispatch(setLoading(false));
      }
    };

    fetchMessages();
  }, [receiverId, dispatch]);

  return { messages, loading };
};

export default useMessages;
