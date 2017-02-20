import React from 'react'
import {List, ListItem} from 'material-ui/List';
import ActionInfo from 'material-ui/svg-icons/action/info';
import Divider from 'material-ui/Divider';
import FontIcon from 'material-ui/FontIcon';
import RaisedButton from 'material-ui/RaisedButton';

var HackDescription = React.createClass({
  convertDateTime: function(date) {
    return new Date(date).toLocaleString('de-DE');
  },

  render: function() {
    return (
      <div className="description">
        <p>
          {this.props.data.description}
        </p>
        <p className="hd--fb-parent">
          <FontIcon className="material-icons hd--fb-item">schedule</FontIcon>
          <span className="hd--fb-item">{this.convertDateTime(this.props.data.start)} - {this.convertDateTime(this.props.data.end)}</span>
        </p>
        <p className="hd--fb-parent">
          <FontIcon className="material-icons hd--fb-item">room</FontIcon>
          <span className="hd--fb-item">{this.props.data.location}</span>
        </p>
        <p className="hd--fb-parent">
          <FontIcon className="material-icons hd--fb-item">group</FontIcon>
          <span className="hd--fb-item">{this.props.data.organizer}</span>
        </p>
        <p className="hd--fb-parent">
          <FontIcon className="material-icons hd--fb-item">http</FontIcon>
          <span className="hd--fb-item"><a href={this.props.data.url} target="_blank">{this.props.data.url}</a></span>
        </p>
      </div>
    )
  }
});

var HackItem = React.createClass({
  convertDate: function(date) {
    return new Date(date).toLocaleDateString('de-DE');
  },

  render: function() {
    return (
      <ListItem
        primaryText={this.props.result.name}
        secondaryText={this.convertDate(this.props.result.start)}
        rightIcon={<ActionInfo />}
        open={this.props.currentEvent === this.props.index}
        onClick={() => {this.props.setCurrentEvent()}}
        nestedItems={[
          <HackDescription
            data={this.props.result}
          />,
          <Divider />
        ]}
      />
    )
  }
})

var HackList = React.createClass({
  render: function() {
    var isCurrent= function(index) {
      return index === this.props.currentEvent;
    }.bind(this);

    var resultNodes = this.props.results.map(function(result, index) {
      return (<HackItem
                result={result}
                index={index}
                currentEvent={this.props.currentEvent}
                setCurrentEvent={() => {this.props.setCurrentEvent(index);}}
              />);
    }.bind(this));

    return (
      <List
        className="marker-list"
      >
        <RaisedButton
          className="submit-button"
          label="Add Your Event"
          primary={true}
          fullWidth={true}
          href="mailto:hello@hackmap.de?subject=New%20Hackathon&body=Name%3A%0ADescription%3A%0ALocation%3A%0ADate%3A%0AURL%3A"
        />
        {resultNodes}
      </List>
    )
  }
})

export default HackList
