<?php
include_once dirname(__DIR__, 1) . '/Database.php';


function getSong($url)
{
	$curl = curl_init();

	curl_setopt_array($curl, array(
		CURLOPT_URL => $url,
		CURLOPT_RETURNTRANSFER => true,
		CURLOPT_FOLLOWLOCATION => true,
		CURLOPT_ENCODING => "",
		CURLOPT_MAXREDIRS => 10,
		CURLOPT_TIMEOUT => 30,
		CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
		CURLOPT_CUSTOMREQUEST => "GET",
		CURLOPT_HTTPHEADER => array(
			"x-rapidapi-host: deezerdevs-deezer.p.rapidapi.com",
			"x-rapidapi-key: 6fe92251a9mshe20a4832de52a30p15f360jsne0abe88a11d8"
		),
	));
	$response = curl_exec($curl);
	$err = curl_error($curl);
	curl_close($curl);
	if ($err) {
		echo "cURL Error #:" . $err;
	} else {
		return $response;
	}
}

function getRecipeRamdom()
{
	// $data = file_get_contents("https://api.spoonacular.com/recipes/random?apiKey=2032234a3c364f9bb75d85b964473a33&includeNutrition=true&number=5&tags=vegetarian,dessert,Burgers,Pasta,beef,curry,soup");
	$data = file_get_contents("https://api.spoonacular.com/recipes/random?apiKey=2032234a3c364f9bb75d85b964473a33&includeNutrition=true&number=10&tags=soup");
	return $data;
}



$band = array('linkinpark', 'alanwalker', 'sum41', 'coldplay', 'oneokrock');
$obj = new dbManager();
$db = $obj->openConnection();
$song = ($db)->ATWD2->Recipe;
// $song->deleteMany([]);
// echo getRecipeRamdom();
$temp = json_decode(getRecipeRamdom(), true);
if (isset($temp)) {
	$result = $song->insertMany($temp['recipes']);
}
// foreach ($band as $v) {
// 	// $url = "https://deezerdevs-deezer.p.rapidapi.com/search?q=".$v;

// }





// echo '<pre>';
// print_r($temp['data']) ;
// var_dump($temp["data"][0]);
// print_r($temp);
// echo '</pre>';

// $temp = json_decode(getSong($url), true);

// echo '<pre>';
// // print_r($temp['data']) ;
// // var_dump($temp["data"][0]);
// print_r($temp);
// echo '</pre>';
	
	// }
