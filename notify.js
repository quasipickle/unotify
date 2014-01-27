var Notify = {
	$wrapper:null,
	isSetup:false,
	defaults: {
		classes:{
			'info': 	'alert alert-info',
			'danger': 	'alert alert-danger',
			'warning': 	'alert alert-warning',
			'success': 	'alert alert-success'
		},
		dismiss:{
			markup:'<button class = "btn btn-xs btn-default notify-dismiss"></button>',
			selector:'.notify-dismiss',
			text: 'OK',
			onDismiss:function(){}
		},
		notify:{
			markup: '<div></div>',
		},
		wrapper:{
			markup: '<div id = "notify-wrapper"></div>',
			parent: 'body',
			selector: '#notify-wrapper',
			additional_classes: ''
		},
		message:{
			additional_classes: '',
			additional_dismiss_classes: '',
			dismissable: false,
			timeout: 3000,
			onTimeout:function(){ this.hide(); }
		}
	},

	// other options that can be sent when calling notify():
	// "additional_classes": classes to be added to the message, in addition to those in the defaults.classes object
	// "additional_dismiss_classes": classes to be added to the dismiss button in addition to those in the dismiss
	// "dismissable": boolean if the item should be dismissable or not



	setup: function(options){
		$.extend(true,this.defaults,options);
		$(this.defaults.wrapper.parent).append($(this.defaults.wrapper.markup));
		this.$wrapper = $(this.defaults.wrapper.selector);
		if(this.defaults.wrapper.css)
			this.$wrapper.prop('style',this.defaults.wrapper.css);

		this.isSetup = true;
	},
	notify: function(type,message,options){
		if(!this.isSetup)
			this.setup();

		options = $.extend(true,{},this.defaults,options);//true = deep copy

		// create message
		var $elem = $(options.notify.markup)
						.addClass(options.classes[type] + ' ' + options.message.additional_classes)
						.text(message);

		// add dismiss button if necessary
		if(options.message.dismissable){
			var proxyFunction = $.proxy(options.dismiss.onDismiss,$elem);
			var $dismiss = $(options.dismiss.markup)
								.addClass(options.additional_dismiss_classes)
								.text(options.dismiss.text)
								.on('click',proxyFunction)
								.appendTo($elem);
		}
		// otherwise, hide it when necessary
		else{
			var proxyFunction = $.proxy(options.message.onTimeout,$elem);
			setTimeout(proxyFunction,options.message.timeout);
		}

		$elem.appendTo(this.$wrapper);
	}
};