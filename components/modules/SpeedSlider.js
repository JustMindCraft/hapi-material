import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/lab/Slider';

const styles = {
  root: {
    width: 300,
  },
  slider: {
    padding: '22px 22px',
  },
};

class SpeedSlider extends React.Component {
  state = {
    value: 0,
  };

  handleChange = (event, value) => {
      this.props.getValue(value)
      
    this.setState({ value });
  };

  componentDidMount(){
      const { initThrottle } = this.props;
      
      this.setState({
          value: initThrottle*100
      })
  }

  render() {
    const { classes } = this.props;
    const { value } = this.state;

    return (
      <div className={classes.root}>
        <Typography id="label">收益速度:{value}%（速度过高页面容易卡顿）</Typography>
        <Slider
          classes={{ container: classes.slider }}
          value={value}
          max={100}
          min={10}
          aria-labelledby="label"
          onChange={this.handleChange}
        />
      </div>
    );
  }
}

SpeedSlider.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SpeedSlider);