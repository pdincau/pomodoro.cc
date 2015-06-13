var React = require('react')
  , TimeFormatter = require('../modules/TimeFormatter')
  , Timer = require('../modules/Timer')
  , store = require('store')

module.exports = React.createClass({
  getInitialState: function() {
    return {
      time: TimeFormatter.formatSeconds(0),
      disabled25: false,
      disabled15: false,
      disabled5: false,
      startedAt: 0
    }
  },
  componentDidMount: function() {
    // debugger
    if( Timer.isInProgress() ){
      Timer.on('tick', this._tick.bind(this))
    } else {
      if( this.props.remaining > 0 && this.props.data ){
        Timer.start(this.props.remaining)
        Timer.on('tick', this._tick.bind(this))
      }
    }
    if( this.props.data && this.props.data.minutes ){
      var newState = {disabled25: true, disabled15: true,disabled5: true}
      if( this.props.data && this.props.data.minutes !== undefined ){
        newState['disabled'+this.props.data.minutes] = false
      }
      this.setState(newState)
    }
  },
  _resetButtons: function(){
    this.setState({disabled25: true, disabled15: true, disabled5: true })
  },
  _tick: function(){
    var time = TimeFormatter.formatSeconds(Timer.getRemaining())
    if( this.props.notify ){
      this.props.notify('tick', this.minutes, this.type, time)
    }
    this.setState({
      time: time,
    })
    // if( remaining <= 0 ){
    //   this._stop()
    // if( this.props.notify ){
    //     this.props.notify('end', this.minutes, this.type)
    //   }
    // }
  },
  _startStop: function(minutes, type){
    return function(){
      var eventName = Timer.isInProgress() ? 'end' : 'start'
      if( this.props.notify ){
        this.props.notify(eventName, minutes, type)
      }

      if( eventName === 'start' ) {
        this._start(minutes, type)
      }else{
        this._stop(minutes, type)
      }
    }.bind(this)
  },
  _start: function(minutes, type){
    if( !Timer.isInProgress() ){
      Timer.start(minutes*60)
      Timer.on('tick', this._tick.bind(this))
    }
    this.minutes = minutes
    this.type = type
    this._resetButtons()
    var disabledMinutes = {}
    disabledMinutes['disabled'+minutes] = false
    this.setState(disabledMinutes)
  },
  _stop: function(minutes, type){
    Timer.stop()
    this.setState({
      disabled25: false,
      disabled15: false,
      disabled5: false,
      time: TimeFormatter.formatSeconds(0)
    })
  },
  render: function(){
    return  <div className="pomodoro">
              <div className="timer">{this.state.time}</div>
              <div className="control-buttons-container">
                <button disabled={this.state.disabled25} onClick={this._startStop(25,"pomodoro")}>
                  <i className="icon pomodoro"></i>
                  <span>&nbsp; 25 min</span>
                </button>
                <button disabled={this.state.disabled5} onClick={this._startStop(5,"break")}>
                  <i className="icon ion-pause"></i>
                  <span>&nbsp; 5 min</span>
                </button>
                <button disabled={this.state.disabled15} onClick={this._startStop(15,"break")}>
                  <i className="icon ion-pause"></i>
                  <span>&nbsp; 15 min</span>
                </button>
              </div>
            </div>
  }
})
