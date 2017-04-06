<?php
error_reporting( E_ALL );
ini_set( 'display_errors', 1 );
require_once( 'database.php' );
// We check the request type.
$db = dbConnect();
if ( !$db ) {
	header( 'HTTP/1.1 503 Service Unavailable' );
	exit();
}
$result = dbRequestPolls( $db );


$request = substr( $_SERVER[ 'PATH_INFO' ], 1 );
//'module/polls/list'
// We check if the request is a module.
if ( is_dir( '../' . $request ) ) {
	// We extract the module name.
	$moduleName = substr( $request, strrpos( $request, '/' ) + 1 );
	if($moduleName == "chat"){
		sendHtmlAndJsData('chat', $request, $moduleName);
	}
	else{
		sendHtmlAndJsData( 'polls', $request, $moduleName );

	} 
}else {
	
	$requestType = $_SERVER['REQUEST_METHOD'];
	$expl = explode('/', $request);
	if(array_shift($expl) == 'polls'){
		$data = null;
		if(isset($_GET['login']))
			$data = dbRequestPolls($db, -1, $_GET['login']);
		else
			$data = dbRequestPolls($db);
		
		sendJsonData($data);
	}
	else{
		header( 'HTTP/1.1 400 Bad request' );
	}
	exit;
}

//----------------------------------------------------------------------------
//--- sendHtmlAndJsData ------------------------------------------------------
//----------------------------------------------------------------------------
function sendHtmlAndJsData( $divId, $modulePath, $moduleName ) {
	// We create the data (Html and Js).
	$data = array( 'html' => $modulePath . '/' . $moduleName . '.html',
		'divId' => $divId, 'js' => $modulePath . '/' . $moduleName . '.js' );
	sendJsonData( $data );
}

//----------------------------------------------------------------------------
//--- sendJsonData -----------------------------------------------------------
//----------------------------------------------------------------------------
function sendJsonData( $data, $code = 200 ) {
	// We send the data to the client.
	header( 'Content-Type: text/plain; charset=utf-8' );
	header( 'Cache-control: no-store, no-cache, must-revalidate' );
	header( 'Pragma: no-cache' );
	header( 'HTTP/1.1 200 OK' );
	echo json_encode( $data );
	exit;
}
?>