let coords
let latitude
let longitude


window.onload = () => {
    coords = document.getElementById("coords");

     getLocation();
     let places = staticLoadPlaces();
     renderPlaces(places);
};



function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
    } else { 
      coords.innerHTML = "Geolocation is not supported by this browser.";
    }
  }
  
function showPosition(position) {
    latitude = position.coords.latitude;
    longitude =  position.coords.longitude;
    coords.innerHTML = "Latitude: " + latitude + "<br>Longitude: " + longitude;

    console.log("fhljhkj" + latitude + longitude);
 }

function staticLoadPlaces() {
    return [
        {
            name: 'Magnemite',
            location: {
                lat: 51.370156,
                lng: -2.358602,
            }
        },
    ];
}

function renderPlaces(places) {
    let scene = document.querySelector('a-scene');

    places.forEach((place) => {
        let latitude = place.location.lat;
        let longitude = place.location.lng;

        let model = document.createElement('a-entity');
        model.setAttribute('gps-entity-place', `latitude: ${latitude}; longitude: ${longitude};`);
        model.setAttribute('gltf-model', './assets/magnemite/scene.gltf');
        model.setAttribute('rotation', '0 180 0');
        model.setAttribute('animation-mixer', '');
        model.setAttribute('scale', '0.5 0.5 0.5');

        model.addEventListener('loaded', () => {
            window.dispatchEvent(new CustomEvent('gps-entity-place-loaded'))
        });

        scene.appendChild(model);
    });
}