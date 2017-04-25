// Range beacons screen.
;(function(app)
{
    //alert("pause !!!!!");

    app.startRangingHybris = function()
    {
        function onRange(beaconInfo)
        {
            displayBeconInfo(beaconInfo);
        }

        function onError(errorMessage)
        {
            console.log('Range error: ' + errorMessage);
        }

        function displayBeconInfo(beaconInfo)
        {
            // Clear beacon HTML items.
            $('#id-screen-scan-hybris .style-item-list').empty();

            // Sort beacons by distance.
            beaconInfo.beacons.sort(function(beacon1, beacon2) {
                return beacon1.distance > beacon2.distance; });

            // Generate HTML for beacons.
            $.each(beaconInfo.beacons, function(key, beacon)
            {
                var element = $(createBeaconHTML(beacon));
                $('#id-screen-scan-hybris .style-item-list').append(element);
            });
        };

        function createBeaconHTML(beacon)
        {

            var colorClasses = app.beaconColorStyle(beacon.color);
            var htm = '<div class="' + colorClasses + '">'
                + '<table><tr><td>Major</td><td>' + beacon.major
                + '</td></tr><tr><td>Minor</td><td>' + beacon.minor
                + '</td></tr><tr><td>RSSI</td><td>' + beacon.rssi
            if (beacon.proximity)
            {
                htm += '</td></tr><tr><td>Proximity</td><td>'
                    + app.formatProximity(beacon.proximity)
            }
            if (beacon.distance)
            {
                htm += '</td></tr><tr><td>Distance</td><td>'
                    + app.formatDistance(beacon.distance);

                if(beacon.distance < .25)
                {
                    //console.log("****** the beacon distance is " + beacon.distance);
                    //console.log("beacon is pretty close do something");
                    //alert("you are super close");



                    app.getHybrisInfo(beacon.major,beacon.minor);



                    estimote.beacons.stopRangingBeaconsInRegion({});
                    estimote.beacons.stopEstimoteBeaconDiscovery();
                    //app.showOrderScreen();
                }



            }
            htm += '</td></tr></table></div>';





            return htm;
        };

        // Show screen.
        app.showScreen('id-screen-scan-hybris');
        $('#id-screen-scan-hybris .style-item-list').empty();

        // Request authorisation.
        estimote.beacons.requestAlwaysAuthorization();

        // Start ranging.
        estimote.beacons.startRangingBeaconsInRegion(
            {}, // Empty region matches all beacons.
            onRange,
            onError);
    };

    app.stopRangingBeacons = function()
    {
        estimote.beacons.stopRangingBeaconsInRegion({});
        app.showHomeScreen();
    };

})(app);
