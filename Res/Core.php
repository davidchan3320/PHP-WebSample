<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Content-Security-Policy: default-src 'none'; img-src 'self' data:;");

include_once __DIR__ . '/Error.php';

class Controller
{
    private $error = false;
    private $serviceProvider = false;
    private $urlSegments = false;
    // private $errorMsg = false;

    function __construct()
    {
        // $this->error = new errorManager();
        if (!isset($_SERVER['PATH_INFO']) or $_SERVER['PATH_INFO'] == '/') {
            $this->errorMsg = $this->error->setErrorCodes(400);
        } else {
            $this->urlSegments = explode('/', $_SERVER["PATH_INFO"]);
            // Uri : localhost/myWeb/ATWD2/Assignment/PHP/Res/Core.php/[resourceName]/.../...
            array_shift($this->urlSegments);
            $resourceName = array_shift($this->urlSegments);
            $serviceProviderName = ucfirst($resourceName) . 'Service';
            $serviceProviderFileName = $serviceProviderName . '.php';
            // $fullPath = '../'.$resourceName.'/' . $serviceProviderFileName;
            // '../clinics/ClinicsService.php';
            // echo $fullPath."<br>".file_exists($fullPath);
            $fullPath = __DIR__ . '/Sev/' . $resourceName . '/' . $serviceProviderFileName;
            // '/Applications/MAMP/htdocs/myWeb/ATWD2/Assignment/PHP/Res/Sev/Song/SongService.php';
            if (file_exists($fullPath)) {
                require_once $fullPath;
                $this->serviceProvider = new $serviceProviderName();
            } else {
                $this->errorMsg = $this->error->setErrorCodes(404);
            }
        }
    }

    function run()
    {
        if ($this->serviceProvider === false) {
            echo json_encode($this->error->getErrorIntoArray());
            // echo "core.php/{resouce name}/{parameter list}";
            exit;
        }
        $methodName = strtolower($_SERVER["REQUEST_METHOD"]);
        $this->serviceProvider->$methodName($this->urlSegments);
    }
}
$c = new Controller();
$c->run();
