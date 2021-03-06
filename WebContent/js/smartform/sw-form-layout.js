try{
SmartWorks.GridLayout = function(config) {
	this.options = {
		target : $('<div></div>'),
		formXml : '',
		formValues : '',
		mode : 'edit',
		first : null,
		requiredOnly : 'false',
		workId : null,
		formId : null,
		recordId : null,
		taskInstId : null,
		refreshData : null,
		onSuccess : null,
		isTempSaved : null,
		onError : null
	};
	
	this.$layout = null;
	this.$table = null;

	this.getColumnSize = function() {
		var columnSize = 0;
		if(isEmpty(this.$layout)) return columnSize;
		
		var grids = this.$layout.children('gridRow').first().children('gridCell');
		for ( var i = 0; i < grids.length; i++) {
			columnSize += parseInt(grids.eq(i).attr('span'));
		}
		return columnSize;
	};

	this.spanWidths = null;
	this.getLabelWidth = function(fieldId){
		if(isEmpty(this.$layout)) return 0;
		
		if(this.spanWidths == null){			
			var $gridColumns = this.$layout.find('gridColumn');
			var totalSize = 0.0;
			for(var i=0; i<$gridColumns.length; i++){
				totalSize = totalSize + parseFloat($($gridColumns[i]).attr('size'));
			}
			var spanWidths = new Array();
			for(var i=0; i<$gridColumns.length; i++){
				spanWidths.push(parseFloat($($gridColumns[i]).attr('size'))/totalSize*100.0);
			}
			this.spanWidths = spanWidths;
		}
		$column = this.$layout.find('gridCell[fieldId="'+ fieldId + '"]');

		var index = parseInt($column.attr('gridColumnIndex'));
		if(isNaN(index)) {
			index = $column.prevAll().length;
		}

		var span = parseInt($column.attr('span'));
		var columnWidth = 0;
		for(var i=index; i<this.spanWidths.length && i<index+span; i++){
			columnWidth = columnWidth + this.spanWidths[i];
		}
		return 12.0/columnWidth*100.0;
	};

	this.getTable = function() {
		return this.$table;
	};

	this.getLayout = function(formXml, formValues, mySelf, refreshTarget ,refreshOnly){
		var this_ = this;
		if(!isEmpty(mySelf)) this_ = mySelf;
		var $htmlForm = $('<form name="frmSmartForm" class="js_validation_required form_layout"><table></table></form>');
		this_.$table = $htmlForm.find('table');
		$form = [];
		if(!isEmpty(formXml)){
			$form = $($.parseXML(formXml)).find('form');
		}else{
			$form = $($.parseXML(this_.options.formXml)).find('form');
		}
		
		$htmlForm.attr("workId", this_.options.workId);
		$htmlForm.attr("taskInstId", this_.options.taskInstId);
		$htmlForm.attr("recordId", this_.options.recordId);
		$htmlForm.attr("formId", $form.attr('id'));
		$htmlForm.attr("formName", $form.attr('name'));
		var mode = this_.options.mode;
		if(isEmpty(refreshTarget) && !refreshOnly){
			$htmlForm.appendTo(this_.options.target);			
		}else if(!isEmpty(refreshTarget)){
			$htmlForm.appendTo(refreshTarget);
			mode = "edit";
		}
		this_.$layout = $form.find('layout');

		var $rows = this_.$layout.find('gridRow');
		var $columns = this_.$layout.find('columns gridColumn');

		var dataFields = this_.options.formValues.dataFields;
		if(!isEmpty(formValues)) dataFields = formValues.dataFields;
		var totalWidth = 0;
		for(var i = 0 ; i < $columns.length ; i++){
			totalWidth += parseFloat($columns.eq(i).attr('size'));
		}
		for ( var i = 0; i < $rows.length; i++) {
			var $row = $rows.eq(i);
			
			var $html_row = $('<tr class="vt"></tr>');
			var $cells = $row.children('gridCell');
			this_.$table.append($html_row);

			var visibleRow = false;
			var $activeRow = $html_row;
			for ( var j = 0; j < $cells.length; j++) {
				var $cell = $cells.eq(j);
				var id = $cell.attr('fieldId');
				var colspan = parseInt($cell.attr('span'));
				var rowspan = parseInt($cell.attr('rowspan'));			
				var width = 0;
				var dataField = null;
				for(var k in dataFields) {
					if(dataFields[k].id === id) {
						dataField = dataFields[k];
						break;
					}
				}
				if (isEmpty($columns)) {
					width = $column.attr('size');
				} else {
					for(var k = 0 ; k < colspan && (j+k) < $columns.length ; k++){
						width += parseFloat($columns.eq(j + k).attr('size'));
					}
				}
				
				var $html_cell = $('<td class="form_col" fieldId="'+id+'" colspan="'+colspan+'" width="'+width/totalWidth*100 +'%" ></td>');			
				if(refreshOnly)
					$html_cell = this_.options.target.find('.form_col[fieldId="' + id + '"]');
				else
					$html_cell.appendTo($html_row);					
				if(rowspan)
					$html_cell.attr('rowspan', rowspan);
				if(id) {
					var $entity = $form.find('formEntity[id="'+ id + '"]');
					SmartWorks.FormFieldBuilder.build(mode, $html_cell, $entity, dataField, this_, refreshOnly);
					if($html_cell.css("display") != "none"){
						visibleRow = true;
					}else if(!visibleRow && refreshOnly){
						$activeRow = $('#content form[name="frmSmartForm"] td[fieldId="' + id + '"]').parent();
					}
				}
					
			}
			if(!visibleRow){
				$activeRow.hide();
			}else{
			}
		}
		if(isEmpty(refreshTarget) || refreshOnly){
			if($.isFunction(this_.options.onSuccess)){
				this_.options.onSuccess();
				return;
			}
			return this_;
		}
	};
	
	SmartWorks.extend(this.options, config);
	var workId = this.options.workId;
	var formId = this.options.formId;
	var recordId = this.options.recordId;
	var taskInstId = this.options.taskInstId;
	var formValues = this.options.formValues;
	var onError = this.options.onError;
	var getLayout = this.getLayout;
	var refreshData = this.options.refreshData;
	var firstFlag = this.options.first;
	var isTempSaved = this.options.isTempSaved;
	var this_ = this;

	if(!isEmpty(refreshData)){
		$.ajax({
			url : "get_form_xml.sw",
			data : {
				workId : workId,
				formId : formId
			},
			success : function(formXml, status, jqXHR) {
				$.ajax({
					url : "refresh_record.sw",
					contentType : 'application/json',
					type : 'POST',
					data : JSON.stringify(refreshData),
					success : function(formData, status, jqXHR) {
						var comingTasksTarget = this_.options.target.parents('.js_instance_tasks').find('.js_coming_pwork_tasks');
						if(!isEmpty(comingTasksTarget) && this_.options.mode==="edit" && !isEmpty(taskInstId)){
							var paramsJson = {};
							paramsJson['taskInstId'] = taskInstId;
							paramsJson['record'] = formData.recordXml;
							$.ajax({
								url : "get_coming_pwork_tasks.sw",
								contentType : 'application/json',
								type : 'POST',
								data : JSON.stringify(paramsJson),
								success : function(data, status, jqXHR) {
									comingTasksTarget.html(data).parents('.js_coming_tasks').show();	
								},
								error : function(xhr, ajaxOptions, e) {
									return;
								}
							});
								
						}
						return getLayout(formXml, formData.record, this_, null, true);
					},
					error : function(xhr, ajaxOptions, e) {
						smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-form-layout script]', null, e);
						return;
					}
				});					
			},
			error : function(xhr, ajaxOptions, thrownError){
				if($.isFunction(onError))
					onError(xhr, ajaxOptions, thrownError);
				else
					smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-form-layout script]', null, thrownError);					
				return;
			}
		});
	}else if(isEmpty(this.options.formXml) && !isEmpty(this.options.workId)){
		this.options.target.html('');
		$.ajax({
			url : "get_form_xml.sw",
			data : {
				workId : workId,
				formId : formId
			},
			success : function(formXml, status, jqXHR) {
				if(isEmpty(formValues) && (!isEmpty(workId)) && (!isEmpty(recordId))){
					$.ajax({
						url : "get_record.sw",
						data : {
							workId : workId,
							recordId : recordId
						},
						success : function(formData, status, jqXHR) {
//							var refreshTarget = this_.options.target.hide();
//							getLayout(formXml, formData.record, this_, refreshTarget);
							var refreshTarget = null;
							if(this_.options.mode==="edit"){
								refreshTarget = this_.options.target.hide();
								getLayout(formXml, formData.record, this_, refreshTarget);
							}else{
								this_.options.target.html('').show();
								return getLayout(formXml, formData.record, this_);										
							}

							var forms = this_.options.target.find('form');
							var paramsJson = {};
							paramsJson['workId'] = workId;
							paramsJson['recordId'] = recordId;
							if(this_.options.mode==="edit" && !isEmpty(taskInstId)){
								paramsJson['projectionId'] = taskInstId;
							}
							for(var i=0; i<forms.length; i++){
								var form = $(forms[i]);
								
								// 폼이 스마트폼이면 formId와 formName 값을 전달한다...
								if(form.attr('name') === 'frmSmartForm'){
									paramsJson['formId'] = form.attr('formId');
									paramsJson['formName'] = form.attr('formName');
								}
								
								// 폼이름 키값으로 하여 해당 폼에 있는 모든 입력항목들을 JSON형식으로 Serialize 한다...
								paramsJson[form.attr('name')] = mergeObjects(form.serializeObject(), SmartWorks.GridLayout.serializeObject(form, false));
							}
							$.ajax({
								url : "refresh_record.sw",
								contentType : 'application/json',
								type : 'POST',
								data : JSON.stringify(paramsJson),
								success : function(refreshData, status, jqXHR) {
									var comingTasksTarget = this_.options.target.parents('.js_instance_tasks').find('.js_coming_pwork_tasks');
									if(!isEmpty(comingTasksTarget) && this_.options.mode==="edit" && !isEmpty(taskInstId)){
										var paramsJson = {};
										paramsJson['taskInstId'] = taskInstId;
										paramsJson['record'] = refreshData.recordXml;
										$.ajax({
											url : "get_coming_pwork_tasks.sw",
											contentType : 'application/json',
											type : 'POST',
											data : JSON.stringify(paramsJson),
											success : function(data, status, jqXHR) {
												comingTasksTarget.html(data).parents('.js_coming_tasks').show();	
											},
											error : function(xhr, ajaxOptions, e) {
												return;
											}
										});
											
									}
									if(this_.options.mode==="edit"){
										this_.options.target.show();
										return getLayout(formXml, refreshData.record, this_, null, true);
									}else{
										this_.options.target.html('').show();
										return getLayout(formXml, refreshData.record, this_);										
									}
								},
								error : function(xhr, ajaxOptions, e) {
									if(this_.options.mode==="edit"){
										this_.options.target.show();
									}else{
										this_.options.target.html('').show();
										return getLayout(formXml, formData.record, this_);										
									}
									smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-form-layout script]', null, e);
								}
							});					
						},
						error : function(){
							return getLayout(formXml, null, this_);
						}
					});
				}else if(isEmpty(formValues) && (!isEmpty(workId)) && (!isEmpty(taskInstId))){
						$.ajax({
							url : "get_record.sw",
							data : {
								workId : workId,
								taskInstId : taskInstId,
								isTempSaved : isTempSaved
							},
							success : function(formData, status, jqXHR) {
//								var refreshTarget = this_.options.target.hide();
//								getLayout(formXml, formData.record, this_, refreshTarget);
								var refreshTarget = null;
								if(this_.options.mode==="edit"){
									refreshTarget = this_.options.target.hide();
									getLayout(formXml, formData.record, this_, refreshTarget);
								}else{
									this_.options.target.html('').show();
									return getLayout(formXml, formData.record, this_);										
								}

								var forms = this_.options.target.find('form');
								var paramsJson = {};
								paramsJson['workId'] = workId;
								paramsJson['taskInstId'] = taskInstId;
								if(this_.options.mode==="edit" && !isEmpty(taskInstId)){
									paramsJson['projectionId'] = taskInstId;
								}
								for(var i=0; i<forms.length; i++){
									var form = $(forms[i]);
									
									// 폼이 스마트폼이면 formId와 formName 값을 전달한다...
									if(form.attr('name') === 'frmSmartForm'){
										paramsJson['formId'] = form.attr('formId');
										paramsJson['formName'] = form.attr('formName');
									}
									
									// 폼이름 키값으로 하여 해당 폼에 있는 모든 입력항목들을 JSON형식으로 Serialize 한다...
									paramsJson[form.attr('name')] = mergeObjects(form.serializeObject(), SmartWorks.GridLayout.serializeObject(form, false));
								}
								$.ajax({
									url : "refresh_record.sw",
									contentType : 'application/json',
									type : 'POST',
									data : JSON.stringify(paramsJson),
									success : function(refreshData, status, jqXHR) {
										var comingTasksTarget = this_.options.target.parents('.js_instance_tasks').find('.js_coming_pwork_tasks');
										if(!isEmpty(comingTasksTarget) && this_.options.mode==="edit" && !isEmpty(taskInstId)){
											var paramsJson = {};
											paramsJson['taskInstId'] = taskInstId;
											paramsJson['record'] = refreshData.recordXml;
											$.ajax({
												url : "get_coming_pwork_tasks.sw",
												contentType : 'application/json',
												type : 'POST',
												data : JSON.stringify(paramsJson),
												success : function(data, status, jqXHR) {
													comingTasksTarget.html(data).parents('.js_coming_tasks').show();	
												},
												error : function(xhr, ajaxOptions, e) {
													return;
												}
											});
												
										}
										if(this_.options.mode==="edit"){
											this_.options.target.show();
											return getLayout(formXml, refreshData.record, this_, null, true);
										}else{
											this_.options.target.html('').show();
											return getLayout(formXml, refreshData.record, this_);										
										}
									},
									error : function(xhr, ajaxOptions, e) {
										if(this_.options.mode==="edit"){
											this_.options.target.show();
										}else{
											this_.options.target.html('').show();
											return getLayout(formXml, formData.record, this_);										
										}
									}
								});					
							},
							error : function(){
								return getLayout(formXml, null, this_);
							}
						});
				}else{
//					var refreshTarget = this_.options.target.hide();
//					getLayout(formXml, null, this_, refreshTarget);
					var refreshTarget = null;
					if(this_.options.mode==="edit"){
						refreshTarget = this_.options.target.hide();
						getLayout(formXml, null, this_, refreshTarget);
					}else{
						this_.options.target.html('').show();
						return getLayout(formXml, null, this_);										
					}

					var forms = this_.options.target.find('form');
					var paramsJson = {};
					paramsJson['workId'] = workId;
					if(this_.options.mode==="edit" && !isEmpty(taskInstId)){
						paramsJson['projectionId'] = taskInstId;
					}
					for(var i=0; i<forms.length; i++){
						var form = $(forms[i]);
						
						// 폼이 스마트폼이면 formId와 formName 값을 전달한다...
						if(form.attr('name') === 'frmSmartForm'){
							paramsJson['formId'] = form.attr('formId');
							paramsJson['formName'] = form.attr('formName');
						}
						
						// 폼이름 키값으로 하여 해당 폼에 있는 모든 입력항목들을 JSON형식으로 Serialize 한다...
						paramsJson[form.attr('name')] = mergeObjects(form.serializeObject(), SmartWorks.GridLayout.serializeObject(form, false));
					}
					$.ajax({
						url : "refresh_record.sw",
						contentType : 'application/json',
						type : 'POST',
						data : JSON.stringify(paramsJson),
						success : function(refreshData, status, jqXHR) {
							var comingTasksTarget = this_.options.target.parents('.js_instance_tasks').find('.js_coming_pwork_tasks');
							if(!isEmpty(comingTasksTarget) && this_.options.mode==="edit" && !isEmpty(taskInstId)){
								var paramsJson = {};
								paramsJson['taskInstId'] = taskInstId;
								paramsJson['record'] = refreshData.recordXml;
								$.ajax({
									url : "get_coming_pwork_tasks.sw",
									contentType : 'application/json',
									type : 'POST',
									data : JSON.stringify(paramsJson),
									success : function(data, status, jqXHR) {
										comingTasksTarget.html(data).parents('.js_coming_tasks').show();	
									},
									error : function(xhr, ajaxOptions, e) {
										return;
									}
								});
									
							}
							if(this_.options.mode==="edit"){
								this_.options.target.show();
								return getLayout(formXml, refreshData.record, this_, null, true);
							}else{
								this_.options.target.html('').show();
								return getLayout(formXml, refreshData.record, this_);										
							}
						},
						error : function(xhr, ajaxOptions, e) {
							if(this_.options.mode==="edit"){
								this_.options.target.show();
							}else{
								this_.options.target.html('').show();
								return getLayout(formXml, formData.record, this_);										
							}
						}
					});					
				}
			},
			error : function(xhr, ajaxOptions, thrownError){
				if($.isFunction(onError))
					onError(xhr, ajaxOptions, thrownError);
				return;
			}
		});
	}else if(isEmpty(this.options.formValues) && (!isEmpty(this.options.workId)) && (!isEmpty(this.options.recordId))){
		this.options.target.html('');
		$.ajax({
			url : "get_record.sw",
			data : {
				workId : this.options.workId,
				recordId : this.options.recordId
			},
			success : function(formData, status, jqXHR) {
//				var refreshTarget = this_.options.target.hide();
//				getLayout(null, formData.record, this_, refreshTarget);
				var refreshTarget = null;
				if(this_.options.mode==="edit"){
					refreshTarget = this_.options.target.hide();
					getLayout(null, formData.record, this_, refreshTarget);
				}else{
					this_.options.target.html('').show();
					return getLayout(null, formData.record, this_);										
				}

				var forms = this_.options.target.find('form');
				var paramsJson = {};
				paramsJson['workId'] = this.options.workId;
				paramsJson['recordId'] = this.options.recordId;
				if(this_.options.mode==="edit" && !isEmpty(taskInstId)){
					paramsJson['projectionId'] = taskInstId;
				}
				for(var i=0; i<forms.length; i++){
					var form = $(forms[i]);
					
					// 폼이 스마트폼이면 formId와 formName 값을 전달한다...
					if(form.attr('name') === 'frmSmartForm'){
						paramsJson['formId'] = form.attr('formId');
						paramsJson['formName'] = form.attr('formName');
					}
					
					// 폼이름 키값으로 하여 해당 폼에 있는 모든 입력항목들을 JSON형식으로 Serialize 한다...
					paramsJson[form.attr('name')] = mergeObjects(form.serializeObject(), SmartWorks.GridLayout.serializeObject(form, false));
				}
				$.ajax({
					url : "refresh_record.sw",
					contentType : 'application/json',
					type : 'POST',
					data : JSON.stringify(paramsJson),
					success : function(refreshData, status, jqXHR) {
						var comingTasksTarget = this_.options.target.parents('.js_instance_tasks').find('.js_coming_pwork_tasks');
						if(!isEmpty(comingTasksTarget) && this_.options.mode==="edit" && !isEmpty(taskInstId)){
							var paramsJson = {};
							paramsJson['taskInstId'] = taskInstId;
							paramsJson['record'] = refreshData.recordXml;
							$.ajax({
								url : "get_coming_pwork_tasks.sw",
								contentType : 'application/json',
								type : 'POST',
								data : JSON.stringify(paramsJson),
								success : function(data, status, jqXHR) {
									comingTasksTarget.html(data).parents('.js_coming_tasks').show();	
								},
								error : function(xhr, ajaxOptions, e) {
									return;
								}
							});
								
						}
						if(this_.options.mode==="edit"){
							this_.options.target.show();
							return getLayout(formXml, refreshData.record, this_, null, true);
						}else{
							this_.options.target.html('').show();
							return getLayout(formXml, refreshData.record, this_);										
						}
					},
					error : function(xhr, ajaxOptions, e) {
						if(this_.options.mode==="edit"){
							this_.options.target.show();
						}else{
							this_.options.target.html('').show();
							return getLayout(formXml, formData.record, this_);										
						}
					}
				});					
			},
			error : function(xhr, ajaxOptions, thrownError){
				if($.isFunction(onError))
					onError(xhr, ajaxOptions, thrownError);
				return;
			}
		});
	}else{
		this.getLayout(null, null, null);
	}
	return this;
};

SmartWorks.GridLayout.newGridTable = function(){
	return $('<table><tbody></tbody></table>');
};

SmartWorks.GridLayout.newGridRow = function(){
	return $('<tr></tr>');
};


SmartWorks.GridLayout.serializeObject = function(form, valueChanged){
	if(valueChanged != false) valueChanged=true;
	var fileFields = SmartWorks.FormRuntime.FileFieldBuilder.serializeObject(form.find('.js_type_fileField'));
	var userFields = SmartWorks.FormRuntime.UserFieldBuilder.serializeObject(form.find('.js_type_userField'));
	var departmentFields = SmartWorks.FormRuntime.DepartmentFieldBuilder.serializeObject(form.find('.js_type_departmentField'));
	var richEditors = SmartWorks.FormRuntime.RichEditorBuilder.serializeObject(form.find('.js_type_richEditor'), valueChanged);
	var refFormFields = SmartWorks.FormRuntime.RefFormFieldBuilder.serializeObject(form.find('.js_type_refFormField'));
	var imageBoxs = SmartWorks.FormRuntime.ImageBoxBuilder.serializeObject(form.find('.js_type_imageBox'));
	var videoYTBoxs = SmartWorks.FormRuntime.VideoYTBoxBuilder.serializeObject(form.find('.js_type_videoYTBox'));
	var numberInputs = SmartWorks.FormRuntime.NumberInputBuilder.serializeObject(form.find('.js_type_numberInput'));
	var percentInputs = SmartWorks.FormRuntime.PercentInputBuilder.serializeObject(form.find('.js_type_percentInput'));
	var currencyInputs = SmartWorks.FormRuntime.CurrencyInputBuilder.serializeObject(form.find('.js_type_currencyInput'));
	var autoIndexs = SmartWorks.FormRuntime.AutoIndexBuilder.serializeObject(form.find('.js_type_autoIndex'));
	var dataGrids = SmartWorks.FormRuntime.DataGridBuilder.serializeObject(form.find('.js_type_dataGrid'));
	return merge3Objects(
			merge3Objects(fileFields, mergeObjects(userFields, departmentFields), richEditors), 
			merge3Objects(refFormFields, imageBoxs, videoYTBoxs), 
			merge3Objects(numberInputs, percentInputs, merge3Objects(currencyInputs, autoIndexs, dataGrids))
			);
};

SmartWorks.GridLayout.validate = function(form, messageTarget){
	var fileFields = SmartWorks.FormRuntime.FileFieldBuilder.validate(form.find('.js_type_fileField:visible'));
	var userFields = SmartWorks.FormRuntime.UserFieldBuilder.validate(form.find('.js_type_userField:visible'));
	var departmentFields = SmartWorks.FormRuntime.DepartmentFieldBuilder.validate(form.find('.js_type_departmentField:visible'));
	var richEditors = SmartWorks.FormRuntime.RichEditorBuilder.validate(form.find('.js_type_richEditor:visible'));
	var refFormFields = SmartWorks.FormRuntime.RefFormFieldBuilder.validate(form.find('.js_type_refFormField:visible'));
	var imageBoxs = SmartWorks.FormRuntime.ImageBoxBuilder.validate(form.find('.js_type_imageBox:visible'));
	var videoYTBoxs = SmartWorks.FormRuntime.VideoYTBoxBuilder.validate(form.find('.js_type_videoYTBox:visible'));
	var radioButtons = SmartWorks.FormRuntime.RadioButtonBuilder.validate(form.find('.js_type_radioButton:visible'));
	var numberInputs = SmartWorks.FormRuntime.NumberInputBuilder.validate(form.find('.js_type_numberInput:visible'));
	var percentInputs = SmartWorks.FormRuntime.PercentInputBuilder.validate(form.find('.js_type_percentInput:visible'));
	var currencyInputs = SmartWorks.FormRuntime.CurrencyInputBuilder.validate(form.find('.js_type_currencyInput:visible'));
	var dataGrids = SmartWorks.FormRuntime.DataGridBuilder.validate(form.find('.js_type_dataGrid:visible'));
	var jq_validate = true;
	
	if(messageTarget instanceof jQuery){
		$('.sw_error_message').hide();
		messageTarget.show();
	}
	form.each(function(){
		jq_validate = $(this).validate({ showErrors: showErrors, ignore:":not(:visible)" }).form() && jq_validate;
	});

	var sw_validate = (fileFields && userFields && departmentFields && richEditors && refFormFields && imageBoxs && videoYTBoxs && dataGrids && radioButtons && numberInputs && percentInputs && currencyInputs && dataGrids && jq_validate);
	if(!sw_validate || !jq_validate){
		showErrors();
	}
	if(!sw_validate && $(".sw_error_message:visible:first").html() === "")
		$(".sw_error_message:visible:first").html("보이지 않는 항목중에 입력되지 않은 항목이 있습니다. 관리자에게 문의하시기 바랍니다!!!");
	if(messageTarget instanceof jQuery) $('.sw_error_message').show();

	return sw_validate;
};

SmartWorks.GridLayout.getLayout = function(){
	
};
}catch(error){
	smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-form-layout script]', null, error);
}