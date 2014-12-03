/*
 * even JS v0.12
 * Simple vanilla JS to make 
 * columns have equal height.
 *
 * Author: jrudenstam
 * http://typisktmig.se
 */

(function(definition, ctx){
	"use strict";

	if (typeof define === "function") {
		define(['../helper-js/helper'], definition);
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
			setTo: 'highest',
			disableAtOneCol: true,
			onBeforeEven: undefined,
			onAfterEven: undefined,
			groups: undefined
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
				var groupName = helper.getAttribute(all[i], s.dataGroup);
				if ( groupName ) {
					if ( t.collection[groupName] ) {
						t.collection[groupName].push(all[i]);
					} else {
						t.collection[groupName] = [];
						t.collection[groupName].push(all[i]);
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
				t.level(t.collection[group], group);
			}
		},

		getStyle: (function(){
			if ( window.getComputedStyle ) {
				return function ( elem, style ) {
					return window.getComputedStyle(elem)[style];
				}
			} else {
				return function ( elem, style ) {
					return elem.currentStyle[style];
				}
			}
		})(),

		level: function( nodeList, group ){
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

				// Set lowest and heigest vars
				if (nodeList[i].clientHeight > heights.highest) {
					heights.highest = nodeList[i].clientHeight;
				}

				if (nodeList[i].clientHeight < heights.lowest) {
					heights.lowest = nodeList[i].clientHeight;
				}
			};

			var target = heights[(s.groups[group] && s.groups[group].setTo) || s.setTo] || heights.highest;

			for (var i = nodeList.length - 1; i >= 0; i--) {
				var parent = nodeList[i].parentNode,
				parentPadding = parseInt(this.getStyle(parent, 'paddingLeft').split('px')[0], 10) + parseInt(this.getStyle(parent, 'paddingRight').split('px')[0], 10),
				elemMargin = parseInt(this.getStyle(nodeList[i], 'marginLeft').split('px')[0], 10) + parseInt(this.getStyle(nodeList[i], 'marginRight').split('px')[0], 10),
				isOneCol = nodeList[i].clientWidth === (parent.clientWidth-parentPadding-elemMargin);

				// Run even if were not at one collumn layout, run it if at
				// isOneCol and the 'disableAtOneCol' setting is set to false
				if ( !isOneCol || isOneCol && !(s.groups[group] && s.groups[group].disableAtOneCol || s.disableAtOneCol) ) {
					if ( (s.groups[group] && s.groups[group].onBeforeEven) || s.onBeforeEven ) {
						var cb = (s.groups[group] && s.groups[group].onBeforeEven) || s.onBeforeEven;
						 cb( nodeList[i] );
					}

					nodeList[i].style.height = target + 'px';

					if ( (s.groups[group] && s.groups[group].onAfterEven) || s.onAfterEven ) {
						var cb = (s.groups[group] && s.groups[group].onAfterEven) || s.onAfterEven;
						cb( nodeList[i] );
					}
				}
			};
		}
	}
}, this);