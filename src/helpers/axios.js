import axios from "axios";

const http = axios.create({
  baseURL:
    "https://opentdb.com/api.php?amount=10&category=27&difficulty=easy&type=boolean",
});

export default http;
