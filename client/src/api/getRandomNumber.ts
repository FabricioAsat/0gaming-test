import axios from "axios";

interface randomNumberBody {
  limit: number;
}

export const getRandomNumber = async (body: randomNumberBody) => {
  try {
    const { data } = await axios.post(import.meta.env.VITE_URL_SERVER + "random", body);
    return { status: true, message: "", data };
  } catch (error) {
    return { status: false, message: error, data: null };
  }
};
