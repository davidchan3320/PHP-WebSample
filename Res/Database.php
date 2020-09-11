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

    function toRegex($str)
    {
        return new MongoDB\BSON\Regex($str, "i");
    }
}

$obj = new dbManager();
$obj->openConnection();

