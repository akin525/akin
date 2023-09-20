// Europe
$(function(){
	$('#mapEurope').vectorMap({
		map: 'europe_mill',
		zoomOnScroll: false,
		series: {
			regions: [{
				values: gdpData,
				scale: ['#17995e'],
				normalizeFunction: 'polynomial'
			}]
		},
		backgroundColor: 'transparent',
	});
});