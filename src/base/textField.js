import React, { Component } from 'react';
import PropTypes from 'prop-types';
import MenuItem from 'material-ui/Menu/MenuItem';
import TextField from 'material-ui/TextField';
import textChange from './actions/textChange';
import validate from './validation';

class TextFieldGenerate extends Component {
  constructor(props) {
    super(props);
    this.state = this.props;
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.setState(textChange(this.state, e.target.value));
    if (this.state.validated)
      this.setState(validate(this.state, this.state.validations));
    return this.state.onChange(e.target.name, e.target.value);
  }

  render() {
    return (
      <TextField
        id={this.state.name}
        name={this.state.name}
        label={this.state.label}
        type={this.state.type}
        placeholder={this.state.placeholder}
        helperText={this.state.errorText || this.state.helperText}
        error={this.state.error || !!this.state.errorText}
        value={this.state.value}
        defaultValue={this.state.defaultValue}
        autoComplete={this.state.autoComplete}
        disabled={this.state.disabled}
        required={this.state.required}
        fullWidth={this.state.fullWidth}
        multiline={this.state.multiline}
        rows={this.state.rows}
        rowsMax={this.state.rowsMax}
        className={this.state.className}
        margin={this.state.margin}
        onChange={this.handleChange}
      />
    );
  }
}

export default TextFieldGenerate;
