/*
 * even JS v0.1
 * Simple vanilla JS to make 
 * columns have equal height.
 *
 * Author: jrudenstam
 * http://typisktmig.se
 */

(function(definition, ctx){
	"use strict";

	if (typeof define === "function") {
		define(['/helper-js/helper.js'], definition);
	} else {
		ctx["even"] = definition;
	}
})(function( helper ){
	helper = helper || window.helper; // Get the helper if not using AMD
	var t, s; // Alias some stuff with these

	return {
		defaults: {
			domClass: 'even',
			dataGroup: 'data-even-group',
			setOnResize: true,
			setTo: 'highest'
		},

		collection: {
			noGroup: []
		},

		init: function( settings ){
			// Assingn aliases
			t = this;
			t.settings = helper.create(t.defaults); // Extend settings
			s = t.settings;

			if (settings) {
				for (var setting in settings) {
					s[setting] = settings[setting];
				}
			}

			// Get elements
			var all = helper.getByClass(s.domClass, document, false);
			for (var i = 0; i < all.length; i++) {
				if ( helper.getAttribute(all[i], s.dataGroup) ) {
					if ( t.collection[helper.getAttribute(all[i], s.dataGroup)] ) {
						t.collection[helper.getAttribute(all[i], s.dataGroup)].push(all[i]);
					} else {
						t.collection[helper.getAttribute(all[i], s.dataGroup)] = [];
						t.collection[helper.getAttribute(all[i], s.dataGroup)].push(all[i]);
					}
				} else {
					t.collection.noGroup.push(all[i]);
				}
			};

			// Run the leveler
			t.go();

			if (s.setOnResize) {
				helper.addEvent(window, 'resize', t.go, t);
			}
		},

		go: function() {
			for (var group in t.collection) {
				t.level(t.collection[group]);
			}
		},

		level: function( nodeList ){
			// Escape quick if less than two elements are set to be equalized
			if (nodeList.length < 2) {
				return;
			}
			
			var heights = {
				highest: nodeList[0].clientHeight,
				lowest: nodeList[0].clientHeight
			};

			for (var i = nodeList.length - 1; i >= 0; i--) {
				// Reset height if it´s already been set
				nodeList[i].style.height = 'auto';

				if (nodeList[i].clientHeight > heights.highest) {
					heights.highest = nodeList[i].clientHeight;
				}

				if (nodeList[i].clientHeight < heights.lowest) {
					heights.lowest = nodeList[i].clientHeight;
				}
			};

			var target = heights[s.setTo] || heights.highest;

			for (var i = nodeList.length - 1; i >= 0; i--) {
				nodeList[i].style.height = target + 'px';
			};
		}
	}
}, this);