import { AES, enc } from "crypto-js";

const encrypteSecretKey: string = `1KbO\/2kfmR6GySn;_ZG`;
const decrypteSecretKey: string = `1KbO\/2kfmR6GySn;_ZG`;

export interface Data {
  success: boolean;
  message: string;
  data?: object;
}

export const encrypt = (data: Data) => {
  const encryptedData: string = AES.encrypt(
    JSON.stringify(data),
    encrypteSecretKey
  ).toString();
  return encryptedData;
};

export const decrypt = (encryptedData: string) => {
  const decryptedData = JSON.parse(
    JSON.parse(AES.decrypt(encryptedData, decrypteSecretKey).toString(enc.Utf8))
  );
  return decryptedData;
};

export default { encrypt, decrypt };
