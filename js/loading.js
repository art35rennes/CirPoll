'use strict';
$.cookie('login', 'cir2');
ajaxRequest('GET','php/request.php/module/polls/list', loadHtmlAndJs);
ajaxRequest('GET','php/request.php/module/chat', loadHtmlAndJs);
