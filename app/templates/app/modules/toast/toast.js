define(['jquery'], function($){
    
	var toast = {
    /* Interval for Toaster Dots */    
	var dotInterval;
    /* Default text for Toaster */    
	var toastText;

	toast.toaster = {
		/*
         * Add dots to Toaster
         */
        addDots : function (){
            var t = $('#toast-text').text();
            if (t.length > 25){
                t = toastText;
            }
            t = t + '.';
            $('#toast-text').text(t);
        },
        /*
         * Start Toaster dots
         */
        start : function (text){
        	toastText = text;
            $('#toaster').show();
            dotInterval = setInterval(toast.toaster.addDots, 750);
            toast.toaster.addDots();
        },
        /*
         * Stop Toaster dots
         */
        stop : function(){
            $('#toaster').hide();
            clearInterval(dotInterval);
        },
	};

	return toast;
});
      

