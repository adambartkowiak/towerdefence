<?php

//API Url
$saveData = file_get_contents('php://input');

// Sanitizing the filename:
$filename = "mapsave.json";

// Outputting headers:
header("Cache-Control: ");
header("Content-type: application/octet-stream");
header('Content-Disposition: attachment; filename="'.$filename.'"');

echo $saveData;



