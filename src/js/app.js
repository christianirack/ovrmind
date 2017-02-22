var infoUsuario;
var window_em;
var mediaJsQuery={
	'l':64.063,
	'm':40.063,
	's':40
}
var size;
/*----------  Iniciar app  ----------*/
$(function(){
   window_em = 1/16 * $(window).width();
   jsResponsive();
	$.post( "ip.php", function( getIp ) {
		/*----------  Obtener fecha  ----------*/
			var getDateObj = new Date();
			var date = getDateObj.getDate()+'/'+getDateObj.getMonth()+'/'+getDateObj.getFullYear();
			var time = getDateObj.getHours()+':'+getDateObj.getMinutes()+':'+getDateObj.getSeconds();
		/*----------  Guardar datos en un objeto y en cookie  ----------*/
  			infoUsuario = { 'infoUsuario':{'ip': getIp, 'date':date, 'time':time}};
  			document.cookie = infoUsuario;
  			console.log(JSON.stringify(infoUsuario));
  		/*----------  Generar slider  ----------*/
  		ciSlider();
	});
})
/*----------  Generar slider  ----------*/
function ciSlider(){
	/*----------  Obtener la medida del dispositivo y mostrar la resolución más adecuada  ----------*/
		ciRender();
		ciNav();
}
function ciRender(){
	if(jsResponsive()=='s'){
			/*----------  Si es móvil  ----------*/
			renderImagesMediaQueries(1);
			console.log("Mostrando móvil");
		}else{
			/*----------  Si es escritorio  ----------*/
			renderImagesMediaQueries(0);
			console.log("Mostrando escritorio");
	}
}

function ciNav(){
	var i = 0;
	$('.ci-slider li').each(function(){
		$(this).attr('ci-id',i);
		$('.ci-slider-nav').append('<div id-slider="'+i+'" />');
		i++;	
	})
	$('[id-slider="0"]').addClass('active');

}
$(window).resize(function(){
	ciRender();
})
/*----------  Decidir que tamaño mostar  ----------*/
function renderImagesMediaQueries(type){
	$('[data-src]').each(function(){
		var data = String($(this).attr('data-src'));
		data = data.split(",");
		$(this).css('background-image','url('+data[type]+')');

	})
}
/*----------  Detectar tamaño del dispositivo  ----------*/
function jsResponsive(){
	window_em = 1/16 * $(window).width();
	if(window_em<=mediaJsQuery.s){
		size='s';
	}else if(window_em>=mediaJsQuery.m && window_em<=mediaJsQuery.l){
		size='m';
	}
	else if(window_em>=mediaJsQuery.l){
		size='l';
	}
	return size;
}