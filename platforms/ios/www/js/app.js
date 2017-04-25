// Define application object and common functions.
var app = (function()
{
	// Application object.
	var app = {};

	app.tempMajor = 36764;
	app.tempMinor = 43617;
	app.prodId = 35135;

	// Application data.
	app.currentScreenId = null;
	app.beaconColorStyles = [
		'style-color-unknown style-color-unknown-text',        // BeaconColorUnknown
		'style-color-mint style-color-mint-text',              // BeaconColorMintCocktail
		'style-color-ice style-color-ice-text',                // BeaconColorIcyMarshmallow
		'style-color-blueberry-dark style-color-blueberry-dark-text', // BeaconColorBlueberryPie
		'style-color-unknown style-color-unknown-text',        // TODO: BeaconColorSweetBeetroot
		'style-color-unknown style-color-unknown-text',        // TODO: BeaconColorCandyFloss
		'style-color-unknown style-color-unknown-text',        // TODO: BeaconColorLemonTart
		'style-color-unknown style-color-unknown-text',        // TODO: BeaconColorVanillaJello
		'style-color-unknown style-color-unknown-text',        // TODO: BeaconColorLiquoriceSwirl
		'style-color-white style-color-white-text',            // BeaconColorWhite
		'style-color-transparent style-color-transparent-text' // BeaconColorTransparent
		];
	app.proximityNames = [
		'unknown',
		'immediate',
		'near',
		'far'];

	// ------------- Private helper function ------------- //

	function onDeviceReady()
	{
		// TODO: Add functionality if needed.
		console.log('onDeviceReady');






	}

	// ------------- Application functions ------------- //

	app.formatDistance = function(meters)
	{
		if (!meters) { return 'Unknown'; }

		if (meters > 1)
		{
			return meters.toFixed(3) + ' m';
		}
		else
		{
			return (meters * 100).toFixed(3) + ' cm';
		}
	};

	app.formatProximity = function(proximity)
	{
		if (!proximity) { return 'Unknown'; }

		// Eliminate bad values (just in case).
		proximity = Math.max(0, proximity);
		proximity = Math.min(3, proximity);

		// Return name for proximity.
		return app.proximityNames[proximity];
	};

	app.beaconColorStyle = function(color)
	{
		if (!color)
		{
			color = 0;
		}

		// Eliminate bad values (just in case).
		color = Math.max(0, color);
		color = Math.min(5, color);

		// Return style class for color.
		return app.beaconColorStyles[color];
	};

	app.showScreen = function(screenId)
	{
		// Hide current screen if set.
		if (app.currentScreenId != null)
		{
			$('#' + app.currentScreenId).hide();
		}

		// Show new screen.
		app.currentScreenId = screenId;
		$('#' + app.currentScreenId).show();
		document.body.scrollTop = 0;
	};

	app.showHomeScreen = function()
	{
		app.showScreen('id-screen-home');
	};

	app.callOrder = function()
	{



        var root = "http://54.201.93.57/yacceleratorstorefront/beacon-add?product="+app.prodId+"&user=brenna&site=apparel-uk";

        console.log("app prod id " + app.prodId);

        $.ajax({
            url: root,
            method: 'GET'
        }).then(function(data) {


        });


	};

    app.showOrderScreen = function()
    {
        app.showScreen('id-order-screen');
    };


    app.getHybrisInfo = function(majorIn, minorIn)
    {
        console.log("getting hybris infor");


        app.tempMajor = majorIn;
        app.tempMinor = minorIn;



       // var root = 'https://jsonplaceholder.typicode.com';
       //var root =  'https://demo6308596.mockable.io/beacon';
		//var root = "http://54.201.93.57/yacceleratorstorefront/beacon?major=1234&minor=5678&site=apparel-uk";

        var root = "http://54.201.93.57/yacceleratorstorefront/beacon?major="+majorIn+"&minor="+minorIn+"&site=apparel-uk";


		/*
        https://54.201.93.57/medias/?context=bWFzdGVyfGltYWdlc3wyMTc2fGltYWdlL2pwZWd8aW1hZ2VzL2hlYS9oNWUvODc5Njg4NTUxNjMxOC5qcGd8ZWRlMDU2ZTRmYzY2MGIzZDZmOTkwNTZjYWNhMzJiNzFlNWNhYTZjOTI1MWVlYzBhMjFlYTVlODIyMWY4NzhlNQ
		*/


        $.ajax({
            url: root,
			method: 'GET'
        }).then(function(data) {


            //app.prodId = data.product;

        	console.log(data);
            //alert("data ia " + data.id);

			console.log("the shoes lenfth is " + data.shoes.length);

            $("#orderSelect").empty();


            console.log("prod is " + data.product);


            $("#id-order-screen-back-title").html(data.product);


            console.log("data" + data.shoes);

            for (var key in data.shoes) {
                if (data.shoes.hasOwnProperty(key)) {
                    console.log(key + " -> " + data.shoes[key]);


                    $('#orderSelect').append('<option val="+key+">'+data.shoes[key]+'</option>');


                    app.prodId = key;

                }
            }

/*
            for(var i = 0; i < data.shoes.length; i++) {

            	console.log("ss" + data.shoes[i]);

                $('#orderSelect').append('<option val="+i+">'+data.shoes[i]+'</option>');
            }
*/


            var tempImg = "http://54.201.93.57" + data.image;

            $("#shoeImg").attr("src",tempImg);

            console.log("image is " + tempImg);

            //var option = $('<option></option>').attr("value", "option value").text("Text");


            //$('#orderSelect').append('<option val="1">'+data.title+'</option>');



            app.showOrderScreen();


        });

    };


	app.onNavigateBack = function()
	{
		history.back();
	};

	// ------------- Initialisation ------------- //

	document.addEventListener('deviceready', onDeviceReady, false);

	app.showHomeScreen();

	// ------------- Return application object ------------- //

	return app;

})();
