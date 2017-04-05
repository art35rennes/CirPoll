<?php
// $link = mysqli_connect($server, $username, $password, $basededonnees)
// or die("Impossible de se connecter : " . mysql_error());
// echo 'Connexion réussie';

function dbRequestPolls($db, $id= -1, $login ='')
{
  try{
    $requete = 'SELECT * FROM polls';
    if ($id != -1)
      $requete.= ' where id =:id';
    if ($login != '')
      $requete .=' where login =:login';
    $statement = $db->prepare($requete);
    if ($id != -1)
      $statement->bindParam(':id', $id, PDO::PARAM_INT);
    if ($login != '')
      $statement->bindParam(':login', $login , PDO::PARAM_STR, 20);
    $statement->execute();
    $result = $statement->fetchAll(PDO::FETCH_ASSOC);
  }
  catch(PDOExeption $exception){
	error_log('Request error: '.$exception->getMessage());
    return false;
  }
  return $result;
}

function dbConnect()
{
  $server = 'localhost';
  $username = 'root';
  $password = '';
  $basededonnees = 'cirpoll';

  try{
    $db = new PDO('mysql:host='.$server.';dbname='.$basededonnees.';charset=utf8', $username, $password);
  }
  catch(PDOExeption $exception){
	error_log($exception->getMessage());
    return false;
  }
  return $db;
}
?>
