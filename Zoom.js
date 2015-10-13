'use strict';

var React = require('react-native');

var {
  TouchableWithoutFeedback,
  Animated
} = React;


class Zoom extends React.createClass
{
  constructor(props) {
    super(props);
    this.state = {
        scale: new Animated.Value(1)
    }
    this.handlePressOut = this.handlePressOut.bind(this);
    this.handlePressIn  = this.handlePressIn.bind(this);
  }

  handlePressIn() {
      Animated.spring(this.state.scale, {
        toValue: this.props.zoomTo,
        friction: this.props.friction
      }).start();
  }

  handlePressOut() {
    Animated.spring(this.state.scale, {
      toValue: 1,
      friction: this.props.friction
    }).start(() => this.props.onPress);
  }

  render() {
    var style = this.props.style;
    style.transform = [{ scale: this.state.scale }]
    return (<TouchableWithoutFeedback onPressIn={this.handlePressIn} onPressOut={this.handlePressOut}>
               <Animated.View style={style}>
                 {this.props.children}
               </Animated.View>
             </TouchableWithoutFeedback>);
  }
}

Zoom.propTypes = {
    zoomTo: React.PropTypes.number.isRequired,
    onPress: React.PropTypes.func.isRequired,
    friction: React.PropTypes.number
}

Zoom.defaultProps = {
    style: {},
    friction: 10
}


module.exports = Zoom;
