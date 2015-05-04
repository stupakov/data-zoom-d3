$(function() {
  // summary is a string
  // full (optional) is an array of nodes
  // full does not yet support being anything other than a collection of other nodes
  var nodes = [
    {
      summary: "Cool Stuff",
      full: [
        {summary: "Cool thing 1"},
        {summary: "Cool thing 2"}
      ]
    },
    {
      summary: "Lame Stuff"
    }
  ];

  var DataNodeGroup = React.createClass({
    render: function() {
      var groupNodes = this.props.nodes.map(function (dataNode) {
        return (
          <DataNode summary={dataNode.summary} full={dataNode.full} />
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

      return(
        <data-node>
        <DataSummary content={this.props.summary} />
        {fullNode}
        </data-node>
      );
    }
  });

  var DataSummary = React.createClass({
    render: function() {
      return(
        <data-summary>
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
