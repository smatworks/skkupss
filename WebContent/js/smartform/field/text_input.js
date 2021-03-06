try{
SmartWorks.FormRuntime = SmartWorks.FormRuntime || {};

SmartWorks.FormRuntime.TextInputBuilder = {};

SmartWorks.FormRuntime.TextInputBuilder.build = function(config) {
	var options = {
		mode : 'edit', // view or edit
		container : $('<div></div>'),
		entity : null,
		dataField : '',
		refreshData : false,
		layoutInstance : null,
		isDataGrid : false
	};

	SmartWorks.extend(options, config);
	if(!options.refreshData)
		options.container.html('');

	var value = (options.dataField && options.dataField.value) || '';
	var $entity = options.entity;
	var $graphic = $entity.find('graphic');
	var multiLines = parseInt($graphic.attr('multipleLines'));
	var readOnly = $graphic.attr('readOnly') === 'true' || options.mode === 'view';
	var id = $entity.attr('id');
	var name = $entity.attr('name');

	var labelWidth = (isEmpty(options.layoutInstance)) ? parseInt($graphic.attr('labelWidth')) : options.layoutInstance.getLabelWidth(id);
	var valueWidth = 100 - (options.isDataGrid ? 2 : labelWidth);
	var $label = $('<div class="form_label" style="width:' + labelWidth + '%"><span>' + name + '</span></div>');
	var required = $entity.attr('required');
	if(required === 'true' && !readOnly){
		$label.addClass('required_label');
		required = " class='fieldline required' ";
	}else{
		required = " class='fieldline' ";
	}
	if(!options.refreshData && !options.isDataGrid)
		$label.appendTo(options.container);
	
	var $text = null;
	if(readOnly){
		$text = $('<div class="form_value" fieldId="' + id + '" style="width:' + valueWidth + '%"><span>' + (isEmpty(value) ? '&nbsp;' : value) + '</span></div>');
	}else if(multiLines > 1){	
		$text = $('<div class="form_value" style="width:' + valueWidth + '%"><textarea rows="' + multiLines + '" name="' + id + '"' + required + '></textarea></div>');
		$text.find('textarea').attr('value', value);
		$text.attr('title', $entity.attr('toolTip'));
	}else{
		$text = $('<div class="form_value" style="width:' + valueWidth + '%"><input type="text" name="' + id + '"' + required + ' maxlength="125"></div>');
		$text.find('input').attr('value', value);		
		$text.attr('title', $entity.attr('toolTip'));
	}
	if ($graphic.attr('hidden') == 'true'){
		options.container.hide();
	}

	if(!options.refreshData){
		$text.appendTo(options.container);
	}else{
		if(readOnly)
			options.container.find('.form_value span').html(isEmpty(value) ? '&nbsp;' : value);
		else if(multiLines > 1)
			options.container.find('.form_value textarea').attr('value', value);			
		else
			options.container.find('.form_value input').attr('value', value);
	}
	if (readOnly) {
		var $textHiddenInput = options.container.find('#textHiddenInput' + id);
		if ($textHiddenInput.length === 0) {
			options.container.append('<input id="textHiddenInput'+id+'" type="hidden" name="' + id + '" value="' + value + '">');
		} else {
			$textHiddenInput.attr('value', value);
		}
	}
	
	var isHidden =  (options.dataField && options.dataField.isHidden) || null;
	var isReadOnly =  (options.dataField && options.dataField.isReadOnly) || null;
	var isRequired =  (options.dataField && options.dataField.isRequired) || null;
	if(options.refreshData && (isHidden || isRequired || isReadOnly)){
		var formLabel = options.container.find('.form_label:first');
		var formValue = options.container.find('.form_value:first');
		if(isHidden == 'true'){
			options.container.hide();
		}else if(isHidden == 'false'){
			options.container.show().parent().show();
		}
		
		if(options.mode == 'edit'){
			if(isReadOnly == 'true'){
				formValue.html('<span>' + (isEmpty(value) ? '&nbsp;' : value) + '</span>');
				var $textHiddenInput = options.container.find('#textHiddenInput' + id);
				if ($textHiddenInput.length === 0) {
					options.container.append('<input id="textHiddenInput'+id+'" type="hidden" name="' + id + '" value="' + value + '">');
				} else {
					$textHiddenInput.attr('value', value);
				}
				formValue.removeAttr('title');
				formLabel.removeClass('required_label');
			}else if(isReadOnly == 'false'){			
				if(multiLines > 1){	
					formValue.html('<textarea rows="' + multiLines + '" name="' + id + '"' + required + '></textarea>');
					formValue.find('textarea').attr('value', value);
				}else{
					formValue.html('<input type="text" name="' + id + '"' + required + ' maxlength="125">');
					formValue.find('input').attr('value', value);		
				}
				$('#textHiddenInput'+id).remove();
				formValue.attr('title', $entity.attr('toolTip'));
				if($entity.attr('required') === 'true')
					formLabel.addClass('required_label');
			}
				
			if(isRequired == 'true'){
				formLabel.addClass('required_label');
				formValue.find('input').addClass('required');
			}else if(isRequired == 'false'){
				formLabel.removeClass('required_label');
				formValue.find('input').removeClass('required');			
			}
		}
	}else if(isHidden){
		if(isHidden == 'true'){
			options.container.hide();
		}else if(isHidden == 'false'){
			options.container.show().parent().show();
		}		
	}
	
	return options.container;
};

SmartWorks.FormRuntime.TextInputBuilder.buildEx = function(config){
	var options = {
			container : $('<tr></tr>'),
			fieldId: '',
			fieldName: '',
			value: '',
			columns: 1,
			colSpan: 1, 
			multiLines: 1,
			required: false,
			readOnly: false		
	};
	SmartWorks.extend(options, config);

	var labelWidth = 12;
	if(options.columns >= 1 && options.columns <= 4 && options.colSpan <= options.columns) labelWidth = 12 * options.columns/options.colSpan;
	$formEntity =  $($.parseXML('<formEntity id="' + options.fieldId + '" name="' + options.fieldName + '" systemType="string" required="' + options.required + '" system="false">' +
						'<format type="textInput" viewingType="textInput"/>' +
					    '<graphic hidden="false" readOnly="'+ options.readOnly +'" labelWidth="'+ labelWidth + '" multipleLines="' + options.multiLines + '"/>' +
					'</formEntity>')).find('formEntity');
	var $formCol = $('<td class="form_col js_type_textInput" fieldid="' + options.fieldId+ '" colspan="' + options.colSpan + '" width="' + options.colSpan/options.columns*100 + '%" rowspan="1">');
	$formCol.appendTo(options.container);
	SmartWorks.FormRuntime.TextInputBuilder.build({
			mode : options.readOnly, // view or edit
			container : $formCol,
			entity : $formEntity,
			dataField : SmartWorks.FormRuntime.TextInputBuilder.dataField({
				fieldId: options.fieldId,
				value: options.value			
			})
	});
	
};

SmartWorks.FormRuntime.TextInputBuilder.dataField = function(config){
	var options = {
			fieldName: '',
			formXml: '',
			fieldId: '',
			value: ''
	};

	SmartWorks.extend(options, config);
	$formXml = isEmpty(options.formXml) ? [] : $($.parseXML(options.formXml)).find('form');
	var dataField = {};
	var fieldId = (isEmpty(options.fieldId)) ? $formXml.find('formEntity[name="'+options.fieldName+'"]').attr('id') : options.fieldId;
	if(isEmpty(fieldId)) fieldId = ($formXml.attr("name") === options.fieldName) ? $formXml.attr('id') : "";
	if(isEmpty(fieldId)) return dataField;
	
	dataField = {
			id: fieldId,
			value: options.value
	};
	return dataField;
};
}catch(error){
	smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[text_input script]', null, error);
}