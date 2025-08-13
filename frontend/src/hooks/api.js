import axios from 'axios';

export const fetchData = async (url, config = {}) => {
  try {
    const response = await axios.get(url, config);
    return response.data; // returns only the data part
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error; // rethrow so calling function can handle it
  }
};
