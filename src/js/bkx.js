$(function ($) {
// 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, 233, 377, 610, 987
var fibonacci = [1, 2, 3, 5, 8, 13, 21, 34, 55, 89];

var datasets = {
      'label': '',
      'amount': 144,
      'icon': 'images/bike.svg'
    };
    datasets.children = [];

var bubbleColors = {
      'open': '#33FF33',
      'available': '#33FFFF',
      'unavailable': '#FF4455'
    };

var BKX = {

  init: function () {
    //this.loadData();
    this.loadSpreadsheet();
    this.bind();
  },

  bind: function () {
    $('.arrow-next').bind('click', function () {
      BKX.displayNextDataset();
    });

    $('.arrow-prev').bind('click', function () {
      BKX.displayPrevDataset();
    });

    $(window).bind('hashchange', function () {
      BKX.changeDataset();
    });
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
  },

  loadSpreadsheet: function () {
    var URL = "1JW-YJ_ySb0OGjVDBaOn93bJ8w4wPx_w56-AISJSjsjs";
    Tabletop.init({ key: URL, callback: BKX.dataSpeadsheet, simpleSheet: true });
  },

  dataSpeadsheet: function (data) {
    data.forEach(function (element) {
      BKX.addChildrenBubble(element);
    });
    BKX.bubbles(datasets);
    BKX.changeDataset();
  },

  addChildrenBubble: function (element) {
    if (!element.icon) {
      return;
    }

    /**
     * TODO 
     */

    var children = {
      'id': element.icon,
      'label': element.namedatasetnameasinthebkplatform,
      'color': bubbleColors[(element.open).toLowerCase()],
      'amount': parseInt(element.icon),
      'icon': './images/' + element.svgicon + '.svg',
      'dataset': element
    };
    
    datasets.children.push(children);
  },

  changeDataset: function () {
    /**
     * TODO for now we use the url path to detect with bubble is selected,
     * we should get a fancy way to check that.
     */
    var hash = window.location.hash,
        name = hash.split('/')[3],
        name = name.replace(/-/g,'');

    BKX.appendDataset(name);
  },

  appendDataset: function (name) {
    var data = BKX.findDataset(name),
        $content = $('.dataset'),
        html = '';

    // TODO remove data that we don't want from the spreadsheet
    delete data.rowNumber;
    delete data.dataset.icon;
    delete data.dataset.svgicon;

    $content.empty();
    $('.name').text(data.label);

    for (var col in data.dataset) {
      html = '<div class="data-content">'
          + '<span class="col-name">' + col
          + '</span><p class="col-value">'
          + data.dataset[col] + '</p>'
          + '</div>';
      $content.append(html);
    };

    BKX.displayFirstDataset();
  },

  findDataset: function (name) {
    var dataset = '',
        dataLabel = '';
    datasets.children.forEach( function (element) {
      // Remove line break and spaces
      dataLabel = element.label.replace(/(\r\n|\n|\r|\ )/gm,"");
      if (dataLabel === name) {
        dataset = element;
      }
    });
    return dataset;
  },

  displayFirstDataset: function () {
    $('.data-content').first().show();
  },

  displayNextDataset: function () {
    var $dataVisible = $('.data-content:visible');

    if ($dataVisible.next().length > 0) {
      $dataVisible.hide();
      $dataVisible.next().show();  
    }
  },

  displayPrevDataset: function () {
    var $dataVisible = $('.data-content:visible');

    if ($dataVisible.prev().length > 0) {
      $dataVisible.hide();
      $dataVisible.prev().show();  
    }
  }

};

$(function() {
    BKX.init();
});

}(window.jQuery));