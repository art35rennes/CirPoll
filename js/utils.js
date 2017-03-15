// JavaScript Document
'use strict';

function ajaxRequest(type, request, callback){}

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