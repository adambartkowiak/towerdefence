<?php
/**
 * Created by PhpStorm.
 * User: adambartkowiak
 * Date: 22/02/16
 * Time: 00:06
 */

$file_url = '../files/mapexports/mapsave.json';
header('Content-Type: application/octet-stream');
header("Content-Transfer-Encoding: Binary");
header("Content-disposition: attachment; filename=\"" . basename($file_url) . "\"");
readfile($file_url); // do the double-download-dance (dirty but worky)