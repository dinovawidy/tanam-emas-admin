import CryptoJS from "crypto-js";

const secretKey = process.env.REACT_APP_SECRET_KEY; // Could use a date or something dynamic

const encSignature = (word) => {
  let encrypted = CryptoJS.SHA256(secretKey + word).toString();
  return encrypted;
};

const enc = (word) => {
  let encrypted = CryptoJS.AES.encrypt(
    JSON.stringify(word),
    secretKey
  ).toString();
  return encrypted;
};

const dec = (word) => {
  let decrypted = CryptoJS.AES.decrypt(word, secretKey).toString(
    CryptoJS.enc.Utf8
  );
  return JSON.parse(decrypted);
};

const EncryptDecrypt = {
  encSignature,
  enc,
  dec,
};

export default EncryptDecrypt;
