<?php

 


switch($_GET['function']) {

	

	
	case 'read':


		echo($_GET['var']);

	    load($_GET['var']);
	    
	    break;

	case 'write':


    	for($i = 0; $i < 11; $i++){

	    		$data[$i] = $_GET['var' . $i];
	    	}

    	write($data);
    	break; 

    case 'loadData':
		
	    loadData($_GET['var']);
	    break;	
}





function db_connect(){

	static $connection;
	// Load configuration as an array. Use the actual location of your configuration file

	if(!isset($connection)) {
		$config = parse_ini_file('./config/config.ini'); 

		// Try and connect to the database
		$connection = mysqli_connect($config['servername'],$config['username'],$config['password'],$config['dbname']);
		}
	// If connection was not successful, handle the error

	if($connection === false) {
    // Handle error - notify administrator, log to a file, show an error screen, etc.

		return mysqli_connect_error();
	}
	
	return $connection;
}

function db_query($query) {
    // Connect to the database
    $connection = db_connect();

    // Query the database
    $result = mysqli_query($connection,$query);

    return $result;
}

function db_error() {
    $connection = db_connect();
    return mysqli_error($connection);
}

function db_select($query) {

	
    $rows = array();
    $result = db_query($query);

    // If query failed, return `false`
    if($result === false) {
    	echo "not found";
    	echo "<br>"; 
        return false;
    }
		
    // If query was successful, retrieve all the rows into an array
    while ($row = mysqli_fetch_assoc($result)) {
        $rows[] = $row;
        
    }
    
    

    return $rows;
}

function db_quote($value) {
    $connection = db_connect();
    return "'" . mysqli_real_escape_string($connection,$value) . "'";
}

/////////////////////////////////////////////////////////////////////////////////////////////////////	
function load($search){
	
	$con = db_connect();		
		
		$sql="SELECT * FROM assisi " ;

		$rows = db_select($sql);

		//$result = $rows["0"]["$search"];

	//var_dump($rows);
	echo json_encode($rows);

}	

function read($bcn){

	$con = db_connect();		
		
		$sql="SELECT * FROM assisi where buyersCheckNumber =" .  $bcn ;

		$rows = db_select($sql);

		var_dump($rows);
		echo json_encode($rows);

	

}


function write($array){
	
	



	for($i = 0; $i < 16; $i++){

		
		$array[$i] = db_quote($array[$i]);
	}

	

	
	$con = db_connect();
	
	mysqli_select_db($con,"assisi");
	
		
	$sql = "INSERT INTO assisi (org, contact, street, city, state, zip, county, phone, email, website, info) 
	VALUES ($array[0], $array[1], $array[2], $array[3], $array[4], $array[5], $array[6], $array[7], $array[8], $array[9], $array[10])";
	
		
	if ($con->query($sql) === TRUE) {
    	echo "Saved";
    	alert();
    	

	} 

	else {
    	echo "Error: " . $con->error;
	}

}

function editData($array){

	

	$buyersCheckNumber = $array[3];// pull this data before it gets removed below

	// unset($array[3]);
	// unset($array[4]);
	// unset($array[15]); //removed items that are not nedded to update

	// var_dump($array);

	for($i = 0; $i < 16; $i++){

		
		$array[$i] = db_quote($array[$i]);
	}

	
	
	$cols = array('receiptNumber', 'ammountPaid', 'sku', 'buyersCheckNumber', 'dateEntered',  'password', 'address', 'phoneNUmber', 'offer', 'buyer', 'dlNumber', 'item', 'model', 'carrier', 'esn', 'pic');

	//size = 13

	$con = db_connect();
	
	mysqli_select_db($con,"assisi");
	
	$sql = "UPDATE rfr set ";	
	
	for($i = 0; $i < 13; $i++){

		$sql .= $cols[$i] . " = " . $array[$i];

		if($i != 12){
			$sql .=", "; //makes sure that there is no comma at the end of the list
		}
	}

	
	$sql .= " Where buyersCheckNumber =" . $buyersCheckNumber;

	


	
		
	if ($con->query($sql) === TRUE) {
    	echo "Updated";
    	alert();
    	

	} 

	else {
    	echo "Error: " . $con->error;
	}

	
}

function sendArray($array){

	echo json_encode($array);
}

function ifEntryExists($bcn){

	$con = db_connect();		
		
		$sql="SELECT * FROM rfr where buyersCheckNumber =" .  $bcn ;

		$rows = db_select($sql);

		
		
		if($rows[0]['buyersCheckNumber'] == $bcn){
			return true;
		}
		
		return false;

}
		


				
?>


































