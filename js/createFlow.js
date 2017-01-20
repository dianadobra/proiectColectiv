
  Storage.prototype.setObj = function(key, obj) {
    return this.setItem(key, JSON.stringify(obj))
  }
  Storage.prototype.getObj = function(key) {
      return JSON.parse(this.getItem(key))
  }

  function setSelectedFileIds(form) {
    var files = JSON.parse(localStorage.getItem('userFiles'));
    var indexArray = [];
    var c = document.getElementById(form).getElementsByTagName('input');
    for (var i = 0; i < c.length; i++) {
        if (c[i].checked == true) {
           indexArray.push(i);
        }
    }
    var selectedFileIds = [];
    for (var j = 0; j < files.length; j++) {
      if (j in indexArray) {
        selectedFileIds.push(files[j]["id"]);
      }
    }
    
    localStorage.setObj('selectedFileIds', selectedFileIds);
    window.location.href = "http://localhost:8888/ProiectColectivFront/createFlow.html";
  }

  function updateFunding() {
    var http = new XMLHttpRequest();
 	  let user = jQuery.parseJSON(localStorage.getItem("loginCredentials"));
  	var url = "http://localhost:8080/eppione/api/flow/funding";
  	http.open("GET", url, true);
  	http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  
  	http.send();
    http.onreadystatechange = function() {
    if (http.readyState == 4 && http.status == 200) {
       console.log(http.responseText);
    	 let json = JSON.parse(http.responseText);
          for (var i = 0; i < json.length; i++) {
               $('.form-control').append("<option id=" + json[i].id + ">" + json[i].type+"</option>")
          }
      }
    }
  }

  function startWorkFlow() {
    var url = "http://localhost:8080/eppione/api/flow";
    var name = $('#input_abstract').val();
    var reviewTime = $('#input_keywords').val();
    var creatorId = getUserID();

    var fundingSelect = $('#fundingSelect');
    var selectedFundingId = fundingSelect[0].options.selectedIndex;
    var fundingTypeId = selectedFundingId + 1;
    var documentsIds = localStorage.getObj('selectedFileIds');

    var flowData = {
          "name": name,
          "reviewTime": parseInt(reviewTime),
          "creatorId": parseInt(creatorId),
          "fundingTypeId": fundingTypeId,
          "documentsIds": documentsIds
    };

    $.ajax({
        type: "POST",
        url: url,
        processData: false,
        contentType: 'application/json',
        data: JSON.stringify(flowData),
        success: function() {
            console.log("Send");
        }

    });
  }

$(document).ready(function(){
   updateFunding();
})