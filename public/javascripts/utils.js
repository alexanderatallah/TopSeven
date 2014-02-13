function getParam(param) {
  var url = window.location.search.substring(1);
  var vars = url.split('&');
  for (var i = 0; i < vars.length; i++) {
    var paramPair = vars[i].split('=');
    if (paramPair[0] == param) {
      return paramPair[1];
    }
  }
  return null;
}
