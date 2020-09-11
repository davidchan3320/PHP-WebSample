<?php
include_once dirname(__DIR__, 2) . '/Database.php';

$isNull = false;
foreach ($urlSegments as $i => $v) {
    if (count($v) == 0) {
        $isNull = true;
        break;
    }
}

if ($isNull) {
    $error = new errorManager();
    $error->setErrorCodes(204);
    echo json_encode($error->getErrorIntoArray());
} else {
    $id = $urlSegments[0];
    $Summary = quoteFormat($urlSegments[1]);
    $Instruction = quoteFormat($urlSegments[2]);
    $ImgUrl = quoteFormat($urlSegments[3]);

    $dbM = new dbManager();
    // $result = ($dbM->openConnection())->ATWD->Clinics->findOneAndUpdate(
    //     ["_id" => new MongoDB\BSON\ObjectId($id)],
    //     [
    //         '$set' => [
    //             'cluster_eng' => $c_eng,
    //             'institution_eng' => $i_eng,
    //             'address_eng' => $a_eng,
    //             'cluster_tc' => $c_tc,
    //             'institution_tc' => $i_tc,
    //             'address_tc' => $a_tc,
    //             'cluster_sc' => $c_sc,
    //             'institution_sc' => $i_sc,
    //             'address_sc' => $a_sc,
    //             'latitude' => $lat,
    //             'longitude' => $lon
    //         ]
    //     ]
    // );
    $result = ($dbM->openConnection())->ATWD2->Recipe->findOneAndUpdate(
        ["_id" => new MongoDB\BSON\ObjectId($id)],
        [
            '$set' => [
                'summary' => $Summary,
                'instructions' => $Instruction,
                'image' => $ImgUrl
            ]
        ]
    );
    $error = new errorManager();
    $error->setErrorCodes(202);
    echo json_encode($error->getErrorIntoArray());
}

function quoteFormat($str)
{
    $result = preg_replace('/[_]/', '/', $str);
    $result = preg_replace('/[+]/', ' ', $result);
    return $result;
}