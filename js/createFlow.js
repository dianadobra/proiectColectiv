  function updateFunding() {
  	  var http = new XMLHttpRequest();
 	 let user = jQuery.parseJSON(localStorage.getItem("loginCredentials"));
  	console.log(user[6]);
  	var url = "http://localhost:8080/eppione/api/flow/funding";
  	//var params = "username=" + username + "&password=" + password;
  	http.open("GET", url, true);
  	//Send the proper header information along with the request
  	http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  
  	http.send();
  //let json = JSON.parsehttp(.responseText);
  //console.log(http.responseText);
    http.onreadystatechange = function() {//Call a function when the state changes.
    if (http.readyState == 4 && http.status == 200) {
       console.log(http.responseText);
    	 let json = JSON.parse(http.responseText);
          for (var i = 0; i < json.length; i++) {
               $('.form-control').append("<option>" + json[i].type+"</option>")
          }
    }
  }
}

$(document).ready(function(){
   updateFunding();
})