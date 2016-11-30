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
	if (conj != undefined){
		for(var i=0; conj[i]!=undefined; ++i){
			if (conj[i] == elm) return true;
		}
	}
	return false;
}

//Retorna a cor associada
function getColor(feel){
	if (feel == 0 || feel == 4) return '#005';
	if (feel == 1 || feel == 3) return '#55F';
	if (feel == 2) return '#00F';
}

//Liga os pontos que possuem conexao
function createPath(lls, con, id, cor){

	for(var i=0; i<id; ++i){
		for(var j=0; j<id; ++j){

			var fill = '#9B8065';
			if (cor[i] == 0) fill = '#01CBCC';
			if (cor[i] == 1) fill = '#F6F606';
			if (cor[i] == 2) fill = '#FE5745';
			if (cor[i] == 3) fill = '#F39D01';
			if (cor[i] == 4) fill = '#7F7FCF';
			if (cor[i] == 5) fill = '#E3DE58';
			if (cor[i] == 6) fill = '#4C3484';
			if (cor[i] == 7) fill = '#EF4B6D';
			if (cor[i] == 8) fill = '#9B8065';
			if (cor[i] == 9) fill = '#5AFFE9';
			if (cor[i] == 10) fill = '#FD66FE';

			if (isContained(i, con[j])){
				if (lls[i] != undefined && lls[j] != undefined){
					console.log(fill);
					var markersPath = new google.maps.Polyline({
    					path: [lls[i], lls[j]],
    					geodesic: true,
    					strokeColor: fill,
    					strokeOpacity: 1.0,
    					strokeWeight: 2
  					});

					markersPath.setMap(map);
				}
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

	var myLatLngs = [], connections = [], colors = [], id_max=0;
	console.log(db);

	//Tratar objeto por objeto
	var h = 11;
		for (var i=0;  i<parseInt(db[h].length*0.3); ++i){
			connections[i] = db[h][i].connections;
			myLatLngs[id_max] = createMarker(parseFloat(db[h][i].latitude), parseFloat(db[h][i].longitude), getColor(db[h][i].feel));
			colors[id_max++] = h;
		}
		h = 0;
		for (var i=0;  i<parseInt(db[h].length*0.3); ++i){
			connections[i] = db[h][i].connections;
			myLatLngs[id_max] = createMarker(parseFloat(db[h][i].latitude), parseFloat(db[h][i].longitude), getColor(db[h][i].feel));
			colors[id_max++] = h;
		}
		h = 5;
		for (var i=0;  i<parseInt(db[h].length*0.3); ++i){
			connections[i] = db[h][i].connections;
			myLatLngs[id_max] = createMarker(parseFloat(db[h][i].latitude), parseFloat(db[h][i].longitude), getColor(db[h][i].feel));
			colors[id_max++] = h;
		}
	
	createPath(myLatLngs, connections, id_max+1, colors);
}
