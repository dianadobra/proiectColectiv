<?php
$url = 'http://localhost:8080/eppione/api/login';
$data = array('username' => $_POST['username'], 'password' => $_POST['password']);

$options = array(
    'http' => array(
        'header'  => "Content-type: application/x-www-form-urlencoded\r\n",
        'method'  => 'POST',
        'content' => http_build_query($data)
    )
);
$context  = stream_context_create($options);
$result = file_get_contents($url, false, $context);
if ($result === FALSE) { echo "Invalid creditentials"; }
else {
	json_encode($result);
	print_r($result);
}
