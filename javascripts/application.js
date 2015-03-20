$(function() {
  var zoom = d3.behavior
  .zoom()
  .scaleExtent([1, 8])
  .on("zoom", zoomed);

  var container = d3.select(".outer-container")
  .call(zoom);

  function zoomed() {
    var scale = d3.event.scale;
    var translateX = d3.event.translate[0];
    var translateY = d3.event.translate[1];

    var transformString = "translate(" + translateX + "px," + translateY + "px) scale(" + scale + ")";

    $('.container').css({
      "transform" : transformString,
      "-webkit-transform" : transformString,
      "-ms-transform" : transformString
    });
  }
});

