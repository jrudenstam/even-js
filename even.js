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
		define(['/js-helper/helper.js'], definition);
	} else {
		ctx["even"] = definition;
	}
})(function( helper ){
	var t, s; // Alias some stuff with these

	return {
		defaults: {
			domClass: 'even',
			dataGroup: 'data-even-group',
			setOnResize: true
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
			
			var higest = 0,
			needLevel = false;

			for (var i = nodeList.length - 1; i >= 0; i--) {
				// Reset height if it´s already been set
				nodeList[i].style.height = 'auto';

				if (nodeList[i].clientHeight > higest) {
					higest = nodeList[i].clientHeight;
				}

				if (nodeList[i].clientWidth < nodeList[i].parentNode.clientWidth) {
					needLevel = true;
				}
			};

			if (!needLevel) {
				return;
			}

			for (var i = nodeList.length - 1; i >= 0; i--) {
				nodeList[i].style.height = higest + 'px';
			};
		}
	}
}, this);