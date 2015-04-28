floating_thead_data=[]

function floating_thead_init() {
	jQuery('thead').each(function(){
		// init
		var data={}
		var thead=this
		var $thead=jQuery(thead)
		var $table=$thead.closest('table')
		if (!$table.length)	return
		if (!$table.scrollParent){
			console.log('floating_thead requires jQueryUI. Aborting :(')
			return
		}
		var $scrollParentForEvent=$table.scrollParent()
		var $scrollParent=$scrollParentForEvent
		if (!$scrollParentForEvent[0].style) // if scrollParent is window.document use <body> instead
			$scrollParent=jQuery('body')

		// runonce
		if ($scrollParent.data('floating_thead_runonce'))
			return
		$scrollParent.data('floating_thead_runonce',1)
		
		// clone thead
		var $thead_clone=$thead.clone().css({position:'fixed',margin:0}).hide().addClass('floating_thead_pinned').appendTo($table)

		// save in the global object. used by floating_thead_onscroll()
		data.$thead_clone=$thead_clone
		data.$thead_children=$thead.find('th,td')
		data.$thead_clone_children=$thead_clone.find('th,td')
		data.$thead=$thead
		data.$table=$table
		data.$scrollParent=$scrollParent
		floating_thead_data.push(data)

		// attach event
		$scrollParentForEvent.on('scroll',function(ev){
			//console.log('floating_thead attach scroll',data)
			floating_thead_onscroll(ev,data)
		})
	})
}

function floating_thead_onscroll(ev,data) {
	var scrollTop = data.$scrollParent.scrollTop()
	var thead_clone_top = data.$scrollParent.offset().top
	var floatingIsNeeded=scrollTop > 0
	floating_thead_last_data=data
	//console.log('floating_thead_onscroll',floatingIsNeeded,ev,data)

	if (floatingIsNeeded) {
		data.$thead_clone.css("top",thead_clone_top).show();
		if (!data.$thead.data('runonce')){
			data.$thead.data('runonce',1)
			data.$thead_clone.width(data.$thead.width())
			data.$thead_clone_children.each(function(i,clone){
				clone.style.width=data.$thead_children[i].offsetWidth+'px'
			})
		}
		if (data.$thead_clone.css('marginLeft')!=-data.$scrollParent.scrollLeft())
			data.$thead_clone.css('marginLeft',-data.$scrollParent.scrollLeft())
	}else{
		data.$thead_clone.hide()
		data.$thead.data('runonce',0)
	}
}

// run on load
jQuery(floating_thead_init);

