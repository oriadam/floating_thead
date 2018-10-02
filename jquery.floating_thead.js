// https://github.com/oriadam/floating_thead v2.0
jQuery.fn.floating_thead = function (options)
{
	this.each(function ()
	{
		// init
		var $table = jQuery(this);
		var $thead = $table.find('thead');
		var $tbody = $table.find('tbody');
		if (!($thead.length || $tbody.length)) return;
		var $scrollParentForEvent = jQuery(options.scrollParent || $table.scrollParent());
		var $scrollParent = $scrollParentForEvent;
		if (!$scrollParentForEvent[0].style) // if scrollParent is window.document use <body> instead
			$scrollParent = jQuery('body');
		var $thead_children = $thead.find('th');
		var $tbody_children = $tbody.find('tr:first > td');
		var correct_top;

		function reset()
		{
			$tbody.css('transform', '');
			$thead.css({position: '', top: ''});
			$table.removeClass('floating_thead_on').data('floating_thead', null);
			$thead_children.add($tbody_children).css('width', '');
		}

		function on_scroll()
		{
			var floatingIsNeeded = $table.offset().top < $thead.height();
			if ($table.data('floating_thead') != floatingIsNeeded)
			{
				correct_top = Math.max(0, $table.offset().top || 0);
				$table.data('floating_thead', floatingIsNeeded);
				$tbody.css('transform', 'translate(0,' + $thead.height() + 'px)');
				if (floatingIsNeeded)
				{
					$thead_children.each(function (i, th)
					{
						var w = Math.max($tbody_children[i].offsetWidth, th.offsetWidth) + 'px';
						th.style.width = w;
						$tbody_children[i].style.width = w;
					});
					if ($scrollParent[0].offsetWidth < $scrollParent[0].scrollWidth) // has h-scrolling
						if ($thead.css('marginLeft') != -$scrollParent.scrollLeft())
							$thead.css('marginLeft', -$scrollParent.scrollLeft());
					$thead.css({position: 'fixed', top: correct_top});
				}
				else
				{
					reset();
				}
				$table.toggleClass('floating_thead_on', floatingIsNeeded);
			}
			options.on_scroll && options.on_scroll(floatingIsNeeded, $table, $thead);
		}

		reset();
		jQuery(window).on('resize', function ()
		{
			reset();
			on_scroll();
		});

		$scrollParentForEvent.on('scroll', function ()
		{
			on_scroll();
		});

		$table.on('floating_thead_refresh', function ()
		{
			reset();
			on_scroll();
		});
	});
	return this;
};
