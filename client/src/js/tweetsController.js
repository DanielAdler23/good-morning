module.exports = {
    get_all_tweets,
    get_tweets_by_country,
    get_tweets_by_time
}

function get_all_tweets() {
    $.ajax({
        type: "GET",
        async: false,
        dataType: "json",
        url: 'https://gutenmorgen.herokuapp.com/tweets',
        success: function (tweets) {
            return tweets
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
            return tweets
            //removeMarkers()
            //set_markers(data)
        }
    });
}

function get_tweets_by_time(from, to) {
    $.ajax({
        type: "GET",
        async: false,
        dataType: "json",
        url: `https://gutenmorgen.herokuapp.com/tweets/time/${from}/${to}`,
        success: function (tweets) {
            return tweets
            // removeMarkers()
            // set_markers(data)
        }
    });
}
