<?php error_reporting(E_ALL);
$name = htmlentities($_POST['name']);
$email = htmlentities($_POST['email']);
$tel = htmlentities($_POST['tel']);
$conexion = new mysqli('irack.mx','irack_ovrmind','demodemo','irack_ovrmind');
if($conexion->connect_error){
	die('error');
}else{
	$conexion->query("INSERT INTO clientes (name, email, tel) VALUES ('$name','$email', '$tel')");
};