var mymap = L.map('mapid').setView([ 51.505, -0.09 ], 100);

L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
	attribution :
		'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
	maxZoom     : 18,
	id          : 'mapbox/streets-v11',
	tileSize    : 512,
	zoomOffset  : -1,
	accessToken : 'pk.eyJ1IjoiYXJ5YW4wMDA3IiwiYSI6ImNrczA3ZHMzbjBrbnAyb3BqN2k2cmV0emoifQ.MPOKWsYIUYRntHFdGUVR9A'
}).addTo(mymap);

document.querySelector('.submit').addEventListener('click', function(event) {
	event.preventDefault();
	let value = document.querySelector('.search').value;

	// let apikey = 'at_035CK7wtcHbRvZi0tvLpAQpoSLhou';

	if (value.includes('@')) {
		axios
			.get(`https://geo.ipify.org/api/v1?apiKey=at_035CK7wtcHbRvZi0tvLpAQpoSLhou&email=${value}`)
			.then((res) => {
				let lat = res.data.location.lat;
				let lng = res.data.location.lng;
				document.querySelector('.ip').innerHTML = `${res.data.ip}`;
				document.querySelector('.location').innerHTML = `${res.data.location.city}, ${res.data.location
					.region}, ${res.data.location.country}`;

				document.querySelector('.timezone').innerHTML = ` UTC ${res.data.location.timezone}`;

				document.querySelector('.isp').innerHTML = `${res.data.isp}`;

				showLocation(lat, lng);
				console.log(res);
			})
			.catch((err) => {
				console.error(err);
			});

		function showLocation(lat, lng) {
			L.marker([ `${lat}`, `${lng}` ]).addTo(mymap).bindPopup('Your location').openPopup();
		}
	} else {
		axios
			.get(`https://geo.ipify.org/api/v1?apiKey=at_035CK7wtcHbRvZi0tvLpAQpoSLhou&ipAddress=${value}`)
			.then((res) => {
				let lat = res.data.location.lat;
				let lng = res.data.location.lng;
				document.querySelector('.ip').innerHTML = `${res.data.ip}`;
				document.querySelector('.location').innerHTML = `${res.data.location.city}, ${res.data.location
					.region}, ${res.data.location.country}`;

				document.querySelector('.timezone').innerHTML = ` UTC ${res.data.location.timezone}`;

				document.querySelector('.isp').innerHTML = `${res.data.isp}`;

				showLocation(lat, lng);
				console.log(res);
			})
			.catch((err) => {
				console.error(err);
			});

		function showLocation(lat, lng) {
			L.marker([ `${lat}`, `${lng}` ]).addTo(mymap).bindPopup('Your location').openPopup();
		}
	}
});
