<?php error_reporting(E_ALL);
$objeto = [];
$conexion = new mysqli('irack.mx','irack_ovrmind','demodemo','irack_ovrmind');
if($conexion->connect_error){
	die('error');
}else{
	$r = $conexion->query("SELECT servicio FROM servicios ORDER BY servicio asc");
	while ($fila = $r->fetch_assoc()){
		array_push($objeto, $fila['servicio']);
	}
	echo json_encode($objeto,JSON_FORCE_OBJECT );
};