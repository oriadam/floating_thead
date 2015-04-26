# floating_thead
Keep tables header floating on screen while scrolling down the table.

Keywords: html jquery jqueryui javascript tables thead

To Setup:
 1. Add a proper thead tag to your table (only single thead is supported)
 2. Add jquery and jqueryui scripts
 3. Add the floating_thead.js script

Tech Notes:
 * The <thead> would be cloned to a new thead and added to the table.
 * The cloned <thead> has the class <code>floating_thead_pinned</code> and position:fixed.
 * The cloned <thead> would only appear when table is scrolled.
 * Scrolling element is detected using jQueryUI scrollParent() function.
