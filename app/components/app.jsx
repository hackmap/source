import React from 'react'
import HackList from './list'
import Map from './map'

var App = React.createClass({
  setCurrentEvent: function(index) {
    if (this.state.currentEvent !== index) {
      this.setState({currentEvent: index});
    } else {
      this.setState({currentEvent: -1});
    }
  },

  loadEvents: function() {
    var request = new XMLHttpRequest();

    request.onreadystatechange = function() {
      if (request.readyState == request.DONE && request.status == 200) {
        var response = JSON.parse(request.responseText);
        this.setState({results: response});
      }
    }.bind(this);

    const url = 'http://hackmap.de/hackathons.json';
    request.open("GET", url);
    request.send();
  },

  getInitialState: function() {
    this.loadEvents();
    return {
      currentEvent: -1,
      results: [],
    };
  },

  render: function() {
    return (
      <div className="wrapper">
        <div className="paper-left">
          <HackList
            results={this.state.results}
            currentEvent={this.state.currentEvent}
            setCurrentEvent={this.setCurrentEvent.bind(this)}
          />
        </div>
        <div className="paper-right">
          <Map
            results={this.state.results}
            setCurrentEvent={this.setCurrentEvent.bind(this)}
            currentEvent={this.state.currentEvent}
          />
        </div>
      </div>
    )
  }
})

export default App