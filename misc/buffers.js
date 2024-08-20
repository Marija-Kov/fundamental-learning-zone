const { Buffer } = require('node:buffer')

// Buffer refers to a location in memory that temporarily holds a sequence of bytes. 
// Similar to array, except for the fact that they deal with binary data only and are not resizable.

// Buffer to string --> decoding 
// String to buffer --> encoding
// When buffer/string converting, default character encoding is utf-8

const buff = Buffer.alloc(3)
buff.write("12345") 

// Because the fixed length is 3 bytes and in utf-8 encoding system
// every character is 1 byte (8 bits), any number of characters past 3 is ignored

const buff2 = Buffer.from([5,6,7])

const buff3 = Buffer.from("abc", "utf8");

//console.log(buff)
//console.log(buff.toJSON());
//console.log(buff3.toJSON());

// But what are buffers used for? 
// Encoding and decoding URLs

const myBuff = Buffer.from("E4BDA0", "hex");
console.log(myBuff.toString("utf-8"))
