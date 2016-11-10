var map;

//Cria nรณ (lat=latitude, lng=longitude, fac=cor)
function createMarker(lat, lng, fac){
	var myLatLng = {lat: lat, lng: lng};
	var marker = new google.maps.Marker({
		position: myLatLng,
		map: map,
		icon: {
			path: google.maps.SymbolPath.CIRCLE,
			scale: 5,
			strokeColor: fac
		},
		draggable: false
	});
	return myLatLng;
}

//Liga os pontos da mesma faccao
function createPath(lls, cols, id){
	for(var i=0; i<id; ++i){
		for(var j=i; j<id; ++j){
			if(cols[i] == cols[j]){
				var markersPath = new google.maps.Polyline({
    				path: [lls[i], lls[j]],
    				geodesic: true,
    				strokeColor: cols[i],
    				strokeOpacity: 1.0,
    				strokeWeight: 2
  				});

				markersPath.setMap(map);
			}
			
		}
	}
}

//Mostrar mapa dos EUA
function initMap() {
	//map init
	map = new google.maps.Map(document.getElementById('map'), {
		center: {lat: 40.6743890, lng: -95.9455},
		zoom: 4
	});

	var myLatLngs = [], myColors = [], id=0;

	//Exemplos para teste
	myColors[id] = '#008';
	myLatLngs[id++] = createMarker(42.179271, -83.446302, myColors[id-1]);
	myColors[id] = '#F55';
	myLatLngs[id++] = createMarker(35.667946, -95.442801, myColors[id-1]);
	myColors[id] = '#F55';
	myLatLngs[id++] = createMarker(40.667946, -75.442801, myColors[id-1]);
	myColors[id] = '#F00';
	myLatLngs[id++] = createMarker(40.667946, -95.442801, myColors[id-1]);
	myColors[id] = '#00F';
	myLatLngs[id++] = createMarker(41.179271, -90.446302, myColors[id-1]);

	createPath(myLatLngs, myColors, id);
}
