// https://github.com/oriadam/floating_thead v2.2
/**
 * Make thead sticky for a table
 * To trigger recalc call scrollParent.trigger('scroll')
 * @param options object {
 * 		fixed: true/false: use 'fixed' or 'absolute' ?
 *		scrollParent: element that has the scroll. default = $table.scrollParnet()
 *		on_scroll: function($table, $thead); what to do after scroll was called
 *		on_before_scroll: function($table, $thead); what to do before running on_scroll logic
 *		on_reset: function($table, $thead); what to do after resetting all widths
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
		var $table = jQuery(this).addClass('floating_thead');
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
			$table.css('width', '').find('th,td').css('width', '');
			$table.offsetTop; // statement to make sure calling page repaint
			$table.width($table.width() - (options.fixed ? 0  : 0));
			$thead.width($table.width());
			$table.find('> thead > tr > th,> tbody > tr:first > td').each(function ()
			{
				jQuery(this).outerWidth(this.offsetWidth);
			});
			$thead.css({
				position: options.fixed ? 'fixed' : 'absolute',
				'z-index': +$thead.css('z-index') || 1
			});
			if (options.on_reset) options.on_reset($table, $thead);
			on_scroll();
		}

		function on_scroll()
		{
			options.on_before_scroll && options.on_before_scroll($table, $thead);
			$tbody.css('transform', 'translate(0,' + $thead.outerHeight(true) + 'px)');
			if (options.fixed)
				$thead.css({
					top: Math.max(0, $table[0].getBoundingClientRect().top),
					left: $table.find('tbody')[0].getBoundingClientRect().left
				});
			else
			{
				$thead.css({
					top: Math.max(0, $table[0].offsetTop) + $scrollParent[0].scrollTop,
					left: $table[0].offsetLeft
				});
				if ($scrollParent.css('position') === 'static')
					$scrollParent.css('position', 'relative');
			}
			options.on_scroll && options.on_scroll($table, $thead);
		}

		jQuery(window).on('resize', reset);
		$scrollParentForEvent && $scrollParentForEvent.on('scroll', on_scroll);
		$table.on('floating_thead_refresh', reset).on('floating_thead_scroll', on_scroll);
		reset();
	});
	return this;
};
