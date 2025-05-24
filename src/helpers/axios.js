import axios from "axios";

const http = axios.create({
  baseURL: "https://quiz-api.hafizh.web.id/",
});

export default http;
