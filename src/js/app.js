/*----------  Inicializar variables del entorno y configuración del slider  ----------*/
var infoUsuario;
var window_em;
var zIndex=999;
var mediaJsQuery={
	'l':64.063,
	'm':40.063,
	's':40
}
var size;
var sections = ['sections/home.html','sections/services.html','sections/contact.html'];
/*----------  Iniciar sección  ----------*/
$(function(){
	open(sections[0],'home()');
	events();
})

function open(file,functionEval){
	$('#content').load(file, function(response, status, xhr){
		eval(functionEval);
	})

}
/*----------  Cargar home  ----------*/
function home(){
	window_em = 1/16 * $(window).width();
   jsResponsive();
	$.post( "php/api-ip.php", function( getIp ) {
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
}

function servicios(){
	$.post( "php/api-servicios.php", function( getServices ) {
		getServices = JSON.parse(getServices);
  			for(var x in getServices){
  				$(".ci-services").append('<li>'+getServices[x]+'</li>')
  				console.log(getServices[x]);
  			}
  		
	});
}

function contacto(){
	$('#form-button').on('touch click',function(){
		if($('input[name="name"]').val()!='' &&  ($('input[name="email"]').val().indexOf("@") != -1) &&  $('input[name="tel"]').val()!=''){
			$('.form-element').hide();
			$('#form-button').off('touch click');
			$.post( "php/api-guardar.php", {name:$('input[name="name"]').val(),email:$('input[name="email"]').val(),tel:$('input[name="tel"]').val()},  function(  ) {
				$('#form-button').html('Gracias, tu mensaje ha sido enviado!');
			});
		}else{
			$('.form-alert').show();
		}
	});
}
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
	/*----------  Leer # de elementos del slider  ----------*/
	$('.ci-slider li').each(function(){
		$(this).attr('ci-id',i);
		$(this).css({'top':-100});
		$('.ci-slider-nav').append('<div id-slider="'+i+'" />');
		i++;
	})
	/*----------  Asignar eventos con algunos efectos de movimiento (css3) ----------*/
	$('[id-slider]').on('click touch', function(){
		var idObj = $(this).attr('id-slider');
		$('[ci-id]').css({'top':-100,'opacity':0});
		$('[ci-id="'+idObj+'"]').css({ 'zIndex':zIndex, 'top':0,'opacity':1});
		$('[id-slider]').removeClass('active');
		$('[id-slider="'+idObj+'"]').addClass('active');
		zIndex++;
	});
	/*---------- Mostrar el primero  ----------*/
	$('[id-slider="0"]').addClass('active');
	$('[ci-id="0"]').css({'top':0, 'zIndex':zIndex});


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
/*----------  Detectar tamaño del dispositivo en em  ----------*/
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
/*----------  Eventos al menú  ----------*/
function events(){
	$('[id-sec]').on('touch click',function(e){
		var attr = $(this).attr('id-sec');
		$('[id-sec]').removeClass('active-link');
		$(this).addClass('active-link');
		if(attr==0){
			open(sections[attr],'home()');
		}else if(attr==1){
			open(sections[attr],'servicios()');
		}else if(attr==2){
			open(sections[attr],'contacto()');
		}
	})
}