import axios from 'axios';

export default axios.create({
  baseURL: 'https://the-store-back-end.herokuapp.com/api',
});
