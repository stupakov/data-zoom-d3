var setUpCustomElements = function() {

  var chooseVariantToShow = function(node, summarize) {
    if(summarize) {
      node.showSummary();
    } else {
      node.showFull();
    }
  };

  // TODO simplify boolean attribute - http://stackoverflow.com/questions/9201471/how-to-add-boolean-attribute-using-javascript
  var dataNodeProto = Object.create(HTMLElement.prototype, {
    createdCallback: {
      value: function() {
        this.summaryElement = this.querySelector('data-summary:first-of-type');
        this.fullElement = this.querySelector('data-full:first-of-type');

        chooseVariantToShow(this, this.getAttribute("summarize") !== "false");
      }
    },
    attributeChangedCallback: {
      value: function(attrName, oldVal, newVal) {
        if(attrName === "summarize") {
          chooseVariantToShow(this, newVal !== "false")
        }
      }
    },
    showSummary: {
      value: function() {
        this.summaryElement.classList.remove("data-node-hidden");
        this.fullElement.classList.add("data-node-hidden");
      }
    },
    showFull: {
      value: function() {
        this.fullElement.classList.remove("data-node-hidden");
        this.summaryElement.classList.add("data-node-hidden");
      }
    }
  });
  document.registerElement('data-node', {prototype: dataNodeProto});
}


$(function() {
  var documentScale; // the current scale level

  var zoom = d3.behavior
  .zoom()
  .scaleExtent([1, 16])
  .on("zoom", zoomed);

  var container = d3.select(".outer-container")
  .call(zoom);

  function zoomed() {
    documentScale = d3.event.scale;
    var translateX = d3.event.translate[0];
    var translateY = d3.event.translate[1];

    var transformString = "translate(" + translateX + "px," + translateY + "px) scale(" + documentScale + ")";

    // TODO use a library to handle multi-browser css
    $('.container').css({
      "transform" : transformString,
      "-webkit-transform" : transformString,
      "-ms-transform" : transformString
    });

    $('data-node').each(function(idx, element) {
      if(elementZoomedAboveThreshold(idx, element)) {
        element.showFull();
      } else {
        element.showSummary();
      };
    })
  }

  var elementZoomedAboveThreshold = function(idx, element) {
    var threshold = 2;

    var elementScaleX = element.getBoundingClientRect().width / element.offsetWidth;
    return elementScaleX > threshold;
  }

  setUpCustomElements();
});

