var infoUsuario;
$(function(){
	$.post( "ip.php", function( getIp ) {
		/*----------  Obtener fecha  ----------*/
			var getDateObj = new Date();
			var date = getDateObj.getDate()+'/'+getDateObj.getMonth()+'/'+getDateObj.getFullYear();
			var time = getDateObj.getHours()+':'+getDateObj.getMinutes()+':'+getDateObj.getSeconds();
		/*----------  Guardar datos en un objeto y en cookie  ----------*/
  			infoUsuario = { 'infoUsuario':{'ip': getIp, 'date':date, 'time':time}};
  			document.cookie = infoUsuario;
  			console.log(JSON.stringify(infoUsuario));
	});
})


function generarSlider(){
	
}