var modalActive = false;

document.addEventListener("DOMContentLoaded", function(event) {

  // attach event listeners to the xes at the top right to close the modal
  var x_buttons = document.getElementsByClassName("close-modal");

  var close_modal = function() {
    modalActive = false;
    document.getElementById("modal-overlay").style.display = "none";
    document.getElementById("image-overlay").style.display = "none";
    document.getElementById("text-overlay").style.display = "none";
  };

  for (var i = 0; i < x_buttons.length; i++) {
      x_buttons[i].addEventListener('click', close_modal, false);
  }

  // listen for click on the "más información" button and display modal
  document.getElementById("about").onclick = function() {
    modalActive = true;
    document.getElementById("modal-overlay").style.display = "block";
    document.getElementById("text-overlay").style.display = "block";
  };

  document.getElementById("modal-overlay").onclick = close_modal;
});

var map;
var markers = [];

function initMap() {
  // set up map
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 37.183054, lng: -3.601950},
    zoom: 14
  });

  // request coord data from the backend
  var xhttp = new XMLHttpRequest();

  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      var data = JSON.parse(this.responseText);
      if (data.length == 0) { return; }
      for (var i = 0; i < data.length; i++) {
        addMarker(data[i], i * 75);
      }
    }
  };

  xhttp.open("GET", "/coords", true);
  xhttp.send();
}

function addMarker(filename, timeout) {
  var re = /^(-?\d+\.?\d*)_(-?\d+\.?\d*)\.jpg$/;
  var arr = re.exec(filename);
  var latitude = parseFloat(arr[1]);
  var longitude = parseFloat(arr[2]);
  var position = {
    "lat": latitude,
    "lng": longitude
  }

  window.setTimeout(function() {
    var m = new google.maps.Marker({
      position: position,
      map: map,
      animation: google.maps.Animation.DROP
    })

    markers.add[m];

    m.addListener('click', function() {
      var request = 'images/' + filename;
      document.getElementById("image").src = request;
      modalActive = true;
      document.getElementById("modal-overlay").style.display = "block";
      document.getElementById("image-overlay").style.display = "block";
    });

    // var bounds = new google.maps.LatLngBounds();
    // bounds.extend(position);
    // map.fitBounds(bounds);
  }, timeout);
}
