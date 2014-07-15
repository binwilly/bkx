$(function ($) {


var BKX = {


  init: function () {
    this.loadData();
  },

  loadData: function () {
    
    $.getJSON("./data.json", function (data) {
      BKX.bubbles(data);
    }).fail(function() {
      console.log( "error" );
    });
  },
  bubbles: function (data) {
    BKX_config.data = data;
    window.bubbleTree = new BubbleTree(BKX_config, data);
  }
}

BKX.init();

}(window.jQuery));