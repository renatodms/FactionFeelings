var map;

//Cria um marcador no mapa (lat=latitude, lng=longitude, fac=cor)
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

//Verifica se o elemento esta contido no conjunto
function isContained(elm, conj){
	for(var i=0; conj[i]!=undefined; ++i){
		if (conj[i] == elm) return true;
	}
	return false;
}

//Liga os pontos que possuem conexao
function createPath(lls, con, id){
	for(var i=0; i<id; ++i){
		for(var j=i; j<id; ++j){
			if (isContained(i, con[j])){
				var markersPath = new google.maps.Polyline({
    				path: [lls[i], lls[j]],
    				geodesic: true,
    				strokeColor: 'black',
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

	var myLatLngs = [], connections = [], id=0;

	//Recuperar banco de dados
	var json = $.getJSON('http://cin.ufpe.br/~rdms/taia/db.JSON', function(db){}).complete(function(){
		var db = $.parseJSON(json.responseText);

		//Tratar objeto por objeto
		for (var i=0; i<4; ++i){
			var color = '#F00';
			if (db[i].faction == 0) color = '#00F';
			connections[i] = db[i].userConnections;
			myLatLngs[id++] = createMarker(db[i].coordinates[1], db[i].coordinates[0], color);
		}

		createPath(myLatLngs, connections, id);
	});
}
