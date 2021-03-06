<%@ page contentType="text/html; charset=utf-8"%>

<%
	String sbpId = (String) request.getAttribute("sbpId");
	String psId = (String) request.getAttribute("psId");
	String itemName = (String) request.getAttribute("itemName");													// Service Concept 종류
	String title = (String) request.getAttribute("title");															// Service Concept 이름 
	String svcNameNum = (String) request.getAttribute("svcNameNum");												// Service concept 종류안에 속해있는것들중에 선택한 service concept
	String sbpPrjName = (String) request.getAttribute("sbpPrjName");												// SBP 프로젝트 이름 
	String sbpName = (String) request.getAttribute("sbpName");														// SBP 이름 

	String srcUrl = "http://wine.smartworks.net:8095/sbp/panel8ForHvm.jsp?seq=" + sbpId + "&hvm=true&memberId=sbpAdmin&sPUID=&docTitle=" + sbpName + "&sProjectName=" + sbpPrjName + ""; // SBP Project Map을 보여준다 
//	String srcUrl = "http://sbp.pssd.or.kr/sbp/panel8ForHvm.jsp?seq=" + sbpId + "&hvm=true&memberId=sbpAdmin&sPUID=&docTitle=" + sbpName + "&sProjectName=" + "NiceTest" + "&xPosition=" + "testing50" + ""; 	// SBP Project Map을 보여준다
//	srcUrl += "";
%>
<style>
	#sbpline {
		border-right:50px solid white;
		border-left:50px solid white;
		border-bottom:50px solid white;
		border-radius:5px;
		background-color:white;
	}
	.sbpline {
		border-top: 90px solid white;
		border-radius:5px;
		background-color:white;
	}
	.close_btn {
		float:right;
		margin-top:25px;
		margin-right:-14px;
	}
	.close_btn_pic {
		width:15px; 
		height:15px;
		cursor:pointer;
	}
	.serviceconcept_title {
		float:left;
		font-size:25px;
		margin-left:27px;
		margin-top:25px;
		height:30px;
	}
	.dataEnsure2 {
		position:absolute;
		bottom:0px;
		margin-bottom:72px;
		width:45px;
		height:30px;
		text-align:center;
		
	}
	.disConnect {
		position:absolute;
		bottom:0px;
		margin-bottom:72px;
		width:115px;
		height:30px;
		color:white;
		text-align:center;
	}
	.activity_content_wrap {
		position:absolute;
		float:left;
		font-size:15px;
		margin-left:30px;
		margin-top:86px;
	}
	.activity_content {
		height:20px;
		position:absolute;
		font-size:13px;
		margin-top:64px;
		margin-left:200px;
		line-height:200%;
		
		padding:16px;
		margin-bottom:16px!important;
		border:1px solid #ccc!important;
		border-color:#2196F3!important;
	}
	.cursor{
		cursor:pointer;
	}
	.modal {
	    display: none; /* Hidden by default */
	    position: fixed; /* Stay in place */
	    z-index: 1045; /* Sit on top */
	    left: 0;
	    top: 0;
	    width: 100%; /* Full width */
	    height: 100%; /* Full height */
	    overflow: auto; /* Enable scroll if needed */
	    background-color: rgb(0,0,0); /* Fallback color */
	    background-color: rgba(0,0,0,0.4); /* Black w/ opacity */
	}
	.sbp-disconnect-modal-content {
		border: 5px solid #0095cd;
		border-radius:5px;
	    background-color: #fefefe;
	    margin-left:42%;
	    margin-top:18%;
	    padding: 20px;
	    width: 250px;
	    height:80px;
	}
</style>
<script>
	/* view에 관한 속성들 변경 */
	$(".sbpline").css("width", spaceWidth-100);
	$(".sbpline").css("height", 700);
	$(".dataEnsure2").css("margin-left", (spaceWidth-100)/2 - 35);
	$(".disConnect").css("margin-left", (spaceWidth-100)/2 + 35);
//	$(".activity_content").css("width", (spaceWidth-100)/2-280);
	
	/* 수정모드가 아닐경우 -> 연결된 activity는 보이되, 수정은 불가능
	   ViewMode(service concept이 아닌 'SBP-프로젝트 이름'을 클릭했을 때 -> SBP Map만 보여준다.)*/
	var psId = "<%=psId%>";	
	var svcNameNum = "<%=svcNameNum%>";
//	editMode = $("." + svcNameNum).attr("editMode");
	editMode = localStorage.getItem("editMode");
	console.log("editMode : " , editMode);
	if((editMode == "false") || (psId == "" || psId == "null")) {		
		$(".dataEnsure2").css("display", "none");
		$(".disConnect").css("display", "none");
		if(viewMode == "true") {
			$(".activity_content").css("display", "none");
			$(".activity_content_wrap").css("display", "none");
			$(".sbpline").css("border-top", "75px solid white");
			var height_ViewMode = $(window).height()-180;
			$(".sbpline").css("height", height_ViewMode);
		}
	}
	
	/* 처음 블루프린트 선택 후 activity선택화면으로 넘어 왔을시, activity 값 초기화 */
	sbp_dt = "";
	sbpId_dt = "";
	activityId_dt = "";
	activityName_dt = "";
	activityId_Array = new Array();
	activityName_Array = new Array();
	seq_Array = new Array();
	viewMode = "false";
	
	/* SBP Map 창을 닫으면 데이터 바구니역할(header.jsp의 변수들)을 하는 변수들을 리셋해준다. */
	$(".resetSbpData2").live("click", function() {
		sbp_dt = "";
		sbpId_dt = "";
		activityId_dt = "";
		activityName_dt = "";
		activityId_Array = new Array();
		activityName_Array = new Array();
		seq_Array = new Array();
		viewMode = "false";
	});
	
	
	/* SBP Map창을 볼 때 -> 연결된 SBP Activity들을 보여준다. */
	var title = "<%=title%>";
	var itemName = "<%=itemName%>";
	var sbpId = "<%=sbpId%>";
	$.ajax({
		type: 'POST',
		url: "showConnectedActivity.sw",
		headers:{
			"Content-Type" : "application/json",
			"X-HTTP-Method-Override":"POST",
		},
		data : JSON.stringify({psId : psId , title : title, itemName : itemName, sbpId : sbpId}),
		dataType:'json',
		success : function(result) {			
			/* 데이터바구니(header.jsp)에 DB에서 꺼내온 데이터를 담는다.  */
			$(result).each(function() {
				activityId_Array = this.activityId;
				activityName_Array = this.activityName;
				seq_Array = this.seq;
				sbpId_dt = this.sbpId; 
				sbp_dt = this.sbpName;
				selectedColor = this.color;
			});
			
			/* DB에서 꺼내온 데이터를 바로 보여준다. */
			var activityName_Array_Impl = "";
			for(var i=0; i<activityName_Array.length; i++) {
				activityName_Array_Impl += activityName_Array[i];
				if((i+=1) != (activityName_Array.length)) {
					activityName_Array_Impl += ",&nbsp;&nbsp;&nbsp;&nbsp;";
					i-=1;
				}
			}
			$(".activity_content").html(activityName_Array_Impl);
			$(".activity_content").css("width", spaceWidth-400);
			$(".serviceconcept_title").html(title);
			
			/* sbp서버로 선택했었던 activity seq 값들을 파라미터로 전송한다. */
			var srcUrl = "http://wine.smartworks.net:8095/sbp/panel8ForHvm.jsp?seq=" + "<%=sbpId%>" + "&hvm=true&memberId=sbpAdmin&sPUID=&docTitle=" + encodeURI("<%=sbpName%>", "UTF-8") + "&sProjectName=" + encodeURI("<%=sbpPrjName%>", "UTF-8") + "&mapShow=true";
			srcUrl += "&seqArray=" + seq_Array + "&editMode=" + editMode + "&selectedColor=" + selectedColor.substring(1, selectedColor.length);
			$(".sbpline").attr("src", srcUrl);
		},
		error : function(result){
			alert("error : " + result);
		}
	});
	
	
	
	
	
	
	
	
	
	
	
	/* 선택한 activity 데이터 저장 (이미 연결한 Activity가 있을 때 -> 즉, 수정 할 때 ) */	
	function dataEnsure2() {
		var sbpMapDataUrl = "insertSbpMapData.sw";
		var itemName = "<%=itemName%>";					// Service Concept 종류
		var title = "<%=title%>";						// Service Concept 이름 
		var psId = "<%=psId%>";							// PSS 프로젝트 ID 
		var sbpName = sbp_dt;							// SBP 프로젝트 이름 
		var sbpId = sbpId_dt;							// SBP ID
		var color = selectedColor;

		var activityId = [];							
		for (var i=0; i<activityId_Array.length+2; i++) {
			if(i==0) {
				activityId[i] = "/(start)/";
			} else if(i==activityId_Array.length+1) {
				activityId[i] = "/(end)/";
			} else {
				activityId[i] = activityId_Array[i-1];
			}
		}
		
		var activityName = [];
		for (var i=0; i<activityName_Array.length+2; i++) {
			if(i==0) {
				activityName[i] = "/(start)/";
			} else if(i==activityName_Array.length+1) {
				activityName[i] = "/(end)/";
			} else {
				activityName[i] = activityName_Array[i-1];
			}
		}
		
		var seq = [];
		for (var i=0; i<seq_Array.length+2; i++) {
			if(i==0) {
				seq[i] = "/(start)/";
			} else if(i==seq_Array.length+1) {
				seq[i] = "/(end)/";
			} else {
				seq[i] = seq_Array[i-1];
			}
		}
		
		var sbpNameArray = [];
		sbpNameArray[0] = "/(start)/";
		sbpNameArray[1] = sbpName;
		sbpNameArray[2] = "/(end)/";
		
		var colorArray = [];
		colorArray[0] = "/(start)/";
		colorArray[1] = color;
		colorArray[2] = "/(end)/";

		
		var totalData = {seq : seq, itemName : itemName, title : title, psId : psId, sbpName : sbpNameArray, sbpId : sbpId, activityId : activityId , activityName : activityName, color : colorArray};
		var totalDataToString = title + "||{seq:[";
		for(var i=0; i<seq.length; i++) {
			if(i == seq.length-1) {
				totalDataToString += seq[i];
			} else {
				totalDataToString += seq[i] + ", ";
			}
		}
		totalDataToString += "], itemName:" + itemName + ", title:" + title +", psId:" + psId + ", sbpName:[";
		for(var i=0; i<sbpNameArray.length; i++) {
			if(i == sbpNameArray.length-1) {
				totalDataToString += sbpNameArray[i];
			} else {
				totalDataToString += sbpNameArray[i] + ", ";
			}
		}
		totalDataToString += "], sbpId:" + sbpId + ", activityId:[";
		for(var i=0; i<activityId.length; i++) {
			if(i == activityId.length-1) {
				totalDataToString += activityId[i];
			} else {
				totalDataToString += activityId[i] + ", ";
			}
		}
		totalDataToString += "], activityName:[";
		for(var i=0; i<activityName.length; i++) {
			if(i == activityName.length-1) {
				totalDataToString += activityName[i];
			} else {
				totalDataToString += activityName[i] + ", ";
			}
		}
		totalDataToString += "], color:[";
		for(var i=0; i<colorArray.length; i++) {
			if(i == colorArray.length-1) {
				totalDataToString += colorArray[i];
			} else {
				totalDataToString += colorArray[i] + ", ";
			}
		}
		totalDataToString += "]}";
		
		$.ajax({
			type: 'POST',
			url: sbpMapDataUrl,
			headers:{
				"Content-Type" : "application/json",
				"X-HTTP-Method-Override":"POST",
			},
			data : JSON.stringify(totalData),
			dataType:'text',
			success : function(result) {
				$('input[svcNameNum=' + svcNameNum + ']').attr("value", totalDataToString);
				alert("Activity 연결 성공!");
				hidePSSD();
			},
			error : function(result){
				alert("error : " + result);
			}
		}); 
		
		// 데이터 초기화
		sbp_dt = "";
		sbpId_dt = "";
		activityId_dt = "";
		activityName_dt = "";
		activityId_Array = new Array();
		activityName_Array = new Array();
		seq_Array = new Array();
	}
	
	
	/* SBP 연결끊기 확인 modal 띄우기 */
	function disConnect_check() {
		$("#SBP_DisConnect_Modal").css("display", "block");
		$(".sbp-disconnect-modal-content").css("display", "block");
	}
	
	/* SBP 연결끊기 확인 modal 취소 */
	function disConnect_Cancel() {
		$(".sbp-disconnect-modal-content").css("display", "none");
		$("#SBP_DisConnect_Modal").css("display", "none");
	}
	
	/* SBP와의 연결을 끊는다. (연결된 activity가 있다면 모두 제거됨) */
	function disConnect() {
		var itemName = "<%=itemName%>";
		var svcNameNum = "<%=svcNameNum%>";
		var sbpId = "<%=sbpId%>";
		var title = "<%=title%>";
		var disConnectUrl = "sbpDisConnect.sw";
		$.ajax({
			type: 'POST',
			url: disConnectUrl,
			headers:{
				"Content-Type" : "application/json",
				"X-HTTP-Method-Override":"POST",
			},
			data : JSON.stringify({psId : psId, itemName : itemName, title : title}),
			dataType:'text',
			success : function(result) {
				alert("SBP와의 연결이 해제 되었습니다.");
				
				/* 연결 제거된 service concept 속성 변경 */
				var svcNameNum2 = "." + svcNameNum;
				var sbpPrjName = $(svcNameNum2).attr("sbpPrjName");
				var title = "<%=title%>";
				
				$(svcNameNum2).parents("span .icon_btn_edit").addClass("class", "showSbpPrjList")
				$(svcNameNum2).attr("class", "js_action_element_item " + svcNameNum);
				$(svcNameNum2).attr("sbpPrjName", sbpPrjName);
				$(svcNameNum2).attr("title", title);
				$(svcNameNum2).attr("sbpId", "");
				$(svcNameNum2).children().attr("class", "js_action_element_item " + svcNameNum);
				$(svcNameNum2).children().attr("sbpPrjName", sbpPrjName);
				$(svcNameNum2).children().attr("title", title);
				$(svcNameNum2).children().attr("sbpId", "");
				$('input[svcNameNum=' + svcNameNum + ']').attr("value", title);
				$('input[svcNameNum=' + svcNameNum + ']').attr("disconnectsbp", "true");
				
				$("#SBP_DisConnect_Modal").css("display", "none");
				$(".sbp-disconnect-modal-content").css("display", "none");
				$(".showPSSD").css("display", "none");
				
				
				/* 연결해제 후 새로고침 */
				localStorage.setItem("fromServiceSpace", "true");
				location.reload();
				
				/* 연결된 'SBP-프로젝트 이름'을 보여주는곳 변경 */
				var title_Create_url = "title_Create.sw";
				var sbpPrjName = "<%=sbpPrjName%>";
				var sbpName = "<%=sbpName%>";
				$.ajax({
					type: 'POST',
					url: title_Create_url,
					headers:{
						"Content-Type" : "application/json",
						"X-HTTP-Method-Override":"POST",
					},
					data : JSON.stringify({psId : psId}),
					dataType:'html',
					success : function(result) {
						/* 서버encode -> 클라이언트decode 해줘도 특수문자가 깨져서 와서 깨진부분만 수정 */
						result = decodeURI(result);
						result = result.replace(/\+/gi," ");
						result = result.replace(/%2F/gi,"/");
						result = result.replace(/%3D/gi,"=");
						result = result.replace(/%3A/gi,":");
						result = result.replace(/%3B/gi,";");
						result = result.replace(/%2C/gi,",");
						$(".connect_SBPPrj").parent().html(result);
					},
					error : function(result){
						alert("error : " + result);
					}
				});				
			},
			error : function(result){
				alert("error : " + result);
			}
		}); 
		
		// 데이터 초기화
		sbp_dt = "";
		sbpId_dt = "";
		activityId_dt = "";
		activityName_dt = "";
		activityId_Array = new Array();
		activityName_Array = new Array();
		seq_Array = new Array();
	}
	
	/* PSSD 화면을 숨겨준다. */
	function hidePSSD() {
		$(".showPSSDForm").css("display", "none");
	}
</script>
<div id="sbpline">
	<span class='serviceconcept_title'></span>
	<span class="activity_content_wrap">
		Selected Activity : 
	</span>
	<span class="activity_content w3-container w3-section w3-border w3-border-blue" style='overflow:scroll; overflow-x:hidden'></span>
	<span>
		<a class='close_btn' title='Close'>
			<img class='modalCloseImg simplemodal-close close_btn_pic resetSbpData2' src="/skkupss/smarteditor/img/btn_close.png" onclick="hidePSSD();" />
		</a>
	</span>
	<iframe class="sbpline" src=""></iframe>
	<!--<button class="dataEnsure2 simplemodal-close" type="button" onclick="dataEnsure2();">확인</button>-->
	<span class="btn_gray dataEnsure2 simplemodal-close cursor" onclick="dataEnsure2();">
		<span class="txt_btn_start"></span>
		<span class="txt_btn_center">확인</span>
		<span class="txt_btn_end"></span>
	</span>
	<!--<button class="disConnect simplemodal-close" type="button" onclick="disConnect();">SBP와 연결해제</button>-->
	<span class="btn_gray disConnect cursor" onclick="disConnect_check();">
		<span class="txt_btn_start"></span>
		<span class="txt_btn_center">SBP와 연결해제</span>
		<span class="txt_btn_end"></span>
	</span>
</div>

<!--SBP 와 연결끊기 확인 modal -->
<div>
	<div id="SBP_DisConnect_Modal" class="modal" style="display:none;">
		<div class="sbp-disconnect-modal-content" style="display:none;">
			<div style="text-align:center;">SBP와의 연결을 해제합니다.</div> 
			<div style="text-align:center; margin-top:5px;">계속 하시겠습니까?</div>
			<div style="margin-top:20px; text-align:center;">
				<button type="button" class="button blue simplemodal-close" style="width:35px;" onclick="disConnect();">예</button>
				<button type="button" class="button blue" style="width:45px;" onclick="disConnect_Cancel();">아니오</button>
			</div>
		</div>
	</div>
</div>

