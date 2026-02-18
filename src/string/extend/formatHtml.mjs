import string_ from "../core.mjs";

function formatHTML(str_html, tab = '  ') {
  var result = '';
  var indent = '';

  str_html.split(/>\s*</).forEach(function (element) {
    if (element.match(/^\/\w/)) {
      indent = indent.substring(tab.length);
    }
    result += indent + '<' + element + '>\r\n';
    if (element.match(/^<?\w[^>]*[^\/]$/) && !element.startsWith("input")) {
      indent += tab;
    }
  });
  return result.substring(1, result.length - 3);
}

string_.formatHTML = formatHTML;

export default string_;