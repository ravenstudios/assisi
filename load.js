var xmlhttp = checkBrowser();

var jsonArray = [];

function loadTable(){

	ajax();
	
}






function ajax() { 
	
	
	

	xmlhttp.onreadystatechange = function() {
		if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                    
			//console.log("ajax response: " + xmlhttp.responseText);          
            var returnedJSON = JSON.parse(xmlhttp.responseText); 
            //console.log(returnedJSON);  
            createTable(makeArray(returnedJSON)); 



            
			
		}
	};


xmlhttp.open("GET","database.php?function=read", true);
xmlhttp.send();
}

function checkBrowser(){

	if (window.XMLHttpRequest) {
            // code for IE7+, Firefox, Chrome, Opera, Safari
            xmlhttp = new XMLHttpRequest();
            return xmlhttp;
        } else {
            // code for IE6, IE5
            xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
            return xmlhttp;
        }
}

function createTable(array){

	

	var tags = ["Index", "Org", "Contact", "Adderss", "City", "State", "Zip", "County", "Phone", "Email", "webSite", "Info"];	

 	var table = document.createElement('table');
  	var tableBody = document.createElement('tbody');

  	var row = document.createElement('tr');

  	var cell;

  	for(var i = 0; i < tags.length; i++){

  		cell = document.createElement('th');
    	cell.appendChild(document.createTextNode(tags[i]));
       	row.appendChild(cell);
  	}

  	tableBody.appendChild(row);


  	for(var r = 0; r < array.length; r++){

  		row = document.createElement('tr');

  		for(var c = 0; c < array[r].length; c++){

  			cell = document.createElement('td');
    		cell.appendChild(document.createTextNode(array[r][c]));
     		row.appendChild(cell);

  		}
  		tableBody.appendChild(row);
  	}
 


  table.appendChild(tableBody);
  document.getElementById("table").appendChild(table);

}

function makeArray(json){

	for (var prop in json) {

  		if( json.hasOwnProperty( prop ) ) {

  			jsonArray.push([]);

  			var object = json[prop];

  			for (var property in object) {

    			if (object.hasOwnProperty(property)) {

    				jsonArray[prop].push(object[property]);
				}
			}
  		} 
	}

	return jsonArray;
}


