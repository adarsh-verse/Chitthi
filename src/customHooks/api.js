import axios from "axios";
import { serverUrl } from "../main";

export async function getAllUsers() {
    try {
        let result = await axios.get(`${serverUrl}/api/user/getUsers`
            , { withCredentials: true });
        return result.data;
    }
    catch (e) {
        console.error(e.message);
    }
}