<?php
interface restfulInterface
{
    public function get($urlSegments);
    public function put($urlSegments);
    public function post($urlSegments);
    public function delete($urlSegments);
}
