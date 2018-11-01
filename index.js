const DES = {
    config: {},
    map: {
        index: 0,
        state: "",
        canvas: {},
        line: {}
    },
    setup: {
        map() {
            DES.map.canvas = new google.maps.Map(document.getElementById('js-map-canvas'), {
              zoom: 3,
              center: {lat: 0, lng: -180},
              mapTypeId: 'terrain'
            });

            DES.line = new google.maps.Polyline({
                  strokeColor: '#000000',
                  strokeOpacity: 1.0,
                  strokeWeight: 3
                });
            DES.line.setMap(DES.map.canvas);

            DES.map.canvas.addListener('click', function(event) {
                let path = DES.line.getPath();

                path.push(event.latLng);

                var marker = new google.maps.Marker({
                    position: event.latLng,
                    title: '#' + path.getLength(),
                    map: DES.map.canvas
                });
            });
        },
        map_buttons() {

        }
    }
}

$(document).ready(function() {

    $.getJSON("config.json")
    .then(function(data) {
        DES.config = data;

        let path = "";
        if (DES.config.google.use_key) {
            path = `http://maps.google.com/maps/api/js?key=${DES.config.google.api_key}&callback=initMap`;
        } else {
            path = `http://maps.google.com/maps/api/js?callback=initMap`;
        }

        return $.getScript(path);
    })
    .done(function() {

    })
    .fail(function (jqxhr, settings, ex) {
        //alert("Could not load Google Map script: " + jqxhr);
    });


    $("#distribution").change(function(){
       $(this).find("option:selected").each(function(){
           if($(this).attr("id")=="poissonSelect"){
               $(".DistInput").not(".poissonSelect").hide();
               $(".poissonSelect").show();
           }
           else if($(this).attr("id")=="uniformSelect"){
               $(".DistInput").not(".uniformSelect").hide();
               $(".uniformSelect").show();
           }
           else if($(this).attr("id")=="binomialSelect"){
               $(".DistInput").not(".binomialSelect").hide();
               $(".binomialSelect").show();
           }
           else if($(this).attr("id")=="normalSelect"){
               $(".DistInput").not(".normalSelect").hide();
               $(".normalSelect").show();
           }

           else{
               $(".DistInput").hide();
           }
       });
   }).change();

});

function initMap(params) {
    DES.setup.map();
}
