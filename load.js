var xmlhttp = checkBrowser();

function loadTable(){

	ajax();
	//createTable([["row 1, cell 1", "row 1, cell 2"], ["row 2, cell 1", "row 2, cell 2"]]);

}






function ajax() { //pass in a number; 0 for read and 1 for write. Also pass in a string for the url
	
	//console.log("ajax load called");
	

	xmlhttp.onreadystatechange = function() {
		if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                    
			//console.log("ajax response: " + xmlhttp.responseText);          
            var returnedJSON = JSON.parse(xmlhttp.responseText); 
            //console.log(returnedJSON);  
            createTable(returnedJSON); 
			
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

function createTable(json){

	var tags = ["Index", "Org", "Contact", "Adderss", "City", "State", "Zip", "County", "Phone", "Email", "webSite", "Info"];	

 	var table = document.createElement('table');
  	var tableBody = document.createElement('tbody');

  	var row = document.createElement('tr');

  	for(var i = 0; i < tags.length; i++){

  		var cell = document.createElement('th');
    	cell.appendChild(document.createTextNode(tags[i]));
       	row.appendChild(cell);
  	}

  	tableBody.appendChild(row);

  	for (var prop in json) {

  		if( json.hasOwnProperty( prop ) ) {

  			row = document.createElement('tr');
  			
  			
  			//console.log(json[prop][prop]);

  			var object = json[prop];

  			for (var property in object) {

    			if (object.hasOwnProperty(property)) {

    				//console.log(object[property]);

    				var cell = document.createElement('td');
    				cell.appendChild(document.createTextNode(object[property]));
       				row.appendChild(cell);
				}
			}

			tableBody.appendChild(row);
  		} 
	}	

  // tableData.forEach(function(rowData) {
  //   var row = document.createElement('tr');

  //   rowData.forEach(function(cellData) {
  //     var cell = document.createElement('td');
  //     cell.appendChild(document.createTextNode(cellData));
  //     row.appendChild(cell);
  //   });

  //   tableBody.appendChild(row);
  // });

  table.appendChild(tableBody);
  document.getElementById("table").appendChild(table);
}

//createTable([["row 1, cell 1", "row 1, cell 2"], ["row 2, cell 1", "row 2, cell 2"]]);
