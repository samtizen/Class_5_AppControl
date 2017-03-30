(function(tau) {
	var page = $("#page-indicator-page"),
		changer = $("#hsectionchanger" ),
		elPageIndicator = $("#pageIndicator"),
		pageIndicator,
		pageIndicatorHandler;
	
	/**
	 * pageshow event handler
	 * Do preparatory works and adds event listeners
	 */
	page.on("pageshow", function() {
		pageIndicator =  tau.widget.PageIndicator(elPageIndicator[0]);
		pageIndicator.setActive(0);
		setActivePageHeader(0);
		
		window.tau["pageIndicator"] = pageIndicator;
	});
	

	/**
	 * sectionchange event handler
	 */
	pageIndicatorHandler = function (e) {
		
		console.log("changed");
		
		if (e.originalEvent) {
		
			pageIndicator.setActive(e.originalEvent.detail.active);
			setActivePageHeader(e.originalEvent.detail.active);
		}

	};
	changer.on("sectionchange", pageIndicatorHandler);
	

}(window.tau));

function setActivePageHeader(pageIndx) {
	
	var headerTitle = "";
	
	console.log(pageIndx);
	
	switch(pageIndx) {
	case 0: 
		headerTitle = "App Info";
		
		break;
	case 1: 
		headerTitle = "Implicit Launch";
		
		break;
	case 2:
		headerTitle = "Explicit Launch";

		break;
	case 3:
		headerTitle = "Data Exchange";

		break;
	}
	
	$("#page-header-title").text(headerTitle);
}
