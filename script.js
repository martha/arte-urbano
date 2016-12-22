images = {
  
}

document.addEventListener("DOMContentLoaded", function(event) {
  var classname = document.getElementsByClassName("close-modal");

  var close_modal = function() {
    document.getElementById("modal-overlay").style.display = "none";
    document.getElementById("image-overlay").style.display = "none";
    document.getElementById("text-overlay").style.display = "none";
  };

  for (var i = 0; i < classname.length; i++) {
      classname[i].addEventListener('click', close_modal, false);
  }

  document.getElementById("about").onclick = function() {
    document.getElementById("modal-overlay").style.display = "block";
    document.getElementById("text-overlay").style.display = "block";
  };
});

var map;
function initMap() {
  var myLatLng = {lat: 37.182370, lng: -3.601135};

  map = new google.maps.Map(document.getElementById('map'), {
    center: myLatLng,
    zoom: 15
  });

  var marker = new google.maps.Marker({
    map: map,
    position: myLatLng,
    title: 'test!'
  });

  marker.addListener('click', function() {
    document.getElementById("modal-overlay").style.display = "block";
    document.getElementById("image-overlay").style.display = "block";
  });
}