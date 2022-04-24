<?php
session_start();

$obj = new stdClass();
$today = date("j");

$mots = json_encode($obj);
$data = array();
for ($i = 1; $i < 26; $i++) {
    $tempIntMax = rand(-5, 50);
    $tempIntMin = rand(-5, $tempIntMax);
    $tempExMax = rand(-5, 50);
    $tempExMin = rand(-5, $tempExMax);
    $numjour = date("j") - $i;
    if ($numjour <= 0) {
        $numjour = date("j") - $today + 1;
    }
    $array = array(
        "id" => $i,
        "date" => date("$numjour/n/Y"),
        "tempInterieurMax" => $tempIntMax,
        "tempInterieurMin" => $tempIntMin,
        "tempExterieurMax" => $tempExMax,
        "tempExterieurMin" => $tempExMin,
    );
    array_push($data, $array);
    $json = json_encode($data);
    $bytes = file_put_contents("temperature.json", $json);
}
echo $json;

