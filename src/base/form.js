// component generator
import React, { Component } from 'react';
import { submit } from '../api';
import { textChange } from './actions';
import TextField from './textField';
const form = manifest => {
  return class FormComponent extends Component {
    constructor() {
      this.design = { ...manifest.design };
      this.state = {
        ...Object.keys(manifest.fields).reduce((rfo, fk) => {
          rfo[`label_${fk}`] = manifest.fields[fk].label;
          rfo[`value_${fk}`] = manifest.fields[fk].value;
          rfo[`name_${fk}`] = fk;
          rfo[`error_${fk}`] = false;
          rfo[`error_text_${fk}`] = null;
          rfo[`options_${fk}`] = {
            type: manifest.fields[fk].type,
            defaultValue: manifest.fields[fk].defaultValue,
            autoFocus: manifest.fields[fk].autoFocus,
            disabled: manifest.fields[fk].disabled,
            fullWidth: manifest.fields[fk].fullWidth,
            helperText: manifest.fields[fk].helperText,
            margin: manifest.fields[fk].margin,
            multiline: manifest.fields[fk].multiline,
            validated: manifest.fields[fk].validated,
            required: manifest.fields[fk].required,
            placeholder: manifest.fields[fk].placeholder
          };
          return rfo;
        }, {})
      };
    }
    textValueChange(e) {
      const { name, value } = e.target;
      this.setState(textChange(this.state, name, value));
    }
    submit() {}
    render() {
      return (
        <div>
          {Object.keys(manifestFields).map(fk => createField(fk))}
          {createButton('Submit', this.submit)}
        </div>
      );
    }
  };
};

const manifest = {
  design: {},
  fields: {
    firstName: {
      name: 'firstName',
      label: 'First Name',
      type: 'text',
      defaultValue: '', // auto
      autoFocus: true, // auto
      disabled: false, // auto
      error: false, // auto
      fullWidth: false, // auto
      helperText: '', // auto
      margin: 'normal', // auto
      multiline: 'false', // auto
      validated: true, // auto custom
      required: true, // auto
      placeholder: '', // auto
      value: null
    }
  }
};
