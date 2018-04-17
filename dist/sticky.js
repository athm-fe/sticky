/*!
 * @autofe/sticky v0.1.0
 * (c) 2018 Autohome Inc.
 * Released under the MIT License.
 */
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('jquery')) :
	typeof define === 'function' && define.amd ? define(['jquery'], factory) :
	(global.AutoFE = global.AutoFE || {}, global.AutoFE.Sticky = factory(global.jQuery));
}(this, (function ($) { 'use strict';

$ = $ && $.hasOwnProperty('default') ? $['default'] : $;

/**
 * ------------------------------------------------------------------------
 * Constants
 * ------------------------------------------------------------------------
 */

var NAME = 'sticky';
var DATA_KEY = 'fe.sticky';
var EVENT_KEY = '.' + DATA_KEY;
var JQUERY_NO_CONFLICT = $.fn[NAME];

var Event = {
  TOP: 'top' + EVENT_KEY,
  BOTTOM: 'bottom' + EVENT_KEY,
  OFF: 'off' + EVENT_KEY,
  SCROLL: 'scroll' + EVENT_KEY
};

/**
 * ------------------------------------------------------------------------
 * Class Definition
 * ------------------------------------------------------------------------
 */

function Sticky(elem, options) {
  this.options = $.extend({}, Sticky.Default, options);
  this.$elem = $(elem);
  this.$target = $(window);

  this.$placeholder = null;
  this.initPosition = null;
  this.isActive = false;
  this.isInit = false;

  // set offset
  var offset = this.options.offset;
  if (typeof offset !== 'object') {
    offset = this.options.offset = {
      top: offset
    };
  }

  if (this.options.offsetTop != null) {
    offset.top = this.options.offsetTop;
  }
  if (this.options.offsetBottom != null) {
    offset.bottom = this.options.offsetBottom;
  }

  if (typeof offset.top === 'function') {
    offset.top = offset.top.call(this.$elem);
  }
  if (typeof offset.bottom === 'function') {
    offset.bottom = offset.bottom.call(this.$elem);
  }
  if (offset.top == null && offset.bottom == null) {
    offset.top = 0;
  }

  // check position
  this.$target.on(Event.SCROLL, $.proxy(this.checkPosition, this));
  this.checkPosition();
}

Sticky.Default = {};

Sticky.prototype.checkPosition = function () {
  if (!this.$elem.is(':visible')) {
    return;
  }

  var height = this.$elem.outerHeight();
  var position = this.initPosition;
  var scrollTop = this.$target.scrollTop();
  var targetHeight = this.$target.height();
  var offset = this.options.offset;

  if (this.isInit === false) {
    // create placeholder
    this.$placeholder = $('<div>').css({
      height: height,
      display: 'none'
    });
    this.$elem.after(this.$placeholder);

    // store the initial position
    position = this.initPosition = this.$elem.offset();

    // set init flag
    this.isInit = true;
  }

  if (offset.top != null && isFixedToTop()) {
    if (!this.isActive) {
      this.$elem.css({
        position: 'fixed',
        top: offset.top,
        bottom: ''
      });
      this.$placeholder.show();
      this.isActive = true;
      this.$elem.trigger(Event.TOP);
    }
  } else if (offset.bottom != null && isFixedToBottom()) {
    if (!this.isActive) {
      this.$elem.css({
        position: 'fixed',
        top: '',
        bottom: offset.bottom
      });
      this.$placeholder.show();
      this.isActive = true;
      this.$elem.trigger(Event.BOTTOM);
    }
  } else if (this.isActive) {
    this.$elem.css({
      position: '',
      top: '',
      bottom: ''
    });
    this.$placeholder.hide();
    this.isActive = false;
    this.$elem.trigger(Event.OFF);
  }

  function isFixedToTop() {
    return scrollTop + offset.top > position.top;
  }

  function isFixedToBottom() {
    return position.top + height > scrollTop + targetHeight - offset.bottom;
  }
};

/**
 * ------------------------------------------------------------------------
 * Plugin Definition
 * ------------------------------------------------------------------------
 */

function Plugin(config) {
  return this.each(function () {
    var $this = $(this);
    var data = $this.data(DATA_KEY);

    if (!data) {
      var _config = $.extend({}, Sticky.Default, $this.data(), typeof config === 'object' && config);
      data = new Sticky(this, _config);
      $this.data(DATA_KEY, data);
    }

    if (typeof config === 'string') {
      if (typeof data[config] === 'undefined') {
        throw new TypeError('No method named "' + config + '"');
      }
      data[config]();
    }
  });
}

/**
 * ------------------------------------------------------------------------
 * jQuery
 * ------------------------------------------------------------------------
 */

$.fn[NAME] = Plugin;
$.fn[NAME].Constructor = Sticky;
$.fn[NAME].noConflict = function () {
  $.fn[NAME] = JQUERY_NO_CONFLICT;
  return Plugin;
};

return Sticky;

})));
