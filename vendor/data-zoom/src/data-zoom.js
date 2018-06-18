var DataZoom = (function() {
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
          // TODO: extract element objects
          if(this.fullElement) {
            this.fullElement.classList.add("data-node-hidden");
          }
        }
      },
      showFull: {
        value: function() {
          if(this.fullElement) {
            this.fullElement.classList.remove("data-node-hidden");
            this.summaryElement.classList.add("data-node-hidden");
          }
        }
      }
    });
    document.registerElement('data-node', {prototype: dataNodeProto});
  }

  var privateInitializeZoomBehavior = function(outerContainerSelector) {
    var documentScale; // the current scale level

    var zoom = d3.behavior
    .zoom()
    .scaleExtent([1, 16])
    .on("zoom", zoomed);

    var container = d3.select(outerContainerSelector).call(zoom);

    function zoomed() {
      documentScale = d3.event.scale;
      var translateX = d3.event.translate[0];
      var translateY = d3.event.translate[1];

      var transformString = "translate(" + translateX + "px," + translateY + "px) scale(" + documentScale + ")";

      // TODO use a library to handle multi-browser css
      $(outerContainerSelector).find('.container').css({
        "transform" : transformString,
        "-webkit-transform" : transformString,
        "-ms-transform" : transformString
      });

      $(outerContainerSelector).find('data-node').each(function(idx, element) {
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
  };

  // public funcitons
  return {
    initializeZoomBehavior: privateInitializeZoomBehavior
  }
})();
