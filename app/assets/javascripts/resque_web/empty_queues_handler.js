/*jshint camelcase:false */
(function () {
  'use strict';

  var methods = {
    show_empty_queues: true

    , events: {
      onClick: function (evt) {
        if ($(evt.target).hasClass('show_hide_empty_queues')) {
          $('.loading_container').show();
          setTimeout(function() {$('.loading_container').hide()}, 2000);

          this.show_empty_queues = this.show_empty_queues? false : true;
          this.toggleEmptyQueues();
          sessionStorage.setItem("show_empty_queues", this.show_empty_queues);
        }
      }
      , filter: function () {
        return $.trim($(this).find('.size').text()) === "0";
      }
      , onAjaxComplete: function () {
        this.toggleEmptyQueues();
      }
    }
    , initialize: function () {
      this.bindEvents();
    }
    , bindEvents: function () {
      $(document).on('click', $.proxy(this.events.onClick, this));
      $(document).on('ajaxComplete', $.proxy(this.events.onAjaxComplete, this));
    }
    , toggleEmptyQueues: function () {
      if (location.hash == "#poll") {
        var show = sessionStorage.getItem("show_empty_queues");
      } else {
        var show = this.show_empty_queues;
      }

      var rows = $('.queues tbody tr').filter(this.events.filter);

      if ( (location.hash == ""      && show == false  ) ||
           (location.hash == "#poll" && show == "false")    ) {
        rows.hide();
      } else {
        rows.show();
      }
    }
  };
  $(document).ready(function () {
    methods.initialize();
  });
})();