import axios from "axios";
import React from "react";

const api = axios.create({
  baseURL: "https://fakestoreapi.com/",
});
const Getservices = () => {
  return api.get("products ")
};

export default Getservices;
