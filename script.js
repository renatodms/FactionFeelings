//Recuperar contexto do canvas
var canvas = document.getElementById('canvasid');
var ctx = canvas.getContext('2d');
var map;

//Constantes
const WIDTH = 960;
const HEIGHT = 550;

//Ajustar altura e largura do canvas
ctx.canvas.width = WIDTH;
ctx.canvas.height = HEIGHT;

//Mostrar mapa dos EUA
// var map_img = new Image();
// map_img.src = 'us_map.png';
// map_img.onload = function(){
// 	ctx.drawImage(map_img, 0, 0, WIDTH, HEIGHT);
// }

//Mostrar mapa dos EUA (maps)
function initMap() {
	//map init
	map = new google.maps.Map(document.getElementById('map'), {
		center: {lat: 40.6743890, lng: -95.9455},
		zoom: 4
	});

	//first marker
	var myLatLng = {lat: 42.179271, lng: -83.446302};
	var marker = new google.maps.Marker({
    position: myLatLng,
		map: map,
		icon: {
      path: google.maps.SymbolPath.CIRCLE,
      scale: 5,
			strokeColor: 'red'
    },
    draggable: false,
		label: 'Trump voter 1',
    title: 'Trump voter 1'
  });

	//second marker
	var myLatLngTwo = {lat: 35.667946, lng: -95.442801};
	var secondMarker = new google.maps.Marker({
		position: myLatLngTwo,
		map: map,
		icon: {
			path: google.maps.SymbolPath.CIRCLE,
			scale: 5,
			strokeColor: 'red'
		},
		draggable: false,
		label: 'Trump voter 2',
		title: 'Trump voter 2'
	});

	//path coordinates
	var planCoordinates = [
    myLatLng,
    myLatLngTwo
  ];

	//path between the two of them
	var markersPath = new google.maps.Polyline({
    path: planCoordinates,
    geodesic: true,
    strokeColor: '#FF0000',
    strokeOpacity: 1.0,
    strokeWeight: 2
  });

	//setting path to map
	markersPath.setMap(map);
}
