<?php
/**
 * Created by PhpStorm.
 * User: adambartkowiak
 * Date: 21/02/16
 * Time: 22:11
 */

//API Url
$saveData = file_get_contents('php://input');

// Sanitizing the filename:
$filename = "../files/mapexports/mapsave.json";

file_put_contents ($filename, $saveData);