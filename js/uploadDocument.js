var client = new XMLHttpRequest();

function redirectToUploadPage() {
	window.location.href = "http://localhost:8888/proiectColectivFront/uploadDocument.html"
}

function downloadDocument() {
	window.location.href = "http://localhost:8080/eppione/api/documents/template"
}

function uploadDocument() {
	var file = document.getElementById("uploadfile");
	var loginCredentials = localStorage.getItem("loginCredentials");
	console.log(loginCredentials);
	var obj = JSON.parse(loginCredentials);
	var i = 7;
	var authorId = obj[6];
	while(obj[i] != ',') {
		authorId = authorId + obj[i];
		i++;
	}

	console.log($("#input_abstract").val());

	/* Create a FormData instance */
	var formData = new FormData();
	/* Add the file */ 
	formData.append("file", file.files[0]);
	formData.append("abstractInput", $("#input_abstract").val());
	formData.append("keywords", $("#input_keywords").val());
	formData.append("signed", false);
	formData.append("authorId", parseInt(authorId));

	client.open("post", "http://localhost:8080/eppione/api/documents", true);

	client.send(formData);  /* Send to server */ 
}
 
/* Check the response status */  
client.onreadystatechange = function() {
	if (client.readyState == 4 && client.status == 200) 
	{
		alert(client.statusText);
	}
}