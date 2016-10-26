//Recuperar contexto do canvas
var canvas = document.getElementById('canvasid');
var ctx = canvas.getContext('2d');

//Constantes
const WIDTH = 960;
const HEIGHT = 550;

//Ajustar altura e largura do canvas
ctx.canvas.width = WIDTH;
ctx.canvas.height = HEIGHT;

//Mostrar mapa dos EUA
var map_img = new Image();
map_img.src = 'us_map.png';
map_img.onload = function(){
	ctx.drawImage(map_img, 0, 0, WIDTH, HEIGHT);
}
