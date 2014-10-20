function getCookie(name) {
    var cookieValue = null;
    if (document.cookie && document.cookie != '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = jQuery.trim(cookies[i]);
            if (cookie.substring(0, name.length + 1) == (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

function send_ajax(target_url,method,success_callback,formadata,error_callback,busy_callback,async){
	if(!target_url||!method||!success_callback){return;}
	if(!((method=="GET")||(method=="POST"))){return;}
	if(async==undefined){var async=true;}
	console.log("async="+String(async));
	var xmlhttp;
	 if (window.XMLHttpRequest)
      {// code for IE7+, Firefox, Chrome, Opera, Safari
      xmlhttp=new XMLHttpRequest();
      }
    else
      {// code for IE6, IE5
      xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
      }

      xmlhttp.onreadystatechange=function()
        {
          if (xmlhttp.readyState<4) {
          		if(busy_callback!=undefined){busy_callback(true);}
            }

          if (xmlhttp.readyState==4){

          	if(busy_callback!=undefined){busy_callback(false);}

          	if(xmlhttp.status==200)
	            {               
	               	var result = xmlhttp.responseText;
	               	success_callback(result);
	            }
	        else{
	        		var error = xmlhttp.responseText;
	        		error_callback(error);
	        	}
        	}
		}

		xmlhttp.open(method,target_url,async);

		if(method=="POST"){
			if(!formadata){return;}
			var csrftoken = getCookie('csrftoken');
            xmlhttp.setRequestHeader("X-CSRFToken", csrftoken);
			xmlhttp.send(formadata);
		}

		if(method=="GET"){
			xmlhttp.send();
		}
	}



function ajax_blob_load(options){ 

  var xmlhttp;

  if (window.XMLHttpRequest)
          {// code for IE7+, Firefox, Chrome, Opera, Safari
          xmlhttp=new XMLHttpRequest();
          }
        else
          {// code for IE6, IE5
          xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
          }

      xmlhttp.onreadystatechange=function()
        {
          if (xmlhttp.readyState<4) {
              $('message_modal').modal('show');
            }

          if (xmlhttp.readyState==4 && xmlhttp.status==200)
            {               
                var response_blob = this.response;
                options.success(response_blob);
                $('message_modal').modal('hide');
            }
            else{
            }
        }
        

    xmlhttp.open("GET",String(options.url),true);

    xmlhttp.responseType = 'blob';
  	xmlhttp.setRequestHeader("Access-Control-Allow-Origin", "*");
    xmlhttp.setRequestHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    xmlhttp.setRequestHeader("Access-Control-Allow-Methods","GET");
    xmlhttp.send();
}