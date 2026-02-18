import string_ from "../../string/core.mjs";

function bytes_to(num, decimals = 2) {
  if (num === 0) return '0 Bytes'
  const k = 1024
  const dm = decimals < 0 ? 0 : decimals
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
  const i = Math.floor(Math.log(num) / Math.log(k))
  return parseFloat((num / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i]
}
function to_bytes(num, size) {
  const k = 1024
  let n = 0
  if (size === 'KB') n = num * k
  if (size === 'MB') n = num * (k * k)
  if (size === 'GB') n = num * (k * k * k)
  if (size === 'TB') n = num * (k * k * k * k)
  if (size === 'PB') n = num * (k * k * k * k * k)
  if (size === 'EB') n = num * (k * k * k * k * k * k)
  if (size === 'ZB') n = num * (k * k * k * k * k * k * k)
  if (size === 'YB') n = num * (k * k * k * k * k * k * k * k)
  return parseInt(n)
}

string_.bytes = function(num, reverse = false, unit = 'KB') {
  if(reverse) return to_bytes(num, unit);
  else return bytes_to(num)
}
export default string_;