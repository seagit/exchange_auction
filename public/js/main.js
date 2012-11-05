$(document).ready(function(){
	$('#loginForm').modal();

	/*$('.logout-trigger').click( function(){
			$.ajax({
    					url: '/login',
    					type: 'DELETE',
    					success: function(result) {
        					alert(123);	
        				}
});
	});*/

	$("#ex-prod").carouFredSel({
		items: {
			visible: 6,
			width: 156,
			height: 150
		},
		scroll: 1,
		auto: false,
		prev: {
			button: "#prev-carousel",
			key: "left"
		},
		next: {
			button: "#next-carousel",
			key: "right"
		},
		pagination: "#pagin-cont"
	});
});
