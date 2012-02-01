(function($) {
	$.fn.Validation = function() { };
	$.Validation = {
		Language: function() {
			$.Validation.Rules = {
				"required": {
					"text": "* This field is required",
					check: function(caller) {
						var callerType = caller.attr("type"); var notifyOn; var isError = false;
						if (callerType == "text") {
							if (!caller.val()) {
								notifyOn = caller.parent().parent();
								isError = true;
							}
						}
						if (callerType == "radio" || callerType == "checkbox") {
							if (!$("#" + caller.attr("id")).is(":checked")) {
								isError = true;
							}
							if (callerType == "radio") {
								notifyOn = caller.parent().parent().parent().parent().parent().parent();
							}
							if (callerType == "checkbox") {
								if (caller.parent().parent().hasClass("fee")) {
									notifyOn = caller.parent().parent().parent().parent();
								} else {
								    notifyOn = caller.parent().parent().parent();
							    }
						}
						}
						if (callerType == "select-one") { // added by paul@kinetek.net for select boxes, Thank you		
							if (!$(caller).val()) {
								isError = true;
								notifyOn = caller.parent().parent();
							}
						}
						if (callerType == "select-multiple") { // added by paul@kinetek.net for select boxes, Thank you	
							if (!$(caller).find("option:selected").val()) {
								isError = true;
								notifyOn = caller.parent().parent();
							}
						}
						var obj = { "isError": isError, notifyOn: notifyOn, caller: caller };
						return obj;
					}
				},
				"length": {
					"text": "This field must be between $1 and $2 characters in length"
				},
				"match": {
					"text": "* This field must match with $1"
				},
				"email": {
					"regex": "/^[a-zA-Z0-9_\.\-]+\@([a-zA-Z0-9\-]+\.)+[a-zA-Z0-9]{2,4}$/",
					"text": "* Invalid email address"
				},
				"digits": {
					"regex": "/^[0-9\ ]+$/",
					"text": "* Digits only"
				},
				"alphanumeric": {
					"regex": "/^[0-9a-zA-Z]+$/",
					"text": "* This field can contain only letters and numbers"
				}
			};
		}
	};
})(jQuery);

$(document).ready(function() {
	$.Validation.Language();
});