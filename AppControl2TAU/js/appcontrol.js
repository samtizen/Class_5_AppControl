(function(){

	var appControlMain = {},
		reqAppControl;

	appControlMain.init = function() {
	
		$("#another-page").on("pagebeforeshow", displayAnotherPage);
		$("#btn-send-msg-back").click(sendBack);
		
	}

	function displayAnotherPage(){
		
		//Получение запрос AppControl от приложения 1
		reqAppControl = tizen.application.getCurrentApplication().getRequestedAppControl();
		
		if (reqAppControl) {
			
			var dataFromApp1 = reqAppControl.appControl.data;
			
			$("#txt-data-from-app-1").val(dataFromApp1[0].value[0] + dataFromApp1[0].value[1]);
			
		}
		else {
			$("#txt-data-from-app-1").val("none");
		}
	}

	//Отправление ответа приложению 1
	function sendBack(){
			
		if (reqAppControl) {
			
			//Id приложения 1
			console.log("Requester AppID : " + reqAppControl.callerAppId);
			
			var appControl = reqAppControl.appControl;
			
			
			//Запрашиваемая операция
			if (appControl.operation == "http://tizen.org/appcontrol/operation/getdata") {
				
				//Формирование данных для ответа приложению 1
			    var data = new tizen.ApplicationControlData("mydata", ["Hey! This is App 2"]);
			    
			    //Ответ приложению 1
			    reqAppControl.replyResult([data]);
			    
			}
		}
		
		//Завершения приложения 2 (текущее)
		tizen.application.getCurrentApplication().exit();
	}
	
	return appControlMain;
	
})().init();

