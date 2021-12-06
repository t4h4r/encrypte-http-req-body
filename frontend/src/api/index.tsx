import axios from "axios";
import { decrypt, encrypt, Data } from "../utils/encryption";

const url: string = `http://localhost:5050`;

export default axios.create({
  baseURL: url,
  transformRequest: [
    (data, headers) => {
      // Do whatever you want to transform the data
      data = JSON.stringify(data);
      data = encrypt(data);
      data = JSON.stringify({
        encryptedData: data,
      });

      return data;
    },
  ],
  headers: {
    "Content-Type": "application/json",
  },
  transformResponse: [
    (res) => {
      const data: Data = decrypt(res);
      return data;
    },
  ],
});
