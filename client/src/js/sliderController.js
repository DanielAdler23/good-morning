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
            // console.log(data.from)
        },
        onChange: function (data) {
            var from
            var to
            if(data.from_value.includes('PM')) {
                var fromTmp = parseInt(data.from_value.replace(/\D/g, ''))
                from = fromTmp + 12
            } else
                from = data.from_value.replace(/\D/g, '').trim()


            if(data.to_value.includes('PM')) {
                var toTmp = parseInt(data.to_value.replace(/\D/g, ''))
                to = toTmp + 12
            } else
                to = data.to_value.replace(/\D/g, '').trim()

            // console.log(`FROM: ${from}`)
            // console.log(`TO: ${to}`)
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
        },
        onFinish: function (data) {
            // console.log(data)
        },
        onUpdate: function (data) {
            // console.log(data)
        }
    })
})

