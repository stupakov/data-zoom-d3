$(function() {
  // summary is a string
  // full (optional) is an array of nodes
  // full does not yet support being anything other than a collection of other nodes
  var nodes = [
    {
      className: "galaxy-cluster-1",
      summary: "Bunch of galaxies",
      full: [
        {
          className: "galaxy-1",
          summary: "Sexy spiral galaxy",
          full: [{
            className: "solar-system-1",
            summary: "Uninhabited solar system"
          },
          {
            className: "solar-system-2",
            summary: "Solar system infested with aliens"
          }]
        },
        {
          className: "galaxy-2",
          summary: "Hungry starburst galaxy"
        }
      ]
    },
    {
      className: "galaxy-cluster-2",
      summary: "Another bunch of galaxies"
    }
  ];

  var DataNodeGroup = React.createClass({
    render: function() {
      var groupNodes = this.props.nodes.map(function (dataNode, idx) {
        return (
          <DataNode summary={dataNode.summary} full={dataNode.full} className={dataNode.className} key={idx} />
        );
      });

      return(
        <data-node-group>
          {groupNodes}
        </data-node-group>
      );
    }
  });

  var DataNode = React.createClass({
    render: function() {
      var fullNode;
      if(this.props.full) {
        fullNode =
          <DataFull>
            {this.props.full}
          </DataFull>
      }

      var summaryNode =
        <DataSummary
          content={this.props.summary}
          className={this.props.className}
        />

      return(
        <data-node>
          {fullNode}
          {summaryNode}
        </data-node>
      );
    }
  });

  var DataSummary = React.createClass({
    render: function() {
      return(
        <data-summary className={this.props.className}>
          {this.props.content}
        </data-summary>
      );
    }
  });

  var DataFull = React.createClass({
    render: function() {
      var childNodeGroup;
      if(this.props.children) {
        childNodeGroup = <DataNodeGroup nodes={this.props.children} />
      };

      return(
        <data-full>
          {childNodeGroup}
        </data-full>
      );
    }
  });

  React.render(
    <DataNodeGroup nodes={nodes} />,
    document.getElementById('container')
  );

  DataZoom.initializeZoomBehavior(".outer-container");
});
