class MapMethods{
 async getApi(url ){
  const response = await fetch(url);
  const data = await response.json();
  return data;
 }

}

// init map Methods
const api = new MapMethods;

let map;
function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: -34.397, lng: 150.644},
    zoom: 2
  });
} 
let latlng;
let objlatlng = [];
let ciudad;

let marker;
document.querySelector("button").addEventListener('click',function(){

  
  // debugger;
   ciudad = document.querySelector('#city').value;
  const mapApi = `http://www.mapquestapi.com/geocoding/v1/address?key=Osje3XRl4dUJvn5OSqHGFdUFjANdLNnz&location=${ciudad}`;
  api.getApi(mapApi)
  .then(res => {
    // checking if the city is correctley written
    if(ciudad === res.results[0].locations[0].adminArea5){
      
      // we store the lat and lng object in larlng variable 
        latlng = res.results[0].locations[0].displayLatLng;
      // we init the Marker obj and add the latlng obj in position:
       marker = new google.maps.Marker({
        position: latlng,
        map: map,
      });   
      objlatlng.push(latlng);
      addCitytoUI()
      ciudad.innetHTML = '';
      
    } else {
      // give us an error is the the city is incorrectley written
      alert('The City is incorrecley spelled');
    }

  })
})



document.querySelector('#connect').addEventListener('click', function(){
  let flightPath = new google.maps.Polyline({
    path: objlatlng,
    geodesic: true,
    strokeColor: '#FF0000',
    strokeOpacity: 1.0,
    strokeWeight: 2
  });
  flightPath.setMap(map);
})


document.querySelector('#map').addEventListener('click', function(e){
  // console.log(e.target.tagName);
  if(e.target.tagName === "AREA"){
    console.log('marker');
  }
})



function addCitytoUI(){
  // create tag
  const p = document.createElement('p');
  // create a tag
  const a = document.createElement('a');
  // add class name to p
  p.className = "city-style";
  // add class name to span
  a.className = "span-x";
  // add text
  p.appendChild(document.createTextNode(ciudad));
  // add text inside span
  a.appendChild(document.createTextNode("x"));
  // select div
  const cdiv = document.querySelector('#cities');
  cdiv.appendChild(p);
  cdiv.appendChild(a);
}


document.querySelector('#cities').addEventListener('click', function(e){
  if(e.target.className === 'city-style' ){
  //  create a tag
  const textarea = document.createElement('textarea');
  // get div
  const cityText = document.querySelector('#city-text');
  // append textarea to div
  cityText.appendChild(textarea);
  }
})
