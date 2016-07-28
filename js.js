var ids = ["organization", "contactPerson", "street", "city", "state", "zip", "county", 
			"phone", "email", "website", "additionalInformation"];


var xmlhttp = checkBrowser();

function getData(){

	console.log("get data called ");
	var data = [];

	for(var i = 0; i < ids.length; i++){
		data.push(document.getElementById(ids[i]).value);
	}
	console.log(data);
	return data;
}

function submit(){

	ajax(makeUrl(getData()), 1);

}

function search(){

	//ajax(document.getElementById("searchBox").value, 0);


	var returnedJson = JSON.parse(ajax("var=" + document.getElementById("searchBox").value, 0));
             var strings = returnedJson[0];
            
            var x = 0;
            for (var key in strings) {
                if (strings.hasOwnProperty(key)) {
                
                document.getElementById(ids[x]).value = strings[key];
                x++;
                }
            }

}



function ajax(str, rw) { //pass in a number; 0 for read and 1 for write. Also pass in a string for the url
	
	console.log("ajax called")
	var readOrWrite;

	if(rw === 0){
		readOrWrite = "read";
	}

	else{

		readOrWrite = "write";
	}

	xmlhttp.onreadystatechange = function() {
		if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                    
			 console.log("ajax response: " + xmlhttp.responseText);          
            return xmlhttp.responseText;    
			
		}
	};


xmlhttp.open("GET","database.php?function=" + readOrWrite + "&" + str, true);
xmlhttp.send();
}

function makeUrl(array){


    var string = "";
    for(var i =0; i < array.length; i++){
        string += "var" + i + "=" + array[i] + "&";
        
    }
    string += string.substring(0, string.length - 1);
    console.log("url string:  " + string);
    return string;
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