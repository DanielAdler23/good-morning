
 $.ajax({
    type: "GET",
    async: false,
    dataType:"json",
    url: "https://good0morning.herokuapp.com/tweets",
    success: function(data){
        eqfeed_callback(data)
    }
});