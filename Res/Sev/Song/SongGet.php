<?php
include_once dirname(__DIR__, 2) . '/Database.php';

if (count($urlSegments) == 2) {
    $skip = (int) $urlSegments[0];
    $limit = (int) $urlSegments[1];
    // $skip = 5;
    // $limit = 5;

    $dbM = new dbManager();
    $db = $dbM->openConnection();
    $collection = ($db)->ATWD2->Song;
    $data = $collection->find([], ["skip" => $skip, "limit" => $limit, "sort" => ["artist.name" => 1]]);
    $result = array();
    array_push($result, $data->ToArray());
    $data = array("NumDocs" => $collection->count());
    array_push($result, $data);
    echo json_encode($result);
} else if (count($urlSegments) == 3) {
    $skip = (int) $urlSegments[0];
    $limit = (int) $urlSegments[1];
    $keyword = $urlSegments[2];
    $dbM = new dbManager();
    $k = $dbM->toRegex(quoteFormat($urlSegments[2]), "i");
    $db = $dbM->openConnection();
    $collection = ($db)->ATWD2->Song;
    $data = $collection->find(["title" => $k], ["skip" => $skip, "limit" => $limit, "sort" => ["artist.name" => 1]]);
    $result = array();
    array_push($result, $data->ToArray());
    $data = array("NumDocs" => $collection->count(["title" => $k]));
    array_push($result, $data);
    echo json_encode($result);
}

function quoteFormat($str)
{
    $result = preg_replace('/[_]/', '/', $str);
    $result = preg_replace('/[+]/', ' ', $result);
    return $result;
}
// foreach ( $result as $key => $value )
// {
//     $bson = MongoDB\BSON\fromPHP($value);
//     echo MongoDB\BSON\toJSON($bson);
// //     echo "$key:$value<br>";
// //     // if()
// //     // foreach($value as $a => $b){
// //     //     // echo "$i:$v<br>";
// //     //     // $data[$id][$a] = $b;
// //     // }
// }
// for testing data
// echo "<pre>";
// print_r($result["id"]);
// echo "</pre>";
// end 
