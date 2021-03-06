let coords
let userLat
let userLon


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
    userLat = position.coords.latitude;
    userLon =  position.coords.longitude;
    coords.innerHTML = "User Latitude: " + userLat + "<br>User Longitude: " + userLat;

 }

function staticLoadPlaces() {
    return [
        {
            name: 'Magnemite',
            location: {
                lat: 0,
                lng: 0,
            }
        },
    ];
}

function renderPlaces(places) {
    let scene = document.querySelector('a-scene');

    places.forEach((place) => {
        let latitude = userLat;
        let longitude = userLon;

        let model = document.createElement('a-entity');
        model.setAttribute('gps-entity-place', `latitude: ${latitude}; longitude: ${longitude};`);
        model.setAttribute('gltf-model', './assets/magnemite/scene.gltf');
        model.setAttribute('rotation', '0 0 0');
        model.setAttribute('animation-mixer', '');
        model.setAttribute('scale', '0.5 0.5 0.5');

        model.addEventListener('loaded', () => {
            window.dispatchEvent(new CustomEvent('gps-entity-place-loaded'))
        });

        scene.appendChild(model);
    });
}