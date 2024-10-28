import cryptojs from "crypto-js";

export const encryptCrypto = async (data) => {
  var ciphertext = cryptojs.AES.encrypt(
    data,
    "sd56f238a1b496f35e729c0eef1c9f8b7657a4c8e5f3b0a2c9b8d3e6f7a2c5b9"
  ).toString();
  return ciphertext;
};

export const decryptCrypto = async (data) => {
  var bytes = cryptojs.AES.decrypt(
    data,
    "sd56f238a1b496f35e729c0eef1c9f8b7657a4c8e5f3b0a2c9b8d3e6f7a2c5b9"
  );
  var originalText = bytes.toString(cryptojs.enc.Utf8);

  return originalText;
};
