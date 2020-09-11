<?php
include_once dirname(__DIR__, 2).'/RESTful.php';

class RecipeService implements restfulInterface
{
    public function get($urlSegments)
    {
        require_once __DIR__.'/RecipeGet.php';
    }
    public function post($urlSegments)
    {
        require_once __DIR__.'/RecipePost.php';
    }
    public function put($urlSegments)
    {
        require_once __DIR__.'/RecipePut.php';
    }
    public function delete($urlSegments)
    {
        require_once __DIR__.'/RecipeDelete.php';
    }
}