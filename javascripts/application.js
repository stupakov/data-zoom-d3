$(function() {
  var initializeZoomBehavior = function(outerContainerSelector) {

    var scale; // the current scale level

    var zoom = d3.behavior
    .zoom()
    .scaleExtent([1, 8])
    .on("zoom", zoomed);

    var container = d3.select(outerContainerSelector).call(zoom);

    var makeBigOrLittle = function(element) {
      $element = $(element);
      if(elementZoomedAboveThreshold(element)) {
        $element.addClass("full").removeClass("summary");
      } else {
        $element.addClass("summary").removeClass("full");
      };
    };

    function zoomed() {
      scale = d3.event.scale;
      var translateX = d3.event.translate[0];
      var translateY = d3.event.translate[1];

      var transformString = "translate(" + translateX + "px," + translateY + "px) scale(" + scale + ")";

      $('.container').css({
        "transform" : transformString,
        "-webkit-transform" : transformString,
        "-ms-transform" : transformString
      });

      $('.node-container').each(function(_, element) { makeBigOrLittle(element)});
    }

    var elementZoomedAboveThreshold = function(element) {
      var threshold = 2;

      var elementScaleX = element.getBoundingClientRect().width / element.offsetWidth;

      return elementScaleX > threshold;
      // return scale > threshold; // shortcut if all things are considered to have the same zoom level
    }
  }

  initializeZoomBehavior(".outer-container");
});


// (ThingThatMakesHTMLAndInjectsIt = function(){}).prototype = {
  // initialize: function(bigOne, littleOne) {
    // this.bigOne = bigOne;
    // this.littleOne = littleOne;
  // }
// }
