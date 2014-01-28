$(function(){

	/* Notifications at the top of the page */
	$("#ex-1-info").on('click',function(){
		uNotify.notify('info','This is an information notification');
	});
	$("#ex-1-danger").on('click',function(){
		uNotify.notify('danger','This is an danger/error notification.  Click the button to hide me.',{
			message:{
				dismissable:true
			}
		});
	});

	/* Simple notifications */
	$("#ex-2-info").on('click',function(){
		uNotify.notify('info','This is an info notification.');
	});
	$("#ex-2-danger").on('click',function(){
		uNotify.notify('danger','This is a danger notification.');
	});
	$("#ex-2-success").on('click',function(){
		uNotify.notify('success','This is a success notification.');
	});
	$("#ex-2-warning").on('click',function(){
		uNotify.notify('warning','This is a warning notification.');
	});

	/* New type */
	var newTypeNotify = $.extend(true,{},uNotify);
	newTypeNotify.setDefaults({
		classes:{'purple':'alert alert-purple'}
	});
	$("#ex-3").on('click',function(){
		uNotify.notify('purple','This is a purple notification.');
	});

	/* Dismissable */
	$("#ex-4").on('click',function(){
		uNotify.notify('danger','Click me to hide',{
			message:{
				dismissable: true,
				additional_dismiss_classes:'not-spaced'
			}
		});
	});
	$("#ex-4-spaced").on('click',function(){
		uNotify.notify('danger','Click me to hide',{
			message:{
				dismissable: true,
			}
		});
	});

	/* Dismissable - custom text */
	$("#ex-5").on('click',function(){
		uNotify.notify('danger','Click me to hide',{
			message:{
				dismissable: true
			},
			dismiss:{
				text:'Go away!'
			}
		});
	});

	/* Dismissable - custom text */
	$("#ex-6").on('click',function(){
		uNotify.notify('success','Click me to hide',{
			message:{
				dismissable: true
			},
			dismiss:{
				markup: '<a class = "btn btn-default notify-dismiss"><span></span>!</button>',
				addContent:function(content){
					this.find('span').text(content);
				}
			}
		});
	});

	$("#ex-65").on('click',function(){
		uNotify.notify('success','Click me to hide',{
			message:{
				dismissable:true
			},
			dismiss:{
				add:function($dismiss){
					$dismiss.prependTo(this);
				}
			}
		});
	});

	/* Changing timeout */
	$("#ex-7").on('click',function(){
		uNotify.notify('success','Success is fleeting',{
			message:{
				timeout:500
			}
		});
	});

	/* Changing notification location */
	$("#ex-8").on('click',function(){
		var locationNotify = $.extend(true,{},uNotify);
		locationNotify.setDefaults({
			wrapper:{
				markup:'<div id = "location-notify-wrapper"></div>',
				selector:'#location-notify-wrapper',
				style: 'position:fixed;bottom:20px;right:20px;'
			}
		});
		locationNotify.setup();
		locationNotify.notify('success','In the bottom corner');
	});

	/* Adding additional classes */
	$("#ex-9").on('click',function(){
		uNotify.notify('warning','Thick',{
			message:{
				additional_classes: 'heavy'
			}
		});
	});

	/* Adding additional dismiss classes */
	$("#ex-10").on('click',function(){
		uNotify.notify('info','Colour co-ordinated',{
			message:{
				dismissable:true,
				additional_dismiss_classes:'btn-info'
			}
		});
	});

	/* Custom events */
	$("#ex-11").on('click',function(){
		uNotify.notify('success','Ta da!',{
			message:{
				additional_classes: 'animated'
			},
			on:{
				show:function(){
					this.addClass('bounceInDown');
					this.trigger('afterShow.unotify');
				},
				hide:function(){
					this.addClass('fadeOutUp');
					this.trigger('afterHide.unotify');
				},
				afterHide:function(){
					this.slideUp();
				}
			}
		});
	});
});