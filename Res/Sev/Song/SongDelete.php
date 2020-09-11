<?php
include_once dirname(__DIR__, 2) . '/Database.php';

$dbM = new dbManager();
$id = new MongoDB\BSON\ObjectId($urlSegments[0]);
$result = ($dbM->openConnection())->ATWD2->Song->deleteOne(["_id"=>$id]);
if($result->getDeletedCount()==1){
    $error = new errorManager();
    $error->setErrorCodes(202);
    echo json_encode($error->getErrorIntoArray());
}else{
    $error = new errorManager();
    $error->setErrorCodes(204);
    echo json_encode($error->getErrorIntoArray());
}