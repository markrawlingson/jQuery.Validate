(function($) {
	$.fn.Validate = function(settings) {
		settings = jQuery.extend({
			CallOn: this,
			CallOnEvent: "submit",
			Nofity: null
		}, settings);
		$.Validate.Settings = settings;
		this.each(function() {
			$.Validate.isError = false;
			if (!$.Validation) {
				$.Validate.Debug("The validation rules were not loaded successfully. Please check your file and try again.");
			}
			$.Validate.Settings.CallOn.bind($.Validate.Settings.CallOnEvent, function() {
				return !$.Validate.Form($(this));
			});
			for (var obj in $.Validation.Rules) {
				var rule = $.Validation.Rules[obj];
				if (rule.check) {
					$.each($("." + obj.toString()), function() {
						var callerType = $(this).attr("type");
						if (callerType == "text") {
							$(this).blur(function() {
								$.Validate.Object($(this), rule);
							});
						}
					});
				}
			}
		});
	};
	$.Validate = {
		Form: function(caller) {
			if (!$(caller).attr("id")) { $.Validate.Debug("This field has no ID attribute. Name = " + $(caller).attr("name") + ". Class = " + $(caller).attr("class")); }
			for (var obj in $.Validation.Rules) {
				var rule = $.Validation.Rules[obj];
				if (rule.check) {
					$.each($("." + obj.toString()), function() {
						var result = rule.check($(this));
						var isError = result.isError;
						if (isError) {
							var error = { caller: result.caller, notifyOn: result.notifyOn, "text": rule.text };
							$.Validate.Errors.push(error);
						} else {
							// rule validates, need to remove the obj from the Errors array
						}
						if (!$.Validate.isError) { // only need to set this if an error 
							$.Validate.isError = isError;
						}
					});
				}
			}
			if ($.Validate.isError) {
				$.Validate.Notify($.Validate.Errors);
			}
			return $.Validate.isError;
		},
		Object: function(caller, rule) {
			if (rule.check) {
				var result = rule.check(caller);
				var isError = result.isError;
				if (isError) {
					var error = { caller: result.caller, notifyOn: result.notifyOn, "text": rule.text };
					$.Validate.Errors.push(error);
				} else {
					// rule validates, need to remove the obj from the Errors array
					for (var i = 0; i < $.Validate.Errors.length; i++) {
						if ($.Validate.Errors.length[i].caller == caller) {
							$.Validate.Errors.length.splice(i, 1);
						}
					}
				}
				if (!$.Validate.isError) { // only need to set this if an error 
					$.Validate.isError = isError;
				}
			}
		},
		Notify: function(errors) {
			if (!$.Validate.Settings.Notify) {
				for (var obj in errors) {
					var error = errors[obj];
					error.notifyOn.addClass("validation-error");
					error.caller.addClass("caller").attr("title", error.text);
				}
			} else { $.Validate.Settings.Notify(errors); }
		},
		Errors: [],
		Debug: function(error) {
			if (!$("#debug")[0]) {
				$("body").append("<div id='debug'><div class='debugError'><strong>DEBUG MODE.<br />There was a problem with the initialization of this plugin. Please address the problems and refresh your page.</strong></div></div><br />");
			}
			$(".debugError").append("<div class='debugerror'>" + error + "</div>");
		}
	};
})(jQuery);