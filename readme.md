# Even JS
Even JS is a vanilla module that will make elements same height.

## Usage
You can optionally define groups with <code>data-even-group</code>-attribute to level different gruop on the same page.
Basic usage:
<pre>
<div class="even" data-even-group="wathever">
	<p>Some content</p>
</div>
<div class="even" data-even-group="wathever">
	<p>Some content</p>
</div>
</pre>
Initalize Even JS
<pre>
even.init();

// Or with settings
even.init({
	domClass: 'myEvenClass'
});
</pre>

## Dependencies
Even JS uses Helper JS wich makes vanilla JavaScript development smoother.