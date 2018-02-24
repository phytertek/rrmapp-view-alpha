import React, { Component } from 'react';
import Input, { InputLabel } from 'material-ui/Input';
import { MenuItem } from 'material-ui/Menu';
import { FormControl, FormHelperText } from 'material-ui/Form';
import Select from 'material-ui/Select';

import textChange from './actions/textChange';
class SelectGenerate extends Component {
  constructor(props) {
    super(props);
    this.state = this.props;
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(e) {
    this.setState(textChange(this.state, e.target.value));
    return this.state.onChange(e.target.name, e.target.value);
  }
  render() {
    return (
      <FormControl
        error={this.state.error || !!this.state.errorText}
        style={{
          minWidth: 220,
          maxWidth: 300
        }}
      >
        <InputLabel htmlFor={`${this.state.name}-helper"`}>
          {this.state.name}
        </InputLabel>
        <Select
          fullWidth
          name={this.state.name}
          value={this.state.value}
          onChange={this.handleChange}
          // multiple={this.state.multiple}
          // displayEmpty={this.state.displayEmpty}
          input={
            <Input
              name={this.state.name}
              id={`${this.state.name}-helper`}
              readOnly={this.state.readOnly}
            />
          }
        >
          {!this.state.required && (
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
          )}
          {this.state.menuItems.map(item => (
            <MenuItem value={item.value} key={item.label}>
              {item.label}
            </MenuItem>
          ))}
        </Select>
        {(this.state.errorText || this.state.helperText) && (
          <FormHelperText>
            {this.state.errorText || this.state.helperText}
          </FormHelperText>
        )}
      </FormControl>
    );
  }
}

export default SelectGenerate;

// Attributes name, value, label, required, menuItems: [{ value, label }], errorText, helperText, readOnly, autoWidth, multiple
