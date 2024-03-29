var PLEASE_WAIT_TEXT = "Please Wait";

function confirmFlyConfirmedDiscountStartover(){
	showPageInPopup("","/WEB-INF/jsps/popup/confirmStartOverPopup.jsp", "400", "150");
}

function startOverPopup(startOverURL){
	document.forms[0].action = startOverURL;
	document.forms[0].submit();
}

function cancelPassengersFromListingSelectionPopup() {
	showLoadingSplash(PLEASE_WAIT_TEXT); //aay 20150817 - QC 2751
	document.forms[0].action = "cancelPassengersFromListingSelection.action";
	document.forms[0].submit();
	hideLayeredPopup();
}

function changeReservation(){
	var isMerged = document.getElementById("isMerged");
	if(isMerged != null && isMerged.value){ //aay 20170411 - Infant ET
		alert("To Change This Listing, Call Reservations.");
	}else{
		var stringUrl = "/WEB-INF/jsps/popup/changeReservationPopup.jsp";
		showPageInPopup("",stringUrl,"600","300");
	}
}

function changeFlyDiscountReservation(){
	var isMerged = document.getElementById("isMerged");
	if(isMerged != null && isMerged.value){ //aay 20170411 - Infant ET
		alert("To Change This Listing, Call Reservations.");
	}else{
		showLoadingSplash(PLEASE_WAIT_TEXT); //aay 20150817 - QC 2751
		hideLayeredPopup();
		location.href = "reissueEligibility.action";
	}
}

function cancelReservationFlyConfirmedDiscountProgram(){
	var stringUrl = "/WEB-INF/jsps/popup/cancelReservationPopup.jsp";
	showPageInPopup("",stringUrl,"500","250");
}

//rqb 20140108 - dwr that calls an action class does not work in struts2
function showFlightInfoPopupPhase3(departureAirport, arrivalAirport, flightNumber, departureMonth, departureDate,
	depDate, carrierName, isCodeShare, isConnectionCarrier){
	var stringUrl = "/WEB-INF/jsps/popup/flightInformationPopup.jsp?departureAirport="+departureAirport+"&arrivalAirport="+arrivalAirport+"&flightNumber="+flightNumber
	+"&departureDay="+departureMonth+"&departureDate="+departureDate+"&carrierName="+carrierName+"&isCodeShare="+isCodeShare+"&isConnectionCarrier="+isConnectionCarrier;
	
	showInLayeredPopup(PLEASE_WAIT_TEXT,"800", null, "200", "100"); //aay 20150817 - QC 2751
	Popup.getFlightInformation(stringUrl, function(data) {
    	dwr.util.setValue("forward", data, { escapeHtml:false });
	    checkForTimeout("forward");
	    emptyPopupSplash();
    	showLayeredPopup();
	});			
}

function flyConfirmedDiscountProgramShowLearnMore() {
	var stringUrl = "/WEB-INF/jsps/flyconfirmedforless/flyConfirmedLearnMorePopup.jsp";
	showPageInPopup("",stringUrl,"500","180");
}

function tsaSecureLearnMoreLayeredPopup() {
	//rqb 20140107 - dwr that calls an action class doesn't work in struts2
	//var stringUrl = "/tsaSecureLearnMorePopup.do";
	var stringUrl = "/WEB-INF/jsps/popup/tsaSecureLearnMorePopup.jsp";
	showPageInPopup("",stringUrl,"500","210");
}

function showCalcFlightLoadInPopup(listId,source,activeMenu,carrier,layeredPopupDiv,popupSplashDiv,forwardDiv){
	//var forwardURL = "/showFlightLoadPopup.do?temp=temp&listId="+listId+"&" +
	//"source="+source+"&activeMenuForStandbyList="+activeMenu+"&carrierCode="+carrier;
	//showPageInPopup2("Please wait while the Standby List is loading", "745", null,"50", null, layeredPopupDiv, popupSplashDiv);
	//forward2(forwardURL,showStandbyList, 'nonrevPage',layeredPopupDiv,popupSplashDiv,forwardDiv);
	var forwardUrl = "/WEB-INF/jsps/popup/waitList.jsp?listId="+listId+"&" +
	      "source="+source+"&activeMenuForStandbyList="+activeMenu;
	showPageInPopup2(PLEASE_WAIT_TEXT, "745", null,"50", null, layeredPopupDiv, popupSplashDiv); //aay 20150817 - QC 2751
	Popup.showFlightLoad(forwardUrl, function(data) {
    	dwr.util.setValue(forwardDiv, data, { escapeHtml:false });
    	checkForTimeout(forwardDiv);
    	emptyPopupSplash(popupSplashDiv);
    	showLayeredPopup(null,layeredPopupDiv);
    	showStandbyList('nonrevPage');
  		}
  	);
}

function showFlightLoadInPopup(listId,source,activeMenu,carrier){
	//var forwardURL = "/showFlightLoadPopup.do?temp=temp&listId="+listId+"&" +
	var forwardUrl = "/WEB-INF/jsps/popup/waitList.jsp?listId="+listId+"&" +
	      "source="+source+"&activeMenuForStandbyList="+activeMenu;
	showPageInPopup2(PLEASE_WAIT_TEXT, "745", null,"250"); //aay 20150817 - QC 2751
	Popup.showFlightLoad(forwardUrl, function(data) {
    	dwr.util.setValue("forward", data, { escapeHtml:false });
    	checkForTimeout("forward");
    	emptyPopupSplash("");
    	showLayeredPopup(null,"");
    	showStandbyList('nonrevPage');
  		}
  	);
}

function showFlightLoadInPopup2(search,listId,source,activeMenu){
	//nmm 20140124 - dwr that calls an action class doesn't work in struts2
	//var forwardURL = "/showFlightLoadPopup.do?temp=temp&listId="+listId+"&" +
	//"source="+source+"&activeMenuForStandbyList="+activeMenu+"&search="+search;
	var forwardUrl = "/WEB-INF/jsps/popup/waitList.jsp?listId="+listId+"&" +
	      "source="+source+"&activeMenuForStandbyList="+activeMenu+"&search="+search;
	showPageInPopup2(PLEASE_WAIT_TEXT, "745", null,"250", "350"); //aay 20150817 - QC 2751
	Popup.showFlightLoad(forwardUrl, function(data) {
    	dwr.util.setValue("forward", data, { escapeHtml:false });
    	checkForTimeout("forward");
    	emptyPopupSplash("");
    	showLayeredPopup(null,"");
    	showStandbyList('nonrevPage');
  		}
  	);				
	
	//forward2(forwardURL, showStandbyList,'nonrevPage');
}

// used in Check my Chances
function showFlightLoadInPopup3(flightNum,origin,destination,date,probabilityCode, source){
	var forwardUrl = "/WEB-INF/jsps/popup/waitList.jsp?flightNum="+flightNum+"&origin="+origin
	+"&destination="+destination+"&date="+date+"&probabilityCode="+probabilityCode+"&source="+source;
	showPageInPopup2(PLEASE_WAIT_TEXT, "745", null,"250", "350"); //aay 20150817 - QC 2751
	Popup.showFlightLoad2(forwardUrl, function(data) {
    	dwr.util.setValue("forward", data, { escapeHtml:false });
    	checkForTimeout("forward");
    	emptyPopupSplash("");
    	showLayeredPopup(null,"");
    	showStandbyList('airportPage');
  		}
  	);				
}

function refreshWaitListPopup(page){
//	var loadMessage = "Please wait while " + page + " Standby List " + "reloads.";
	var loadMessage = PLEASE_WAIT_TEXT; //aay 20150817 - QC 2751
	
	var loadSplash = document.getElementById("waitlistLoadingSplash");
	var innerText = "<br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>";
	innerText += "<span class=\"waitlistSplashText\">";
	if (loadMessage != null && loadMessage != "") {
		innerText += loadMessage;
	} else {
		innerText += PLEASE_WAIT_TEXT; //aay 20150817 - QC 2751
	}
	innerText += "</span>";
	loadSplash.innerHTML = innerText;
	document.getElementById("topAnchor").focus();
	
	var forwardBuddyYieldInnerHtml = ''; 
	var forwardBuddyYield = document.getElementById("forwardBuddyYield");
	
	if(forwardBuddyYield != null){
		forwardBuddyYieldInnerHtml = forwardBuddyYield.innerHTML;
	}
	
	var popLayer = '';
	
	if(forwardBuddyYieldInnerHtml == null || forwardBuddyYieldInnerHtml == ''){
		popLayer = document.getElementById("layeredPopup");
	}else{
		popLayer = document.getElementById("layeredBuddyYieldFareQuotePopup");
	}

	loadSplash.style.height = popLayer.offsetHeight;
	loadSplash.style.visibility = "visible";
	
	var search = document.forms[0].search.value;
	var activeMenuForStandbyList = document.forms[0].activeMenuForStandbyList.value;
	var listId = document.forms[0].listId.value;
	var source = document.forms[0].source.value;
	var flightNumberPopup = document.forms[0].flightNumberPopup.value;
	var standByPagePopup = document.forms[0].standByPagePopup.value;
	var chancesFlightNumber = document.forms[0].chancesFlightNumber.value;
	var origin = document.forms[0].origin.value;
	var destination = document.forms[0].destination.value;
	var startDate = document.forms[0].startDate.value;
	
	
	//var forwardURL = "/showFlightLoadPopup.do?temp=temp&listId="+listId+"&" +
	//"source="+source+"&activeMenuForStandbyList="+activeMenuForStandbyList+"&search="+search+"&flightNumberPopup="+flightNumberPopup+"&standByPagePopup="+standByPagePopup;
	var forwardURL = "/WEB-INF/jsps/popup/waitList.jsp?listId="+listId+"&" +
	"source="+source+"&activeMenuForStandbyList="+activeMenuForStandbyList+"&search="+search+"&flightNumberPopup="+flightNumberPopup+"&standByPagePopup="+standByPagePopup;
	
	if(source == 'checkMyChances'){
		forwardURL = "/WEB-INF/jsps/popup/waitList.jsp?flightNum="+chancesFlightNumber+"&origin="+origin
		+"&destination="+destination+"&date="+startDate+"&probabilityCode="+"&source="+source;
	}
	
	//if(forwardBuddyYieldInnerHtml == null || forwardBuddyYieldInnerHtml == ''){
	//forward2(forwardURL, showStandbyList, standByPagePopup);
	//}else{
	//	forward2(forwardURL, showStandbyList, standByPagePopup, 'layeredBuddyYieldFareQuotePopup', 'buddyYieldFareQuotePopupSplash', 'forwardBuddyYield');
	//}
	
	if(source == 'checkMyChances'){
		Popup.showFlightLoad2(forwardURL, function(data) {
    		dwr.util.setValue("forward", data, { escapeHtml:false });
    		checkForTimeout("forward");
    		emptyPopupSplash("");
    		showLayeredPopup(null,"");
    		showStandbyList(standByPagePopup);
  			}
		);
	}else if(forwardBuddyYieldInnerHtml == null || forwardBuddyYieldInnerHtml == ''){
			Popup.showFlightLoad(forwardURL, function(data) {
    		dwr.util.setValue("forward", data, { escapeHtml:false });
    		checkForTimeout("forward");
    		emptyPopupSplash("");
    		showLayeredPopup(null,"");
    		showStandbyList(standByPagePopup);
  			}
  		);				
	}else{
			Popup.showFlightLoad(forwardURL, function(data) {
    		dwr.util.setValue("forwardBuddyYield", data, { escapeHtml:false });
    		checkForTimeout("forwardBuddyYield");
    		emptyPopupSplash("buddyYieldFareQuotePopupSplash");
    		showLayeredPopup(null,"layeredBuddyYieldFareQuotePopup");
    		showStandbyList(standByPagePopup);
  			}
  		);
	}
}

function showPageInPopup2(loadingMessage, pageWidth, pageHeight, pageTop, pageLeft, layeredPopupDiv, popupSplashDiv){
	showPopupSplash(loadingMessage, popupSplashDiv);
	if(layeredPopupDiv == null){
		layeredPopupDiv = "layeredPopup";
	}
	popLayer = document.getElementById(layeredPopupDiv);
	
	if( popLayer != null && pageWidth != null ){
		popLayer.style.width = parseInt(pageWidth) + 'px';
	}
	if( popLayer != null && pageHeight != null ){
		popLayer.style.height = parseInt(pageHeight) + 'px';
	}
	//mia 20100826 fix for centering popups start
	if( popLayer != null && pageTop != null ){
		popLayer.style.top = parseInt(pageTop) + 'px';
	} else if( popLayer != null && pageHeight != null ){
		popLayer.style.top = ( parseInt(screen.height)/2 - parseInt(pageHeight) / 2 ) + 'px';
	}
	if( popLayer != null && pageLeft != null ){
		popLayer.style.left = parseInt(pageLeft) + 'px';
	} else if( popLayer != null && pageWidth != null){
		popLayer.style.left = ( parseInt(screen.width)/2 - parseInt(pageWidth) / 2 ) + 'px';
	}
	//mia 20100826 fix for centering popups end
}

function forward2(forwardURL,script, scriptVar, layeredPopupDiv, popupSplashDiv, forwardDiv) {
	if(forwardDiv == null){
		forwardDiv = "forward";
	}
  Popup.getInclude(forwardURL, function(data) {
    dwr.util.setValue(forwardDiv, data, { escapeHtml:false });
    checkForTimeout(forwardDiv);
    emptyPopupSplash(popupSplashDiv);
    showLayeredPopup(null,layeredPopupDiv);
    if(script != null && script != ' '){
    	if(scriptVar != null && scriptVar != ' '){
    		script(scriptVar);	
    	} else {
    		script();
    	}
    }
  });
}

function showRefundableNonrefundableFares(){
	var stringUrl = "/WEB-INF/jsps/popup/refundableNonrefundableFaresPopup.jsp";
	showPageInPopup("",stringUrl,"500","300");
}

function activateAccountPopup() {
	var selId = getRadioChecked(document.forms[0].relevantYear);
	if (selId != null && selId != "") {
		if (selId == 'N') {
			document.forms[0].relevantYear.value = 'N';
			document.forms[0].activate.value = 'success';
		} else {
			document.forms[0].relevantYear.value = 'C';
			document.forms[0].activate.value = 'success';
		}
	} else {
		document.forms[0].relevantYear.value = 'C';
		document.forms[0].activate.value = 'success';
	}
	document.forms[0].action = "myAccountActivationFeeProcess.action";
	document.forms[0].submit();
	hideLayeredPopup();
}

function activateLaterPopup() {
	document.forms[0].action = "nonRevenueSearch.action";
	document.forms[0].submit();
	hideLayeredPopup();
}

//this is the activation fee reminder
function showPaymentPopup() {
	//rqb 20131226 - Struts2 - dwr that calls an action class doesn't work in struts2
	//var stringUrl = "/processAcceptTermsPopup.do";
	var stringUrl = "/WEB-INF/jsps/popup/activationFeePagePopup.jsp";
	showPageInPopup("",stringUrl,"600","275");
}

function showFareRulesPopup(flyConfirmed) {
	var stringUrl = "/WEB-INF/jsps/popup/fareRulesPopup.jsp?flyConfirmed=" + flyConfirmed;
	//showPageInPopup("",stringUrl,"700","600");
	showInLayeredPopup("", "800", null, "200", "100");
	Popup.getFareRules(stringUrl, function(data) {
    	dwr.util.setValue("forward", data, { escapeHtml:false });
	    checkForTimeout("forward");
	    emptyPopupSplash();
    	showLayeredPopup();
	});
}

function showExpandedAirportHelp(inTarget, event, airportList){
	airportTarget = document.getElementById(inTarget);
	popLayer = document.getElementById("layeredAirportListPopup");
	
	if (airportList != null){
		if(airportList == ""){
			return false;
		}
		Locations.init({AirportList:airportList, TargetElement:get('Dynamic'), selectSize:6});
	}
	
	if( popLayer != null ){
		popLayer.style.width = 320 + 'px';
	}
	if( popLayer != null ){
		popLayer.style.height = 270 + 'px';
	}
	
	popLayer.style.top = event.clientY + 'px';
	popLayer.style.left = event.clientX + 'px';
	//popLayer.style.top = 200 + 'px';
	//popLayer.style.left = 100 + 'px';

	var popupSplash = document.getElementById("popupSplash");
	hideAllSelectElement();
	document.getElementById("topAnchor").focus();
	popupSplash.style.visibility = "visible";
	
	if(	popLayer != null ){
		popLayer.style.visibility = "visible";
	}
	
	var selObj = document.getElementById("City_codes");
	if (selObj != null) {
		if (airportTarget != null) {
			selObj.value = airportTarget.value.toUpperCase();
		} else {
			selObj.value = "";
		}
		selObj.scrollIntoView(true);
		//selObj.focus();
	}
}

function hideLayeredAirportPopup(){
	popLayer = document.getElementById("layeredAirportListPopup");  
	if(	popLayer != null ){
		Locations.findBy('city');
		changeTab('Alphabetically_trigger');
		popLayer.style.visibility = "hidden";
	}
	hidePopupSplash();
	unhideAllSelectElement();
}

function selectAirport2(airportCode) {
	if (airportTarget != null && airportCode != null) {
		airportTarget.value = airportCode;
	}
	hideLayeredAirportPopup();
}

//rqb 20111223 Chargers QC 2279 start
//dgg 20110530 Astros QC 837 start
function searchAlertPopup(){

	var destination;
	var origin;
	var departureDate;
	var arrivalDate = null;
	var searchType = document.forms[0].searchType.value;
	
	if (searchType == 'schedule' || searchType == 'gmt')
	{
		origin = document.forms[0].fromAirport.value;
		destination = document.forms[0].toAirport.value;
		departureDate = document.forms[0].leaveDate.value;
		var tripWay = document.forms[0].tripWay;
		var tripWayLength = tripWay.length;
		if(tripWayLength != undefined)
		{
			for(var i = 0; i < tripWayLength; i++) {
				if(tripWay[i].checked) {
					var tripWayValue = tripWay[i].value;
				}
			}
		}
		if (tripWayValue == 'roundTrip') arrivalDate = document.forms[0].returnDate.value;
	}
	else 
	{
		 origin = document.forms[0].flightFromAirport.value;
		 destination = document.forms[0].flightToAirport.value;
		 departureDate = document.forms[0].flightLeaveDate.value;
	}

	//rqb 20130128 Falcons QC 2480 added viaCheck
	if(viaCheck(document.forms[0].searchType.value) ){
		//rqb 20131226 - Struts2 - dwr that calls an action class doesn't work in struts2
		//var forwardURL = "/travelAlert.do?destination="+destination+"&origin="+origin+"&startDate="+departureDate+"&endDate="+arrivalDate;
		var forwardURL = "/WEB-INF/jsps/travelAlertPopup.jsp?destination="+destination+"&origin="+origin+"&startDate="+departureDate+"&endDate="+arrivalDate;
		//msj 20120816 Eagles QC 2443 start
		showPageInPopup2(PLEASE_WAIT_TEXT, "720", null, "250", "150"); //aay 20150817 - QC 2751	
		//msj 20120816 Eagles QC 2443 end
	//		var splashText = "Please wait while checking for available travel alert/s.";
	//		showLoadingSplash(splashText);
	//		document.forms[0].action = "travelAlert.do";
	//		document.forms[0].submit();
		
		Popup.getSearchAlert(forwardURL, function(data) {
			emptyPopupSplash();
			if(trimBoth(data).length=='')
			{
				if (searchType == 'gmt'){
					submitGetMeThereSearch();
				} else {
					submitSearch();
				}
			}
			else
			{
				dwr.util.setValue("forward", data, { escapeHtml:false });
				checkForTimeout("forward");
				showLayeredPopup();
			}
		});
	}	
}
//dgg 20110530 Astros QC 837 end
//rqb 20111223 Chargers QC 2279 end

//rqb 20101223 Astros QC 853 start
function checkCobusFirstBusinessWarning(){
	/*
	var classCode = document.forms[0].classCode;
	var classCodes="";
	var selectFlights = document.getElementsByName("selectFlight");

	for (x=0; x<classCode.length; x++)
	{
		if (selectFlights.length > 1){
			if(x!=0)classCodes+="_";
			classCodes+=classCode[x].value;
		}else{
			if (classCode[x].selected == true){
				if(x!=0)classCodes+="_";
				classCodes+=classCode[x].value;
			}
		}
	}
	*/
//	var splashText = "Please wait while checking for travel warning/s.";
	showLoadingSplash(PLEASE_WAIT_TEXT); //aay 20150817 - QC 2751
//	showLoadingSplash(splashText);
	//document.forms[0].action = "companyBusinessCheckWarning.do?classCodes="+classCodes;
	document.forms[0].action = "companyBusinessCheckWarning.action";
	document.forms[0].submit();
	
//	var forwardURL = "/companyBusinessCheckWarning.do?classCodes="+classCodes;
//	showPageInPopup2("Please wait while checking for travel warning/s.", "720", "250");
/*	Popup.getInclude(forwardURL, function(data) {
		emptyPopupSplash();
		if(trimBoth(data).length=='')
		{
			submitReservation();
		}
		else
		{
			dwr.util.setValue("forward", data, { escapeHtml:false });
			checkForTimeout();
			showLayeredPopup();
		}
	});
*/
}
//rqb 20101223 Astros QC 853 end


//rqb 20140321 TN Mobile
function showMobileSite(){
	hideLayeredPopup();
	showLoadingSplash("Loading Mobile Version.");
	document.forms[0].action = "switchToMobile.action";
	document.forms[0].submit();
}

//aay DelegateAccess
function changeProfile(pprNumber){
	hideLayeredPopup();
	showLoadingSplash("Loading profile.");
	document.forms[0].action = "switchProfile.action?pprNumber=" + pprNumber;
	document.forms[0].submit();
}

//aay 20201213 - CovidTestedFlights
function selectAlertPopup(key, tripWay){
	var stringUrl = "/WEB-INF/jsps/popup/covidTestedFlightAdvisoryPopup.jsp?key="+key+"&tripWay="+tripWay;
	showInLayeredPopup("", "800", "null", "200", "100");
	Popup.getFlightAlert(stringUrl, function(data) {
		dwr.util.setValue("forward", data, { escapeHtml:false });
		checkForTimeout("forward");
		emptyPopupSplash();
		showLayeredPopup();
	});

}

function getPassengerTypeCategoryList(currObj){
	var acc = document.getElementsByClassName("accordion");
	var currentId=currObj.id;
	var index=currentId.split("_")[1];
	currObj.classList.toggle("active");
	var down_arrow=document.getElementById("triangle-down_"+index);
    var up_arrow=document.getElementById("triangle-up_"+index);
    var panel = currObj.nextElementSibling;
    if (panel.style.display === "block") {
      panel.style.display = "none";
      down_arrow.classList.remove("hideData");
      up_arrow.classList.add("hideData");
          
    } else {
      panel.style.display = "block";
      down_arrow.classList.add("hideData");
      up_arrow.classList.remove("hideData");
    }
	
}
 