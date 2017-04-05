#-------------------------------------------------------------------------------
#--- Change database -----------------------------------------------------------
#-------------------------------------------------------------------------------
use cirpoll;

#-------------------------------------------------------------------------------
#--- Database cleanup ----------------------------------------------------------
#-------------------------------------------------------------------------------
drop table if exists polls;
drop table if exists users;

#-------------------------------------------------------------------------------
#--- Database creation ---------------------------------------------------------
#-------------------------------------------------------------------------------
create table users
(
	login varchar(20) not null,
	password varchar(40) not null,
	token varchar(20),
	primary key(login)
)
engine = innodb;

create table polls
(
	id int not null auto_increment,
	login varchar(20) not null,
	title varchar(40) not null,
	option1 varchar(40) not null,
	option1score int not null,
	option2 varchar(40) not null,
	option2score int not null,
	option3 varchar(40) not null,
	option3score int not null,
	participants int not null,
	primary key(id),
	foreign key(login) references users(login)
)
engine = innodb;

#-------------------------------------------------------------------------------
#--- Populate databases --------------------------------------------------------
#-------------------------------------------------------------------------------
insert into users(login, password) values('cir2', '3d4d09dc5332618173b0a2a5c3d06f0cc9f89468');
insert into polls(login, title, option1, option1score, option2, option2score, option3, option3score, participants)
	values('cir2', 'En quelle année êtes vous ?', '1ère année', 0, '2ème année', 0, '3ème année', 0, 0);

set autocommit = 0;
set names utf8;
