<?php session_start();
if($_POST['close']){
	$_SESSION['pass'] = false;
	 session_destroy();
}else{
	if($_POST['pass']=='ovr'){
		$_SESSION['pass'] = true;
	}
	if($_SESSION['pass']){
		$objeto = [];
		$conexion = new mysqli('irack.mx','irack_ovrmind','demodemo','irack_ovrmind');
		if($conexion->connect_error){
			die('error');
		}else{
			$r = $conexion->query("SELECT * FROM clientes ORDER BY id desc");
			while ($fila = $r->fetch_assoc()){
				array_push($objeto, ['name'=>utf8_encode($fila['name']),'email'=>utf8_encode($fila['email']),'tel'=>utf8_encode($fila['tel'])]);
			}
		};
		echo json_encode($objeto,JSON_UNESCAPED_UNICODE);
	}else{
		echo json_encode($objeto,JSON_UNESCAPED_UNICODE);
	}
}