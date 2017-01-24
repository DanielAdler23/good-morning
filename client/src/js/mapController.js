var map
var arrMarkers = []
var iconBase = 'https://maps.google.com/mapfiles/kml/shapes/'
var blueDot = './img/blueDot.png'
var greenDot = './img/greenDot.png'
var firstTime = false
var allMarkers

//------------------------------------------------ Map Controller ------------------------------------------------//

function initMap() {
    get_all_tweets()
    setTimeout(() => {
        document.querySelector('div#loading').remove()
        map = new google.maps.Map(document.getElementById('map'), {
            zoom: 2,
            center: new google.maps.LatLng(0, 0),
            minZoom: 2,
            disableDefaultUI: true,
            styles: [
                {
                    elementType: 'geometry',            //Countries Color
                    stylers: [{color: '#0ba9ff'}]
                },
                {
                    elementType: 'labels.text.stroke',  //Countries Title Outer Line Color
                    stylers: [{color: '#42ace3'}]
                },
                {
                    elementType: 'labels.text.fill',    //Countries Title Color
                    stylers: [{color: '#ffffff'}]
                },
                {
                    featureType: 'administrative.country',
                    elementType: 'geometry',
                    stylers: [{color: '#45d1f1'}]
                },
                {
                    featureType: 'administrative.locality',
                    elementType: 'labels.text.fill',
                    stylers: [{color: '#ffffff'}]
                },
                {
                    featureType: 'poi.park',
                    elementType: 'geometry',
                    stylers: [{color: '#45d1f1'}]
                },
                {
                    featureType: 'road',
                    elementType: 'geometry',
                    stylers: [{color: '#38414e'}]
                },
                {
                    featureType: 'road',
                    elementType: 'geometry.stroke',
                    stylers: [{color: '#45d1f1'}]
                },
                {
                    featureType: 'road.highway',
                    elementType: 'geometry',
                    stylers: [{color: '#45d1f1'}]
                },
                {
                    featureType: 'road.highway',
                    elementType: 'geometry.stroke',
                    stylers: [{color: '#45d1f1'}]
                },
                {
                    featureType: 'transit',
                    elementType: 'geometry',
                    stylers: [{color: '#45d1f1'}]
                },
                {
                    featureType: 'transit.station',
                    elementType: 'labels.text.fill',
                    stylers: [{color: '#d59563'}]
                },
                {
                    featureType: 'water',               //Water Color
                    elementType: 'geometry',
                    stylers: [{color: '#45d1f1'}]
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
        })
        set_markers(allMarkers)
    }, 8000)
}

function attachSecretMessage(marker, secretMessage) {
    // var date = new Date(secretMessage.timestamp * 1000);
    // var d = new Date(secretMessage.timestamp);
    // var month = date.getUTCMonth() + 1;
    // // Hours part from the timestamp
    // var hours = date.getUTCHours();
    // // Minutes part from the timestamp
    // var minutes = "0" + date.getUTCMinutes();
    // // Seconds part from the timestamp
    // var seconds = "0" + date.getUTCSeconds();
    //
    // // Will display time in 10:30:23 format
    // var formattedTime = date.getUTCDate() + '/' + month + ' ' + hours +
    //     ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
    // //console.log(secretMessage);
    //
    // var contentString =
    //     '<div id="content">' +
    //     '<div class="text">' +
    //     secretMessage.text +
    //     '</div>' +
    //     '<div class="Img">' +
    //     // '<img src="'+secretMessage.picture+'" width"20px" height"20px">'+
    //     // '</div>'+
    //     '<div class="details"' +
    //     '<p>' + formattedTime + '</p>' +
    //     '<p>' + '@' + secretMessage.user + '</p>' +
    //     '<p>' + secretMessage.location.country + '</p>';
    // var infowindow = new google.maps.InfoWindow({
    //     content: contentString
    // });
    // zoom to
    // marker.addListener('click', function() {
    //     map.setZoom(8);
    //     map.setCenter(marker.getPosition());
    // });

    marker.addListener('click', function () {
        // infowindow.open(marker.get('map'), marker);
        console.log(marker.id)
    });
    marker.addListener('mouseout', function () {
        // infowindow.close();
    });
}

function initialize() {

    get_all_tweets()
    setTimeout(() => {
        document.querySelector('div.amcharts-chart-div > a').style.display = 'none'
        var columns = document.querySelectorAll('g[visibility=visible]')
        console.log(columns.length)
        for (var item of columns)
            item.addEventListener("click", function () {
                var time = this.getAttribute('aria-label')
                console.log(time.split(' ')[1])

                get_tweets_by_country('Australia')

            }, false);

        console.log('READY')
    }, 7000);

}

function set_markers(results) {
    for (var item of results) {
        var coords = item.coordinates
        var latLng = new google.maps.LatLng(coords.latitude, coords.longitude)
        var marker = new google.maps.Marker({
            position: latLng,
            icon: greenDot,
            map: map,
            id: item._id
        });
        attachSecretMessage(marker, item)
        arrMarkers.push(marker)
    }
}

function removeMarkers() {
    for (var mark of arrMarkers)
        mark.setMap(null)

    arrMarkers = []
}

//------------------------------------------------ Slider Controller ------------------------------------------------//

var hours = [ "01 AM", "02 AM", "03 AM",
    "04 AM", "05 AM", "06 AM",
    "07 AM", "08 AM", "09 AM",
    "10 AM", "11 AM", "12 AM",
    "01 PM", "02 PM", "03 PM",
    "04 PM", "05 PM", "06 PM",
    "07 PM", "08 PM", "09 PM",
    "10 PM", "11 PM", "12 PM"
]


$(function () {
    $("#range").ionRangeSlider({
        //min: +moment().subtract(24, "hours").format("X"),
        //max: +moment().format("X"),
        //from: +moment().subtract(24, "hours").format("X"),
        //to: +moment().format("X"),
        type: 'double',
        grid: true,
        values: hours,
        prettify: function (num) {
            return moment(num, "X").format("hh A")
        },
        onStart: function (data) {

        },
        onChange: function (data) {

        },
        onFinish: function (data) {
            if(firstTime) {
                var from = cleanTime(data.from_value)
                var to = cleanTime(data.to_value)
                removeMarkers()
                set_markers(get_tweets_by_time(from, to))
            } else
                firstTime = true
        },
        onUpdate: function (data) {

        }
    })
})

//------------------------------------------------ Mlab Controller ------------------------------------------------//

function cleanTime(time) {
    if(time.includes('PM')) {
        var toTmp = parseInt(time.replace(/\D/g, ''))
        return toTmp + 12
    } else
        return time.replace(/\D/g, '').trim()
}

function get_all_tweets() {
    $.ajax({
        type: "GET",
        async: false,
        dataType: "json",
        url: 'https://gutenmorgen.herokuapp.com/tweets',
        success: function (tweets) {
            removeMarkers()
            allMarkers = tweets
            //set_markers(tweets)
        }
    });
}


function get_tweets_by_country(country) {
    $.ajax({
        type: "GET",
        async: false,
        dataType: "json",
        url: `https://gutenmorgen.herokuapp.com/tweets/country/${country}`,
        success: function (tweets) {
            removeMarkers()
            set_markers(tweets)
        }
    });
}

function get_tweets_by_time(from, to) {
    var timeTweets = allMarkers.filter(marker => {
        if(marker.time < to && marker.time > from - 1)
            return marker
    })
    return timeTweets
    // $.ajax({
    //     type: "GET",
    //     async: false,
    //     dataType: "json",
    //     url: `https://gutenmorgen.herokuapp.com/tweets/time/${from}/${to}`,
    //     success: function (tweets) {
    //         removeMarkers()
    //         set_markers(tweets)
    //     }
    // });
}

