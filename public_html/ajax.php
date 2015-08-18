<?php
/**
 * Created by PhpStorm.
 * User: adambartkowiak
 * Date: 16/08/15
 * Time: 21:14
 */

//API Url
$url = 'http://towerdefence-001-site1.smarterasp.net/TowerDefenceService.svc/json/LoadGame/C82D8128-A3B2-42B8-A6D0-EE9413961024';

//Initiate cURL.
$ch = curl_init($url);

//The JSON data.
$jsonData = array(
    'currentGameGuid' => '111'
);

//Encode the array into JSON.
//$jsonDataEncoded = json_encode($jsonData);

//Tell cURL that we want to send a POST request.
curl_setopt($ch, CURLOPT_GET, 1);

curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
curl_setopt($ch, CURLOPT_VERBOSE, 1);
curl_setopt($ch, CURLOPT_HEADER, 1);

//Attach our encoded JSON string to the POST fields.
//curl_setopt($ch, CURLOPT_POSTFIELDS, $jsonDataEncoded);

//Set the content type to application/json
//curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-Type: application/json'));

//Execute the request
$result = curl_exec($ch);

curl_close($ch);

var_dump($result);