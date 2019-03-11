

const getLocation = () => {
    navigator.geolocation.getCurrentPosition(showLocation);
}

const showLocation = (position) => {
    const latlong = `${position.coords.latitude},${position.coords.longitude}`
    getAddressFromApi(latlong)
    state.coords = latlong
    state.userLat = position.coords.latitude
    state.userLong = position.coords.longitude
}

const getAddressFromApi = (coords) => {
    state.coords = coords
     fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${coords}&key=AIzaSyAz2usdpA-kqhzeMH1MGwc-ZtmM28sQo30`)
      .then(resp => resp.json())
       .then(json => addLocationToState(json.results[5].formatted_address))
       .then(window.setTimeout(visibilityFunction,4000))
        
}

const addLocationToState = (location) => {
    state.location = location
    locationEl.innerText = `Your current location is ${state.location}`
}


// =============================================================================





// =============================================================================

const getTargetBearing = () => {
  let startLat = state.userLat
  let startLng = state.userLong

  let destLat = parseFloat(state.target.long)
  let destLng = parseFloat(state.target.lat)

  bearing(startLat, startLng, destLat, destLng)
}



// Converts from degrees to radians.
function toRadians(degrees) {
  return degrees * Math.PI / 180;
};

// Converts from radians to degrees.
function toDegrees(radians) {
  return radians * 180 / Math.PI;
}


function bearing(startLat, startLng, destLat, destLng){
  startLat = toRadians(startLat);
  startLng = toRadians(startLng);
  destLat = toRadians(destLat);
  destLng = toRadians(destLng);

  y = Math.sin(destLng - startLng) * Math.cos(destLat);
  x = Math.cos(startLat) * Math.sin(destLat) -
        Math.sin(startLat) * Math.cos(destLat) * Math.cos(destLng - startLng);
  brng = Math.atan2(y, x);
  brng = toDegrees(brng);
  // return (brng + 360) % 360;
  state.targetBearing = Math.floor(((brng + 360) % 360));

}




//
