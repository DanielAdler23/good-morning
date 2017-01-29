var url = 'https://www.googleapis.com/fusiontables/v1/query?sql=SELECT%20name%2C%20kml_4326%20FROM%201foc3xO9DyfSIF6ofvN0kp2bxSfSeKog5FbdWdQ&callback=drawMap&key=AIzaSyAm9yWCV7JPCTHCJut8whOjARd7pwROFDQ'
var iconBase = 'https://maps.google.com/mapfiles/kml/shapes/'
var blueDot = './img/blueDot.png'
var greenDot = './img/greenDot.png'
var map
var arrMarkers = []
var firstTime = false
var prevBubble = false
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
        var script = document.createElement('script');
        script.src = url
        var body = document.getElementsByTagName('body')[0];
        body.appendChild(script);
        set_markers(allMarkers)
    }, 8000)
}


function as(a){
    var temp=[];
    var array;
    for(p of a) {
        for(plase of p){

            // console.log(plase)
            array = {
                "x": plase[0],
                "y": plase[1]
            }
            temp.push(array);
        }
    }
    return temp;
}




function drawMap(data) {
    var rows = data['rows'];
    for (var i in rows) {
        var name = [];
        name.push(rows[i][0]);
        if (rows[i][0] != 'Antarctica') {
            var newCoordinates = [];
            var cordinates;
            var poly=[];
            var geometries = rows[i][1]['geometries'];
            if (geometries) {
                for (var j in geometries) {
                    poly.push(as(geometries[j].coordinates))
                    newCoordinates.push(constructNewCoordinates(geometries[j]));
                }
            } else {
                newCoordinates = constructNewCoordinates(rows[i][1]['geometry']);
                cordinates= rows[i][1]['geometry'].coordinates;
                poly.push(as(cordinates));
            }
            var center;
            if(poly.length==1){
                for(a of poly){
                    region = new Region(a);
                    center = region.centroid();
                }
            }else{
                var temp=[];
                for(b of poly){
                    region = new Region(b);
                    temp.push(region.centroid());
                }
                if(temp.length>2){
                    region = new Region(temp);
                    center = region.centroid();

                }else{
                    center = {
                        x:(temp[0].x+temp[1].x)/2,
                        y:(temp[0].y+temp[1].y)/2
                    }
                }
            }

            var country = new google.maps.Polygon({
                paths: newCoordinates,
                strokeColor: '#42ace3',
                strokeOpacity: 1,
                strokeWeight: 1,
                fillOpacity: 0,
                ID:name[0],
                center:center
            });

            google.maps.event.addListener(country, 'dblclick', function() {
                console.log(this)
                this.setOptions({fillOpacity: 0.7, fillColor:"#D0FF6C"});
                map.setOptions({disableDoubleClickZoom: true });
                map.setCenter (new google.maps.LatLng(this.center.y, this.center.x),1);
                var popularWords =[]
                popularWords.push(get_tweets_by_country(this.ID.toLowerCase()));
                console.log(popularWords);
            });

            country.setMap(map);
        }
    }
}

function Point(x, y) {
    this.x = x;
    this.y = y;
}

function Region(points) {
    this.points = points || [];
    this.length = points.length;
}

Region.prototype.area = function () {
    var area = 0,
        i,
        j,
        point1,
        point2;

    for (i = 0, j = this.length - 1; i < this.length; j=i,i++) {
        point1 = this.points[i];
        point2 = this.points[j];
        area += point1.x * point2.y;
        area -= point1.y * point2.x;
    }
    area /= 2;

    return area;
};

Region.prototype.centroid = function () {
    var x = 0,
        y = 0,
        i,
        j,
        f,
        point1,
        point2;

    for (i = 0, j = this.length - 1; i < this.length; j=i,i++) {
        point1 = this.points[i];
        point2 = this.points[j];
        f = point1.x * point2.y - point2.x * point1.y;
        x += (point1.x + point2.x) * f;
        y += (point1.y + point2.y) * f;
    }

    f = this.area() * 6;

    return new Point(x / f, y / f);
};


function constructNewCoordinates(polygon) {
    var newCoordinates = [];
    var coordinates = polygon['coordinates'][0];
    for (var i in coordinates) {
        newCoordinates.push(
            new google.maps.LatLng(coordinates[i][1], coordinates[i][0]));
    }
    return newCoordinates;
}

function set_markers(results) {

    for (var item of results) {
        var coords = item.coordinates
        var latLng = new google.maps.LatLng(coords.latitude, coords.longitude)
        var marker = new google.maps.Marker({
            position: latLng,
            icon: (item.color == 0) ? blueDot : greenDot,
            map: map,
            id: item._id
        });
        markerBubble(marker, item)
        arrMarkers.push(marker)
    }
}

function removeMarkers() {
    for (var mark of arrMarkers)
        mark.setMap(null)

    arrMarkers = []
}

function markerBubble(marker) {
    marker.addListener('click', function () {
        if(prevBubble)
            prevBubble.close()

        var tweetContent = get_tweet_content(marker.id)

        var contentString = '<div id="content">'+
            '<img id="tweetUserPicture" src="' + tweetContent.picture +'">'+
            '<h1 id="firstHeading" class="firstHeading">' + '@' + tweetContent.user + '</h1>'+
            '<div id="bodyContent">'+
            '<p>' + tweetContent.text + '</p>'+
            '</div>'+
            '</div>';

        var infowindow = new google.maps.InfoWindow({
            content: contentString,
            maxWidth: 250
        });

        prevBubble = infowindow

        infowindow.open(map, marker);
    });
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

function cleanTime(time) {
    if(time.includes('PM')) {
        var toTmp = parseInt(time.replace(/\D/g, ''))
        return toTmp + 12
    } else
        return time.replace(/\D/g, '').trim()
}

//------------------------------------------------ Mlab Controller ------------------------------------------------//



function get_all_tweets() {
    $.ajax({
        type: "GET",
        async: false,
        dataType: "json",
        url: 'https://gutenmorgen.herokuapp.com/tweets',
        success: function (tweets) {
            removeMarkers()
            for(var tweet of tweets)
                tweet.color = 0
            allMarkers = tweets
            //set_markers(tweets)
        }
    });
}


function get_tweets_by_country(country) {
    var popular;
    $.ajax({
        type: "GET",
        async: false,
        dataType: "json",
        url: `https://gutenmorgen.herokuapp.com/tweets/country/${country}`,
        success: function (tweets) {
            popular = tweets
            // removeMarkers()
            // set_markers(tweets)
        }
    });
    return popular;
}

function get_tweet_content(id) {
    var tweet
    $.ajax({
        type: "GET",
        async: false,
        dataType: "json",
        url: `https://gutenmorgen.herokuapp.com/tweets/${id}/content`,
        success: function (data) {
            tweet = data[0]
        }
    });
    return tweet
}

function get_tweets_by_time(from, to) {
    var timeTweets = allMarkers.map(marker => {
        if(marker.time < to && marker.time > from - 1)
            marker.color = 1
        else
            marker.color = 0

        return marker
    })
    return timeTweets
}

