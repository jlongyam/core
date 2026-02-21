import string_ from "../core.mjs";

const urlEncode = (url) => encodeURIComponent(url).replace(/!/g, '%21').replace(/~/g, '%7E').replace(/\*/g, '%2A').replace(/'/g, '%27').replace(/\(/g, '%28').replace(/\)/g, '%29').replace(/%20/g, '+');
const urlDecode = ( decoded ) => decodeURIComponent( decoded )

string_.urlEncode = function(str, reverse = false) {
  if(reverse) return urlDecode(str);
  else return urlEncode(str);
}

export default string_;