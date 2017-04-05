'use strict'
var login, data, list;


var refreshGlobal = setInterval(ajaxRequest, 10000, 'GET', 'php/request.php/polls/', loadGlobalPolls);
var refreshOwn = setInterval(ajaxRequest, 10000, 'GET', 'php/request.php/polls/', loadOwnPolls, 'login=' + login);

login += $.cookie('login');

ajaxRequest('GET', 'php/request.php/polls/', loadGlobalPolls);

ajaxRequest('GET', 'php/request.php/polls/', loadOwnPolls, "login=" + login);

function loadGlobalPolls(ajaxResponse) {
	data = JSON.parse(ajaxResponse);

	list = document.getElementById('global-polls');
	list.innerHTML = '';
	for (var i = 0; i < data.length; i++) {
		var element;
		var text;

		text = data[i].title;
		text += '<span class="badge">' + data[i].participants + '</span>';
		element = document.createElement('a');
		element.className = 'list-group-item';
		element.setAttribute('href', '#');
		element.setAttribute('id', 'gpoll-' + data[i].id);
		element.innerHTML = text;
		list.appendChild(element);

		$('#gpoll-' + data[i].id).unbind('click').click(
			function (event) {
				event.preventDefault();
				clearInterval(refreshGlobal);
				clearInterval(refreshOwn);
				openGlobalPoll(event.target.id);
			});
	}
	console.log(ajaxResponse);
}

function loadOwnPolls(ajaxResponse) {
	data = JSON.parse(ajaxResponse);

	list = document.getElementById('own-polls');
	list.innerHTML = '';
	for (var i = 0; i < data.length; i++) {
		var element;
		var text;

		text = data[i].title;

		text += '<span class="pull-right">    <a id = "remove-poll-';
		text += data[i].id + '"><span class="glyphicon glyphicon-remove"';
		text += 'aria-hidden="true" id=rpoll-' + data[i].id + '></span></a></span>';

		text += '<span class="badge">' + data[i].participants + '</span>';

		element = document.createElement('a');
		element.className = 'list-group-item';
		element.setAttribute('href', '#');
		element.setAttribute('id', 'opoll-' + data[i].id);
		element.innerHTML = text;
		list.appendChild(element);

		$('#opoll-' + data[i].id).unbind('click').click(
			function (event) {
				event.preventDefault();
				clearInterval(refreshGlobal);
				clearInterval(refreshOwn);
				openGlobalPoll(event.target.id);
			});
	}
	console.log(ajaxResponse);
}



function openGlobalPoll(pollId) {
	
	var reply = $.cookie('reply-'+pollId);
	if(typeof reply === 'undefined'){
		$.cookie('current-id', pollId);
		//$.cookie('reply-'+pollId, 'answer', 365);
		ajaxRequest('GET', 'php/request.php/module/polls/reply', loadHtmlAndJs);
	}
	else{
		ajaxRequest('GET', 'php/request.php/module/polls/results', loadHtmlAndJs);
	}


}