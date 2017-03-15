<?php
function  sendHtmlAndJsData($divId, $moduleName){
	
}

$urlExplode = explode('/', $_SERVER['PATH_INFO']);

switch($urlExplode[2]){
	case 'polls':
		break;
	case 'list':
		break;
	default:
		header('HTTP/1.1 400 Bad request');
		exit;

}

?>