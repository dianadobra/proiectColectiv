function getUserID() {
  var loginCredentials = localStorage.getItem("loginCredentials");
  var obj = JSON.parse(loginCredentials);
  var i = 7;
  var authorId = obj[6];
  while(obj[i] != ',') {
    authorId = authorId + obj[i];
    i++;
  }
  return authorId;
}