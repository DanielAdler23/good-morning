

var map;
var arrMarkers = [];

function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 2,
        center: new google.maps.LatLng(0,0),
        minZoom:2,
        disableDefaultUI: true,
        styles: [
            {elementType: 'geometry', stylers: [{color: '#242f3e'}]},
            {elementType: 'labels.text.stroke', stylers: [{color: '#242f3e'}]},
            {elementType: 'labels.text.fill', stylers: [{color: '#bb0000'}]},
            {
                featureType: 'administrative.locality',
                elementType: 'labels.text.fill',
                stylers: [{color: '#d59563'}]
            },
            {
                featureType: 'poi',
                elementType: 'labels.text.fill',
                stylers: [{color: '#d59563'}]
            },
            {
                featureType: 'poi.park',
                elementType: 'geometry',
                stylers: [{color: '#263c3f'}]
            },
            {
                featureType: 'poi.park',
                elementType: 'labels.text.fill',
                stylers: [{color: '#6b9a76'}]
            },
            {
                featureType: 'road',
                elementType: 'geometry',
                stylers: [{color: '#38414e'}]
            },
            {
                featureType: 'road',
                elementType: 'geometry.stroke',
                stylers: [{color: '#212a37'}]
            },
            {
                featureType: 'road',
                elementType: 'labels.text.fill',
                stylers: [{color: '#9ca5b3'}]
            },
            {
                featureType: 'road.highway',
                elementType: 'geometry',
                stylers: [{color: '#746855'}]
            },
            {
                featureType: 'road.highway',
                elementType: 'geometry.stroke',
                stylers: [{color: '#1f2835'}]
            },
            {
                featureType: 'road.highway',
                elementType: 'labels.text.fill',
                stylers: [{color: '#f3d19c'}]
            },
            {
                featureType: 'transit',
                elementType: 'geometry',
                stylers: [{color: '#2f3948'}]
            },
            {
                featureType: 'transit.station',
                elementType: 'labels.text.fill',
                stylers: [{color: '#d59563'}]
            },
            {
                featureType: 'water',
                elementType: 'geometry',
                stylers: [{color: '#00aced'}]
            },
            {
                featureType: 'water',
                elementType: 'labels.text.fill',
                stylers: [{color: '#515c6d'}]
            },
            {
                featureType: 'water',
                elementType: 'labels.text.stroke',
                stylers: [{color: '#17263c'}]
            }
        ]

    });

    get_all_tweets()

    // Create a <script> tag and set the USGS URL as the source.
    // var script = document.createElement('script');
    // script.src = 'js/getTweets.js';
    // document.getElementsByTagName('head')[0].appendChild(script);
}

function set_markers(results) {
    console.log(results)
    for(var i=0; i<results.length;i++) {
        var coords = results[i].coordinates;
        var latLng = new google.maps.LatLng(coords.latitude, coords.longitude)
        var marker = new google.maps.Marker({
            position: latLng,
            map: map
        });
        attachSecretMessage(marker,results[i])
        arrMarkers.push(marker)
    }
}







// Loop through the results array and place a marker for each
// set of coordinates.
// window.eqfeed_callback = function(results) {
//     console.log(results)
//     for(var i=0; i<results.eqfeed_callback.length;i++) {
//         var coords = results.eqfeed_callback[i].coordinates;
//         var latLng = new google.maps.LatLng(coords.latitude, coords.longitude)
//         var marker = new google.maps.Marker({
//             position: latLng,
//             map: map
//         });
//         attachSecretMessage(marker,results.eqfeed_callback[i])
//         arrMarkers.push(marker)
//     }
// }

function attachSecretMessage(marker, secretMessage) {
    //console.log(secretMessage.timestamp);
    var date = new Date(secretMessage.timestamp*1000);
    var d = new Date(secretMessage.timestamp);
    var month = date.getUTCMonth()+1;
    // Hours part from the timestamp
    var hours = date.getUTCHours();
    // Minutes part from the timestamp
    var minutes = "0" + date.getUTCMinutes();
    // Seconds part from the timestamp
    var seconds = "0" + date.getUTCSeconds();

    // Will display time in 10:30:23 format
    var formattedTime = date.getUTCDate()+'/' + month+' '+ hours +
        ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
    //console.log(secretMessage);

    var contentString =
        '<div id="content">'+
        '<div class="text">'+
        secretMessage.text+
        '</div>'+
        '<div class="Img">'+
        // '<img src="'+secretMessage.picture+'" width"20px" height"20px">'+
        // '</div>'+
        '<div class="details"'+
        '<p>'+formattedTime+'</p>'+
        '<p>'+'@'+secretMessage.user+'</p>'+
        '<p>'+secretMessage.location.country+'</p>';
    var infowindow = new google.maps.InfoWindow({
        content: contentString
    });
    // zoom to
    // marker.addListener('click', function() {
    //     map.setZoom(8);
    //     map.setCenter(marker.getPosition());
    // });

    marker.addListener('click', function() {
        infowindow.open(marker.get('map'), marker);
    });
    marker.addListener('mouseout', function() {
        infowindow.close();
    });
}


////////////////////////////////////SVG /////////////////////////////
function creatBarChart(tweets){
    var timeStamp = [];
    for(var i=0;i<tweets.eqfeed_callback.length;i++) {
        var time = new Date(tweets.eqfeed_callback[i].timestamp*1000);
        var tmp = ('0'+Number(time.getUTCHours()+1)).substr(-2)+(("0"+time.getUTCMinutes()).substr(-2));
        timeStamp.push({v10:+ Number(tmp)});
    }
    console.log(timeStamp);

    var array=[],obj={
        caffeineoverdose:'2517',
        workhardplayhard:'761277',
        familia:'4633452'
    };
    for(a in timeStamp){
        array.push([a,timeStamp[a]])
    }
    array.sort(function(a,b){return a[1] - b[1]});
    array.reverse();


    console.log(array);
}





// var beaches = [
//     ['Bondi Beach', -12.890542, 120.274856, 4],
//     ['Coogee Beach', -12.923036, 520.259052, 5],
//     ['Cronulla Beach', -12.028249, 1221.157507, 3],
//     ['Manly Beach', -12.80010128657071, 1121.28747820854187, 2],
//     ['Maroubra Beach', -33.950198, 121.259302, 1]
// ];

function setMarkers(locations) {
    for (var i = 0; i < locations.length; i++) {
        console.log(locations[i].coordinates)
        var coords = locations[i].coordinates;
        var latLng = new google.maps.LatLng(coords.latitude, coords.longitude)
        var marker = new google.maps.Marker({
            position: latLng,
            map: map,
        });

        arrMarkers.push(marker);
    }
}

// function initialize() {
//     var mapOptions = {
//         zoom: 3,
//         center: new google.maps.LatLng(38.77417, -9.13417),
//         mapTypeId: google.maps.MapTypeId.SATELLITE
//     }
//     var map = new google.maps.Map(document.getElementById('map-canvas'),
//         mapOptions);
//
//     setMarkers(map, beaches);
// }

function removeMarkers(){
    var i;
    for(i=0;i<arrMarkers.length;i++){
        arrMarkers[i].setMap(null);
    }
    arrMarkers = [];

}

// google.maps.event.addDomListener(window, 'load', initialize);

// setInterval(function() {
//     updateTheMarkers();
// }, 5000);

// function updateTheMarkers(){
//     $.ajax({
//         type: "GET",
//         url: "/yourphp.php",
//         success: function (data) {
//             //We remove the old markers
//             removeMarkers();
//             var jsonObj = $.parseJSON(data),
//                 i;
//
//             beaches =[];//Erasing the beaches array
//
//             //Adding the new ones
//             for(i=0;i < jsonObj.beaches.length; i++) {
//                 beaches.push(jsonObj.beaches[i]);
//             }
//
//             //Adding them to the map
//             setMarkers(map, beaches);
//         }
//     });
// }


function get_all_tweets() {
    $.ajax({
        type: "GET",
        async: false,
        dataType:"json",
        url: 'https://good0morning.herokuapp.com/tweets',
        success: function(data){
            console.log(data)
            removeMarkers()
            set_markers(data)
            //console.log(data)
            //setMarkers(data)
        }
    });
}


function get_tweets_by_country(country) {
    $.ajax({
        type: "GET",
        async: false,
        dataType:"json",
        url: `https://good0morning.herokuapp.com/tweets/country/${country}`,
        success: function(data){
            removeMarkers()
            eqfeed_callback(data)
            //console.log(data)
            //setMarkers(data)
        }
    });
}

function get_tweets_by_time(time) {
    $.ajax({
        type: "GET",
        async: false,
        dataType:"json",
        url: `https://good0morning.herokuapp.com/tweets/time/${time}`,
        success: function(data){
            removeMarkers()
            eqfeed_callback(data)
            //console.log(data)
            //setMarkers(data)
        }
    });
}