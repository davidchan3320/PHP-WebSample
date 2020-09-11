<?php
include_once dirname(__DIR__, 2) . '/Database.php';

$isNull = false;
foreach ($urlSegments as $i => $v) {
    if ($v == "") {
        $isNull = true;
        break;
    }
}

if ($isNull) {
    $error = new errorManager();
    $error->setErrorCodes(204);
    echo json_encode($error->getErrorIntoArray());
} else {
    $song = quoteFormat($urlSegments[0]);
    $artist = quoteFormat($urlSegments[1]);
    $album = quoteFormat($urlSegments[2]);
    $ImgUrl = quoteFormat($urlSegments[3]);
    $AudioUrl = quoteFormat($urlSegments[4]);

    $artistArr = array("name" => $artist);
    $albumArr = array("title" => $album, "cover_medium" => $ImgUrl);

    $dbM = new dbManager();
    $result = ($dbM->openConnection())->ATWD2->Song->insertOne(
        [
            'title' => $song,
            'artist' => $artistArr,
            'album' => $albumArr,
            'preview' => $AudioUrl
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
