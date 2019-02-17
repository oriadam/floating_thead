// https://github.com/oriadam/floating_thead v2.1
/**
 * Make thead sticky for a table
 * To trigger recalc call scrollParent.trigger('scroll')
 * @param options object {
 *		scrollParent: element that has the scroll. default = $table.scrollParnet()
 *		floating_on: true/false/function decide when to make the thead fixed
 *		on_scroll: function(floatingIsNeeded, $table, $thead); what to do when scroll is called
 * }
 * @returns {jQuery}
 */
jQuery.fn.floating_thead = function (options)
{
	this.each(function ()
	{
		// init
		if (!options)
			options = {};
		var $table = jQuery(this);
		var $thead, $tbody;
		var $scrollParentForEvent = options.scrollParent === undefined ? $table.scrollParent() : jQuery(options.scrollParent);
		var $scrollParent = $scrollParentForEvent;
		if ($scrollParentForEvent && !$scrollParentForEvent[0].style) // if scrollParent is window.document use <body> instead
			$scrollParent = jQuery('body');

		function reset()
		{
			$thead = $table.find('> thead');
			$tbody = $table.find('> tbody,> tfoot');
			$tbody.css('transform', '');
			$thead.css({position: '', top: '', left: ''});
			$table.removeClass('floating_thead_on').data('floating_thead_on', null);
			$table.find('th,td').css('width', '');
			if (floating_is_needed())
				$table.find('> thead > tr > th,> tbody > tr:first > td').each(function ()
				{
					jQuery(this).outerWidth(this.offsetWidth);
				});
		}

		function floating_is_needed()
		{
			if (options.floating_on === undefined)
			{
				var top = $scrollParent[0] === document.body ? $table[0].getBoundingClientRect().y : $table.offset().top;
				return top < $thead.height();
			}
			if (typeof options.floating_on === "function")
				return options.floating_on();
			return options.floating_on;
		}

		function on_scroll()
		{
			var floatingIsNeeded = floating_is_needed();
			$table.data('floating_thead_on', floatingIsNeeded);
			$table.toggleClass('floating_thead_on', floatingIsNeeded);
			if (floatingIsNeeded)
			{
				$tbody.css('transform', 'translate(0,' + $thead.height() + 'px)');
				$thead.css({
					position: 'fixed',
					top: Math.max(0, $table.offset().top || 0),
					left: $table.find('tbody')[0].getBoundingClientRect().left || 0
				});
			}
			options.on_scroll && options.on_scroll(floatingIsNeeded, $table, $thead);
		}

		jQuery(window).on('resize', function ()
		{
			reset();
			on_scroll();
		});

		$scrollParentForEvent && $scrollParentForEvent.on('scroll', on_scroll);

		$table.on('floating_thead_refresh', function ()
		{
			reset();
			on_scroll();
		}).trigger('floating_thead_refresh')
			.on('floating_thead_scroll', on_scroll);
	});
	return this;
};
