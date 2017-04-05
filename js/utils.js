'use strict';

function ajaxRequest(type, request, callback, data = null) {
	var xhr;
	xhr = new XMLHttpRequest();
	xhr.open(type, request, true);
	xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

	xhr.onreadystatechange = function () {
		if (xhr.readyState != 4) {
			return;
		}
		switch (xhr.status) {
			case 200:
				console.log(xhr.responseText);
				callback(xhr.responseText);
				break;
			default:
				httpErrors(xhr.status);

		}
	};
	xhr.send(data);
}

function httpErrors(errorNumber) {
	document.getElementById('errors').innerHTML = '<div class="alert alert-danger" role="alert"> Une erreur est survenue !!!!!</div>';
}

function loadHtmlAndJs(ajaxreponse) {
	var data;
	data = JSON.parse(ajaxreponse);
	$('#' + data.divId).load(data.html);
	$.getScript(data.js);
}