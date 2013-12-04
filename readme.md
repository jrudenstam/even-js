# Even JS
Even JS is a vanilla module that will make elements same height.

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
even.init();

// Or with settings
even.init({
	domClass: 'myEvenClass'
});
</pre>

## Dependencies
Even JS uses Helper JS wich makes vanilla JavaScript development smoother.