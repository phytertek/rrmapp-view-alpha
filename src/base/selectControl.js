import React, { Component } from 'react';
import Checkbox from 'material-ui/Checkbox';
import Radio, { RadioGroup } from 'material-ui/Radio';
import Switch from 'material-ui/Switch';
import {
  FormGroup,
  FormLabel,
  FormControl,
  FormControlLabel,
  FormHelperText
} from 'material-ui/Form';
import textChange from './actions/textChange';

class SelectOptionGenerate extends Component {
  constructor(props) {
    super(props);
    this.state = this.props;
  }
  handleChange = e => {
    this.setState(textChange(this.state, e.target.checked));
    return this.state.onChange(e.target.value, e.target.checked);
  };
  pickSelectOptionType(field) {
    switch (field.type) {
      case 'checkbox':
        return (
          <Checkbox
            checked={this.state.value}
            value={this.state.name}
            onChange={this.handleChange}
            color={this.state.color}
            indeterminate={this.state.indeterminate}
          />
        );
      case 'switch':
        return (
          <Switch
            checked={this.state.value}
            onChange={this.handleChange}
            value={this.state.name}
            color={this.state.color}
          />
        );
      default:
        return null;
    }
  }
  render() {
    return !!this.state.label ? (
      <FormControlLabel
        control={this.pickSelectOptionType(this.state)}
        label={this.state.label}
        disabled={this.state.disabled}
      />
    ) : (
      this.pickSelectOptionType(this.state)
    );
  }
}

export default SelectOptionGenerate;
