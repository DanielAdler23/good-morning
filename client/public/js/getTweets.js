
 $.ajax({
    type: "GET",
    async: false,
    dataType:"json",
    url: "http://localhost:3000/tweets",
    success: function(data){
        eqfeed_callback(data)
    }
});