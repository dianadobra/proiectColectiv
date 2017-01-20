function getParameterByName(name, url) {
      if (!url) {
        url = window.location.href;
      }
      name = name.replace(/[\[\]]/g, "\\$&");
      var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
          results = regex.exec(url);
      if (!results) return null;
      if (!results[2]) return '';
      return decodeURIComponent(results[2].replace(/\+/g, " "));
  }

function populateInputs() {
  var keywords = getParameterByName('keywords');
  var abstract = getParameterByName('abstract');

  $('#input_keywords').val(keywords);
  $('#input_abstract').val(abstract);
}


function editDocument() {
  var docId = getParameterByName('id');
  var file = document.getElementById("uploadfile");
  var loginCredentials = localStorage.getItem("loginCredentials");
  
  var obj = JSON.parse(loginCredentials);
  var i = 7;
  var authorId = obj[6];
  while(obj[i] != ',') {
    authorId = authorId + obj[i];
    i++;
  }

  /* Create a FormData instance */
  var formData = new FormData();
  /* Add the file */ 
  formData.append("file", file.files[0]);
  formData.append("abstractInput", $("#input_abstract").val());
  formData.append("keywords", $("#input_keywords").val());
  formData.append("authorId", parseInt(authorId));

  client.open("POST", "http://localhost:8080/eppione/api/documents/" + docId, true);
  client.send(formData);  /* Send to server */ 
}