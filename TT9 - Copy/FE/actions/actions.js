import axios from 'axios';

export const signUp = async () => {
    try {
        const response = await axios.post("http://localhost:8463/sigunp",{ username, pw, email });
        return response.data;
    } catch (error) {
        console.error(error);
    }
}
