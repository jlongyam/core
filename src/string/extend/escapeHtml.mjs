import string_ from "../core.mjs";

function escapeHTML(str) {
  return str.replace(/[&<>"']/g, function(m) {
    return {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;'
    }[m];
  });
}

function unescapeHTML(str) {
  return str.replace(/&amp;|&lt;|&gt;|&quot;|&#39;/g, function(m) {
    return {
      '&amp;': '&',
      '&lt;': '<',
      '&gt;': '>',
      '&quot;': '"',
      '&#39;': "'"
    }[m];
  });
}


string_.escapeHtml = function(str, reverse = false) {
  if(reverse) return unescapeHTML(str);
  else return escapeHTML(str)
};

export default string_;