try{
var APPNAME_SMART_BUILDER = "SmartWorkbenchEditor";
var APPNAME_INSTANCE_VIEWER = "InstanceViewerApp";
var APPNAME_DIAGRAM_VIEWER = "DiagramViewerApp";
var APPNAME_GANTT_VIEWER = "GanttViewerApp";
var APPNAME_GANTT_INSTANCE_VIEWER = "GanttInstanceViewerApp";
var APPNAME_GANTT_TASK_LIST_VIEWER = "GanttTaskListViewerApp";
var APPNAME_CHART_VIEWER = "ChartGadgetApp";

function loadFlash(target, appName, params){
	try{
		var htm = 	'<object type="application:x-shockwave-flash" classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"' +
						'id="' + appName + '" width="100%" height="100%"' + 'codebase="http://fpdownload.macromedia.com/get/flashplayer/current/swflash.cab">' +
						'<param name="src" value="resources/flash/' + appName + '.swf" />' +
						'<param name="quality" value="high" />' +
						'<param name="wmode" value="transparent">' +
						'<param name="bgcolor" value="#ffffff" />' +
						'<param name="allowScriptAccess" value="always" />' +
						'<param name="flashVars" value="' + params + '" />' +
						'<embed src="resources/flash/' + appName + '.swf" wmode="transparent" quality="high" bgcolor="#ffffff"' +
							'width="100%" height="100%" name="VinoTester" align="middle" play="true" loop="false" quality="high" allowScriptAccess="sameDomain"' +
							'type="application/x-shockwave-flash" pluginspage="http://www.adobe.com/go/getflashplayer" flashVars="' + params + '">' +
						'</embed>' +
					'</object>';
		$(target).html(htm);	
	}catch(error){
		smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-flash loadFlash]', null, error);
	}			
};

function getServiceUrl() {
	try{
		var splitArray = window.location.href.split('/');
		return splitArray[0] + '//' + splitArray[2] + '/';
	}catch(error){
		smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-flash getServiceUrl]', null, error);
	}			
};

function getGeneralParams(){
	try{
		return 	'serviceUrl=' + getServiceUrl() + 
				'&compId=' + currentUser.companyId + 
				'&userId=' + currentUser.userId + 
				'&defaultLanguage=' + currentUser.locale;	
	}catch(error){
		smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-flash getGeneralParams]', null, error);
	}			
};

function loadSmartBuilder(target, params){
	try{
		var options = {
			packageId : '',
			packageVersion : '1',
			dueDate : '' //"2010-10-01 00:00:00"
		};
		SmartWorks.extend(options, params);
		loadFlash(target, APPNAME_SMART_BUILDER, getGeneralParams() 
													+ '&packId=' + options.packageId 
													+ '&packVer=' + options.packageVersion
													+ '&dueDate=' + options.dueDate);
	}catch(error){
		smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-flash loadSmartBuilder]', null, error);
	}			
};

function loadInstanceViewer(target, params){
	try{
		var options = {
				instanceId : ''
		};
		SmartWorks.extend(options, params);
		loadFlash(target, APPNAME_INSTANCE_VIEWER, getGeneralParams() 
												+ '&prcInstId=' + options.instanceId);
	}catch(error){
		smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-flash loadInstanceViewer]', null, error);
	}			
};

function loadDiagramViewerApp(target, params){
	try{
		var options = {
				processId : '',
				version : '1'
		};
		SmartWorks.extend(options, params);
		loadFlash(target, APPNAME_DIAGRAM_VIEWER, getGeneralParams() 
												+ '&processId=' + options.processId 
												+ '&version=' + options.version);
	}catch(error){
		smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-flash loadDiagramViewerApp]', null, error);
	}			
};

function loadGanttViewer(target, params){
	try{
		var options = {
				processId : '',
				version : '1',
				contentWidth : '654.0'
		};
		loadFlash(target, APPNAME_GANTT_VIEWER, getGeneralParams() 
												+ '&processId=' + options.processId 
												+ '&version=' + options.version
												+ '&contentWidth=' + options.contentWidth);
	}catch(error){
		smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-flash loadGanttViewer]', null, error);
	}			
};

function loadGanttInstanceViewer(target, params){
	try{
		var options = {
				instanceId : ''
			};
		SmartWorks.extend(options, params);
		loadFlash(target, APPNAME_GANTT_INSTANCE_VIEWER, getGeneralParams() 
													+ '&prcInstId=' + options.instanceId);
	}catch(error){
		smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-flash loadGanttInstanceViewer]', null, error);
	}			
};

function loadGanttTaskListViewerApp(target, params){
	try{
		var options = {
				formDate : '', //"2010-06-28 00:00:00"
				viewScope : 'MONTH', // 'DAY', 'WEEK', 'MONTH'
				conditions : '',
				pageSize : '20'
		};
		SmartWorks.extend(options, params);
		loadFlash(target, APPNAME_GANTT_TASK_LIST_VIEWER, getGeneralParams() 
													+ '&fromDate=' + options.fromDate,
													+ '&viewScope=' + options.viewScope,
													+ '&conditions=' + options.conditions,
													+ '&pageSize=' + options.pageSize);
	}catch(error){
		smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-flash loadGanttTaskListViewerApp]', null, error);
	}			
};

function loadChartViewer(target, params){
	try{
		var options = {
				chartType 	: 'LINE_CHART',
				viewType	: '',
				acumData	: 'true',
				fillColor 	: '0x000fff',
				gadgetId 	: '',
				xmlData		: ''
		};
		SmartWorks.extend(options, params);
		loadFlash(target, APPNAME_CHART_VIEWER, getGeneralParams()
												+ '&chartType=' + options.chartType,
												+ '&viewType=' + options.viewType,
												+ '&acumData=' + options.acumData,
												+ '&fillColor=' + options.fillColor,
												+ '&gadgetId=' + options.gadgetId,
												+ '&xmlData=' + options.xmlData);
	}catch(error){
		smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-flash loadChartViewer]', null, error);
	}
};

function taskSelectionCallback(id, formId, formName) {
	try{
		console.log("taskSelectionCallback Called!!! id=" + id + ", formId=" + formId + ", formName=" + formName);
//		clickOnTaskInDiagram(formId);
	}catch(error){
		smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-flash taskSelectionCallback]', null, error);
	}			
};

function loadCallback(appName, height){
	try{
		console.log("loadCallback Called!!! status=" + height);
		var target = $(".js_process_instance_viewer");
		if(appName === APPNAME_SMART_BUILDER){
			target = $(".js_smart_workbench_editor");
		}else if(appName === APPNAME_DIAGRAM_VIEWER){
			target = $(".js_process_diagram_viewer");		
		}else if(appName === APPNAME_INSTANCE_VIEWER){
			target = $(".js_process_instance_viewer");		
		}else if(appName === APPNAME_GANTT_VIEWER){
			target = $(".js_gantt_viewer");		
		}else if(appName === APPNAME_GANTT_INSTANCE_VIEWER){
			target = $(".js_gantt_instance_viewer");		
		}else if(appName === APPNAME_GANTT_TASK_LIST_VIEWER){
			target = $(".js_gantt_task_list_viewer");		
		}else if(appName === APPNAME_CHART_VIEWER){
			target = $(".js_chart_viewer");		
		}
		target.height(height);
	}catch(error){
		smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-flash loadCallback]', null, error);
	}			
};

function ganttProcessCallback(packId, packName, mode, msg){
	try{
		console.log("ganttProcessCallback Called!!! packId=" + packId + ", packName=" + packName + ", mode=" + mode + ", msg=" + msg);
	}catch(error){
		smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-flash ganttProcessCallback]', null, error);
	}			
};

function dateCallback(startDate, endDate){
	try{
		console.log("dateCallback Called!!! startDate=" + startDate + ", endDate=" + endDate);
		var dueDate = startDate +" ~ "+ endDate;
		parent.document.getElementById('dueDateDiv').innerHTML = dueDate;
		parent.viewChartStartDate();
		//parent.document.getElementById('fromDate').setAttribute('value','');
	}catch(error){
//		smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-flash dateCallback]', null, error);
	}			
};

function pagingCallback(totalPages, currentPage){
	try{
		console.log("pagingCallback Called!!! totalPages=" + totalPages + ", currentPage=" + currentPage);
		parent.pagingVchart(totalPages, currentPage);
	}catch(error){
		smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-flash pagingCallback]', null, error);
	}			
};

function fullScreenCallback(param){
	try{
		console.log("fullScreenCallback Called!!! param=" + param);
		//if(param == 'NormalScreen'){
			parent.openerRefresh();
		//}
	}catch(error){
		smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-flash fullScreenCallback]', null, error);
	}			
};
}catch(error){
	smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-flash script]', null, error);
}
