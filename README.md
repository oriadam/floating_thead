# floating_thead
jQuery plugin to keep table header row on screen while scrolling down the table.
A `position:sticky` alternative/fallback.
jQueryUI is optional, will be used to get the scrollParent.

Usage:

    jQuery('table').floating_thead();

Advanced:

    jQuery('table').floating_thead({
        scrollParent: jQuery('body'), // this line is mandatory when jQueryUI is missing
        on_scroll: function ($table, $thead, $scrollParent)
        {
            $thead.css('margin-top', $scrollParent[0].scrollTop ? 60 : 0);
        }
    });
    
    // update table sizes
    jQuery('table').trigger('floating_thead_refresh');

Notes:
 * Nothing is cloned, only css is changed
 * When thead is fixed the table will have class `floating_thead_on`
 * Window resize will trigger recalculation of column widths
 * Scrolling element is detected using jQueryUI `.scrollParent()`. If jQueryUI is absent you must pass `scrollParent` in `options`
