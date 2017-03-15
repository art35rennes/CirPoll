// JavaScript Document
'use strict';

function ajaxRequest(type, request, callback){
	var xhr;
	
	xhr = new XMLHttpRequest();
	xhr.open(type, request, true);
	
	var divErrors = document.getElementById('errors')
	var text = "<div id='erroes' class='alert alert-danger' role='alert'>";
	text += "<span class='glyphicon glyphicon-ban-circle'></span>";
	
	xhr.onreadystatechange = function(){
		if(xhr.readyState !== 4){
			return;
		}
		switch(xhr.status){
			case 200:
				text += "<strong> OK</strong>";
				break;
			case 400:
				text += "<strong> Requete incorrecte</strong>";
				break;
			case 401:
				text += "<strong> Unauthorized</strong>";
				break;
			case 403:
				text += "<strong> Forbidden </strong>";
				break;
			case 500:
				text += "<strong> Internal Error</strong>";
				break;
			case 404:
				text += "<strong> Not found</strong>";
				break;
		}
		text +="</div";
		divErrors.innerHTML = text;
	};
	
	xhr.send();
	
}

function httpErrors(errorNumber){
	console.log(errorNumber);
}

estSuperieur(25, 2, maFonctionCallback); // Affiche 'oui'.

function maFonctionCallback(word){
	console.log(word);
}
function estSuperieur(val1, val2, callback){
	if (val1 > val2){
		callback('oui');
	}
	else{
		callback('non');
	}
}