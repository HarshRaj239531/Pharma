import axios from "@/src/lib/axios";

export const loginUser = (data: any) => {
    return axios.post("/login", data);
};