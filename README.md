# floating_thead
Keep table head floating on screen while scrolling down the table.

Keywords: html jquery jqueryui javascript tables float thead sticky header

Usage:

    jQuery('table').floating_thead();

Advanced:

    jQuery('table').floating_thead({
        scrollParent: jQuery('body'), // this line is mandatory when jQueryUI is missing
        on_scroll: function (floatingIsNeeded, $table, $thead)
        {
            $thead.css('top', 59);
        }
    });
    
    // update table sizes
    jQuery('table').trigger('floating_thead_refresh');

Notes:
 * Nothing is cloned, only css is changed
 * When thead is fixed the table will have class `floating_thead_on`
 * Window resize will trigger recalculation of column widths
 * Scrolling element is detected using jQueryUI `.scrollParent()`. If jQueryUI is absent you must pass `scrollParent` in `options`
