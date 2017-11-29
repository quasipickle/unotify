var uNotify = {
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
			markup:'<button class = "btn btn-xs btn-default unotify-dismiss"></button>',
			selector:'.unotify-dismiss',
			text: 'OK',
			addContent:function(content){
				this.text(content);
			},
			add:function($dismiss){
				$dismiss.appendTo(this);
			}
		},
		notify:{
			markup: '<div></div>',
		},
		wrapper:{
			markup: '<div id = "unotify-wrapper"></div>',
			parent: 'body',
			selector: '#unotify-wrapper',
			style: 'position:fixed;top:20px;right:20px;'
		},
		message:{
			additional_classes: '',
			additional_dismiss_classes: '',
			dismissable: false,
			timeout: 3000,
			addContent:function(content){
				this.text(content);
			}
		},
		on:{
			beforeShow:function(){
				this.trigger('show.unotify');
			},
			show:function(){
				this.show();
				this.trigger('afterShow.unotify');
			},
			afterShow:function(){
				this.trigger('startTimeout.unotify');
			},
			dismiss:function(){
				this.trigger('beforeHide.unotify'); 
			},
			timeout:function(){ 
				this.trigger('beforeHide.unotify'); 
			},
			beforeHide:function(){
				this.trigger('hide.unotify');
			},
			hide:function(afterHide){
				this.slideUp(500,function(){
					this.remove();
					this.trigger('afterHide.unotify');
				}.bind(this));
			},
			afterHide:function(){
			}
		}
	},

	setDefaults: function(options){
		$.extend(true,this.defaults,options);
	},
	startTimeout:function(options){
		if(options.message.dismissable == false)
			setTimeout(options.on.timeout.bind(this),options.message.timeout);
	},
	setup: function(){
		$(this.defaults.wrapper.parent).append($(this.defaults.wrapper.markup));
		this.$wrapper = $(this.defaults.wrapper.selector);
		if(this.defaults.wrapper.style.length > 0)
			this.$wrapper.attr('style',this.defaults.wrapper.style);

		this.isSetup = true;
	},
	notify: function(type,message,options){
		var $elem,$dismiss;

		if(!this.isSetup)
			this.setup();

		options = $.extend(true,{},this.defaults,options);//true = deep copy

		// create message
		$elem = $(options.notify.markup).addClass(options.classes[type] + ' ' + options.message.additional_classes);
		options.message.addContent.bind($elem)(message);
					

		// add listeners
		$elem
			.on('startTimeout.unotify',this.startTimeout.bind($elem)(options))
			.on('beforeShow.unotify',options.on.beforeShow.bind($elem))
			.on('show.unotify',options.on.show.bind($elem))
			.on('afterShow.unotify',options.on.afterShow.bind($elem))
			.on('beforeHide.unotify',options.on.beforeHide.bind($elem))
			.on('hide.unotify',options.on.hide.bind($elem))
			.on('afterHide.unotify',options.on.afterHide.bind($elem));


		// add dismiss button if necessary
		if(options.message.dismissable){
			$dismiss = $(options.dismiss.markup)
						.addClass(options.message.additional_dismiss_classes)
						.on('click',function(){$(this).trigger('dismiss.unotify'); })
						.on('dismiss.unotify',options.on.dismiss.bind($elem))
		
			// add to the element
			options.dismiss.add.bind($elem)($dismiss);

			// add content
			options.dismiss.addContent.bind($dismiss)(options.dismiss.text);
		}

		$elem
			.appendTo(this.$wrapper)
			.trigger('beforeShow.unotify');
	}
};
