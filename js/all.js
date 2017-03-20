$(function () {
    $('.btn').on('click', function (event) {
            event.preventDefault();
            var areaSearch = $('#area').val()
            $.ajax({
                    url: 'data.json',
                    dataType: 'json',
                    success: function (data) {

                        var map;
                        infowindow = new google.maps.InfoWindow();
                        marker = [];

                        for (var i in data.retVal) {
                            if (areaSearch == data.retVal[i].sarea) {
                                var latlng = new google.maps.LatLng(data.retVal[i].lat, data.retVal[i].lng);
                                var myOptions = {
                                    zoom: 13,
                                    center: latlng
                                };

                            } else if (areaSearch == "all") {
                                var latlng = new google.maps.LatLng(data.retVal[i].lat, data.retVal[i].lng);
                                var myOptions = {
                                    zoom: 11,
                                    center: latlng
                                };

                            } //end if
                        } // end for

                        map = new google.maps.Map($('#map')[0], myOptions);

                        for (var i in data.retVal) {
                             area = data.retVal[i].sarea;
                             sname = data.retVal[i].sna;
                             saddress = data.retVal[i].ar;
                             spark = data.retVal[i].tot;

                            if (areaSearch == data.retVal[i].sarea) {
                                marker[i] = new google.maps.Marker({
                                    position: new google.maps.LatLng(data.retVal[i].lat, data.retVal[i].lng),
                                    map: map,
                                    animation: google.maps.Animation.DROP,
                                    title: sname,
                                    area,
                                    sname,
                                    saddress,
                                    spark
                                });
                                google.maps.event.addListener(marker[i], 'click', function () {
                                    showInfo(map, this);
                                });
                            } else if (areaSearch == "all") {
                                marker[i] = new google.maps.Marker({
                                    position: new google.maps.LatLng(data.retVal[i].lat, data.retVal[i].lng),
                                    map: map,
                                    animation: google.maps.Animation.DROP,
                                    title: sname,
                                    area,
                                    sname,
                                    saddress,
                                    spark
                                });

                                google.maps.event.addListener(marker[i], 'click', function () {
                                    showInfo(map, this);
                                });
                            };
                            
                            showInfo = function (mapObj, markerObj) { // Open infowindow function
                                infowindow.setContent(infoContent(markerObj));
                                infowindow.open(mapObj, markerObj);
                            } //end showInfo
                            
                            var infoContent = function (markerObj) {
                                 html = '<ul><li ><h1 style="font-size:1.2em; font-weight: bold;margin-bottom: 5px;"> ' + markerObj.sname + '</h1></li>';
                                 html += '<li>區域: '+ markerObj.area +'</li>';
                                 html += '<li >場站地址: ' + markerObj.saddress + '</li>';
                                 html += '<li >總停車格: ' + markerObj.spark +  '</li></ul>';
                                 return html;

                        } //end infoContent
                    } // end for

                } //end success
            }); //ajax end
    }); // end on
}); //end function