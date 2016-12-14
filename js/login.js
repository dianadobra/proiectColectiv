const kROLE_ADMIN = "ROLE_ADMIN"
const kROLE_CONTRIBUTOR = "ROLE_CONTRIBUTOR"
const kROLE_CITITOR = "ROLE_CITITOR"
const kROLE_MANAGER = "ROLE_MANAGER"

function loginButtonClicked() {
  var http = new XMLHttpRequest();
  var url = "http://localhost:8080/eppione/api/login";
  var username = $('#username').val();
  var password = $('#password').val();
  var params = "username=" + username + "&password=" + password;
  http.open("POST", url, true);

  //Send the proper header information along with the request
  http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

  http.onreadystatechange = function() {//Call a function when the state changes.
    if (http.readyState == 4 && http.status == 200) {

      // save the response as a string in sessionStorage
      localStorage.setItem("loginCredentials",JSON.stringify(http.responseText));
      let json = JSON.parse(http.responseText);

      role = json.roles[0].name;

        switch(role) {
          case kROLE_ADMIN:
            window.location.href = "http://localhost:8888/proiectColectivFront/admin.html"
          break;
          case kROLE_CONTRIBUTOR:
            window.location.href = "http://localhost:8888/proiectColectivFront/contributor.html"
          break;
          case kROLE_CITITOR:
            window.location.href = "http://localhost:8888/proiectColectivFront/reader.html"
          break;
          case kROLE_MANAGER:
            window.location.href = "http://localhost:8888/proiectColectivFront/manager.html"
          break;
          default:
            alert("undefined");
          }
    } else{
        $('.invalid-login').show();
    }
}
http.send(params);
}