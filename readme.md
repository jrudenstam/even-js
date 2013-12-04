# Even JS
Even JS is a vanilla module that will make elements same height. Typically useful to make items in slider the same height or collumns with content.

## Usage
You can optionally define groups with <code>data-even-group</code>-attribute to level different gruop on the same page.
Basic usage:
<pre>
&lt;div class="even" data-even-group="wathever"&gt;
	&lt;p&gt;Some content&lt;/p&gt;
&lt;/div&gt;
&lt;div class="even" data-even-group="wathever"&gt;
	&lt;p&gt;Some content&lt;/p&gt;
&lt;/div&gt;
</pre>
Initalize Even JS
<pre>
require(['even'], function( even ){
	even.init();

	// Or with settings if you need to replace 
	// class name or disable recalculation on resize
	even.init({
		domClass: 'even',
		dataGroup: 'data-even-group',
		setOnResize: true
	});
});
</pre>

## Dependencies
Even JS uses Helper JS wich makes vanilla JavaScript development smoother.

## AMD
Even JS will expose itself to window if require.js is not used. The helper dependency should work since Helper JS does the same.