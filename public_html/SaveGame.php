<?php

//API Url
$guid = htmlspecialchars($_GET["guid"]);
$saveName = htmlspecialchars($_GET["saveName"]);
$saveData = file_get_contents('php://input');
$saveData = addslashes($saveData);

//$guid = "85b11e5b-54a3-4f3b-b425-1588d57a116e";
//$saveName = "inna nazwa";


$dataToSend = "{\"currentGameGuid\":\"".$guid."\",\"json\":\"".$saveData."\",\"name\":\"".$saveName."\"}";

$curl = curl_init();

curl_setopt_array($curl, array(
    CURLOPT_URL => "http://towerdefence-001-site1.smarterasp.net/TowerDefenceService.svc/json/SaveGame",
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_ENCODING => "",
    CURLOPT_MAXREDIRS => 10,
    CURLOPT_TIMEOUT => 30,
    CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
    CURLOPT_CUSTOMREQUEST => "POST",
    CURLOPT_POSTFIELDS => $dataToSend,
    CURLOPT_HTTPHEADER => array(
        "content-type: application/json"
    ),
));

$response = curl_exec($curl);
$err = curl_error($curl);

curl_close($curl);

if ($err) {
    echo "cURL Error #:" . $err;
} else {
    echo $response;
}


