<?php

require_once __DIR__ . '/Lib/vendor/autoload.php';

class dbManager
{
    private $path = false;
    private $db = false;

    function __construct()
    {
        $this->path = "mongodb+srv://Admin:<password>@democluster-rpx7e.azure.mongodb.net/test?retryWrites=true&w=majority";
        $this->db = new MongoDB\Client($this->path);
    }

    public function openConnection()
    {
        return $this->db;
    }

    // public function setup()
    // {
    //     if ($this->db !== false) {
    //         $clinics = ($this->db)->ATWD->Clinics;
    //         $data = json_decode(file_get_contents("http://www.ha.org.hk/opendata/facility-gop.json"));
    //         if (isset($data)) {
    //             $clinics->deleteMany([]);
    //             $result = $clinics->insertMany($data);
    //         }
    //         // $resultMsg = printf("Inserted %d document(s)<br>", $result->getInsertedCount());
    //         // $resultMsg .= var_dump($result->getInsertedIds());
    //         // return $resultMsg;
    //         // $error = new errorManager();
    //         // $error->setErrorCodes(201);
    //         // echo json_encode($error->getErrorIntoArray());
    //     } else {
    //         // $error = new errorManager();
    //         // $error->setErrorCodes(401);
    //         // echo json_encode($error->getErrorIntoArray());
    //         // return "Get Clinics Data Failed!";
    //     }
    // }

    function toRegex($str)
    {
        return new MongoDB\BSON\Regex($str, "i");
    }
}

$obj = new dbManager();
$obj->openConnection();

