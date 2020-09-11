<?php
include_once dirname(__DIR__, 2).'/RESTful.php';

class SongService implements restfulInterface
{
    public function get($urlSegments)
    {
        require_once __DIR__.'/SongGet.php';
    }
    public function post($urlSegments)
    {
        require_once __DIR__.'/SongPost.php';
    }
    public function put($urlSegments)
    {
        require_once __DIR__.'/SongPut.php';
    }
    public function delete($urlSegments)
    {
        require_once __DIR__.'/SongDelete.php';
    }
}
