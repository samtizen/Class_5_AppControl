// Section 1 ---------------------------------------------------------
$("#btn-show-app-info").click(showAppInfo);
$("#btn-show-app-context").click(showAppContext);

// Показать информацию о приложении
function showAppInfo() {
	
	var elDOM = document.getElementById("appInfo");
	var displayPr = window.getComputedStyle(elDOM, null).getPropertyValue("display");
	
	if (displayPr === "none") {
		elDOM.innerHTML = getAppInfo();
		elDOM.style.display = "block";
		
	}
	else {
		elDOM.style.display = "none";
	}
}
function getAppInfo(){
	
	var appinfo = tizen.application.getAppInfo();
	
	var outHTML = "<ul class='ui-listview'><li class='ui-li-static'>AppName: " + appinfo.name + "</li>" + 
	  									  "<li class='ui-li-static'>AppId: " + appinfo.id + "</li></ul>";

	console.log(appinfo);	
	
	return outHTML;
	
}

//Показать контекст приложения
function showAppContext() {
	
	console.log("showAppContext");
	
	var elDOM = document.getElementById("appContextInfo");
	var displayPr = window.getComputedStyle(elDOM, null).getPropertyValue("display");
	
	if (displayPr === "none") {
		elDOM.innerHTML = getAppContextInfo();
		elDOM.style.display = "block";
		
	}
	else {
		elDOM.style.display = "none";
	}
}
function getAppContextInfo(){
	
	var appContext = tizen.application.getAppContext();
	
	console.log("getAppContextInfo");
	
	//getApp2ContextInfo();

	var outHTML = "<ul class='ui-listview'><li class='ui-li-static'>AppId: " + appContext.appId + "</li>" + 
										  "<li class='ui-li-static'>ContextId: " + appContext.id + "</li></ul>";
	console.log(appContext);	
	
	return outHTML;
}


// Section 2 ---------------------------------------------------------
$("#btn-show-imp-app").click(launchImplApp);

/* Пример запуска внешнего приложения без указания id. 
 * Пользователь сам выбирает подходящее приложение из списка (если несколько) */
function launchImplApp() {
	
	
	var appControl = new tizen.ApplicationControl("http://tizen.org/appcontrol/operation/view",
            									  "https://www.hse.ru", null, null, null, null);

	tizen.application.launchAppControl(appControl, null, successCallback, errorCallback, null);
	
	function successCallback(){
		
		console.log("Well done!");
		
	}
	function errorCallback(e){
		
		console.log(e);
		
	}
}

// Section 3 ---------------------------------------------------------
$("#btn-show-expl-app").click(launchExmlApp);
$("#btn-show-app2-info").click(showApp2Info);
$("#btn-show-app2-context").click(showApp2Context);

function showApp2Info() {
	
	var elDOM = document.getElementById("app2Info");
	var displayPr = window.getComputedStyle(elDOM, null).getPropertyValue('display');
	
	if (displayPr === "none") {
		elDOM.innerHTML = getApp2Info();
		elDOM.style.display = "block";
		
	}
	else {
		elDOM.style.display = "none";
	}
	
}
function getApp2Info(){
	
	var appinfo = tizen.application.getAppInfo("Xn5tzXxxB8.AppControl2TAU");
	
	var outHTML = "<ul class='ui-listview'><li class='ui-li-static'>AppName: " + appinfo.name + "</li>" + 
	  									  "<li class='ui-li-static'>AppId: " + appinfo.id + "</li></ul>";

	console.log(appinfo);	
	
	return outHTML;
	
}

function showApp2Context() {
	var elDOM = document.getElementById("app2ContextInfo");
	var displayPr = window.getComputedStyle(elDOM, null).getPropertyValue('display');
	
	if (displayPr === "none") {
		getApp2ContextInfo();
		elDOM.style.display = "block";
		
	}
	else {
		elDOM.style.display = "none";
	}
}
function getApp2ContextInfo(){
	
	var elDOM = document.getElementById("app2ContextInfo");
	
	elDOM.innerHTML = "<b>No Context</b>";
	
	function onRunningAppsContext(contexts) {
		
	    for (var i = 0; i < contexts.length; i++) {
	    	
	    	console.log(contexts[i].appId);
	    	
	    	if (contexts[i].appId ===  "Xn5tzXxxB8.AppControl2TAU"){
	    		
	    		console.log("OK");
	    		
	    		elDOM.innerHTML = "<ul class='ui-listview'><li class='ui-li-static'>AppId: " + contexts[i].appId + "</li>" + 
				  "<li class='ui-li-static'>ContextId: " + contexts[i].id + "</li></ul>";
	    		
	    	}
	    
	    }
	}
	
	tizen.application.getAppsContext(onRunningAppsContext);

}

// Запуск определенного внешнего приложения 2 с указанием id
function launchExmlApp() {
	
	var elDOM = document.getElementById("appStatus");
	
	//Запуск по приложения 2 по его id 
	tizen.application.launch("Xn5tzXxxB8.AppControl2TAU", onsuccessLaunch, onerrorLaunch);
	
	//Действия, если запуск прошел успешно
	function onsuccessLaunch() {
	    elDOM.textContent = "The application has launched successfully";
	    tau.openPopup('#header_popup');
	}
	//Действия, если не удалось запустить приложение 2
	function onerrorLaunch() {
		elDOM.textContent = "The application has not launched";
	    tau.openPopup('#header_popup');
	}
}

// Section 4: ---------------------------------------------------------
$("#btn-show-data-exchange").click(launchExmlApp2);

//Запуск определенного внешнего приложения 2 с использованием операции getdata и получение ответа от него
function launchExmlApp2() {
	
	//Форморирование объекта appControl с указанием операции для приложения 2
	var dataToApp2 =  [new tizen.ApplicationControlData("values", ["Hello, ", "App2"])];
	
	var appControl = new tizen.ApplicationControl("http://tizen.org/appcontrol/operation/getdata", 
												  null, "text/plain",null, dataToApp2);
	
	//console.log(appControl);
	
	//Объект для дальнейшего получения ответа от приложения 2
	var callbackAppControlReply =
		{
			onsuccess: onsuccessCallbackReply, //Имя выполняемой функция при успешном получении ответа
			onfailure: onerrorCallbackReply    //Имя выполняемой функция, если получить ответ не удалось
		};
	
	//Запуск приложения 2
	tizen.application.launchAppControl(appControl, null, onsuccessLaunch, onerrorLaunch, callbackAppControlReply);
	
	//Действия, если запуск прошел успешно
	function onsuccessLaunch() {
		console.log("launch appControl succeeded");
	}
	//Действия, если не удалось запустить приложение 2
	function onerrorLaunch(e) {
		console.log(e);
	}
	//Выполняемая функция при успешном получении ответа
	function onsuccessCallbackReply(data) {   
		
		console.log(data);
	  
		for (var num = 0; num < data.length; num++)
		{
			if (data[num].key === "mydata")
			{
				//console.log("Data from App2: " + data[num].value[0]);
				$("#txt-data-from-app-2").val(data[num].value[0]);
				
			}
		}
   	}
	//Выполняемая функция, если получить ответ не удалось
	function onerrorCallbackReply(e) {
		console.log(e);
	}
	
}

