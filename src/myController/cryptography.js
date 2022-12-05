import crypto from 'crypto';
const algorithm = "aes-192-cbc";
const password = "123456789";
 
const key = crypto.scryptSync(password, "cnt-tutorial", 24);
const iv = Buffer.alloc(16, 0);


export const encription_data = (message) =>{
    const cipher = crypto.createCipheriv(algorithm, key, iv);
    let encryptedData = cipher.update(message, "utf-8", "hex");
    encryptedData += cipher.final("hex");
    return encryptedData; 
}

export const description_data = (message) =>{
    const decrypter = crypto.createDecipheriv(algorithm, key, iv);
    let decryptedMsgs = decrypter.update(message, "hex", "utf-8");
    decryptedMsgs += decrypter.final("utf8");
    return decryptedMsgs;
}

/*
console.log("Encryption message: " + encription_data('THis is secrete message'));
console.log("Decrypted message: " + description_data('4f5d296b9579ab8507d6a862403c4bcbdb9eccd8fd47a7f43c518b92fcf454bc'));
*/