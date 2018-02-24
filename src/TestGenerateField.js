import React, { Component } from 'react';
import Grid from 'material-ui/Grid';
import TextField from './base/textField';
import Select from './base/select';
import SelectControl from './base/selectControl';

class TextFieldForm extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleChange = this.handleChange.bind(this);
    this.buildState = this.buildState.bind(this);
  }
  componentWillMount() {
    this.buildState({
      firstName: {
        field: {
          name: 'firstName',
          label: 'First Name',
          value: '',
          type: 'text'
        }
      },
      lastName: {
        field: {
          name: 'lastName',
          label: 'Last Name',
          value: '',
          type: 'text'
        }
      },
      mobile: {
        field: {
          name: 'mobile',
          type: 'phone',
          label: 'Mobile',
          value: ''
        }
      },
      email: {
        field: {
          name: 'email',
          label: 'Email',
          value: '',
          type: 'email'
        }
      },
      password: {
        field: {
          name: 'password',
          label: 'Password',
          value: '',
          type: 'password'
        }
      },
      aSelectMenu: {
        field: {
          name: 'aSelectMenu',
          label: 'A Select Menu',
          autoWidth: true,
          value: '',
          type: 'select',
          menuItems: [
            { value: 2, label: 'Onesdafafas' },
            { value: 2, label: 'Twoasdasda' }
          ]
        }
      },
      aCheckbox: {
        field: {
          name: 'aCheckbox',
          label: 'A Checkbox',
          value: true,
          type: 'checkbox'
        }
      },
      aSwitch: {
        field: {
          name: 'aSwitch',
          label: 'A Switch ',
          value: true,
          type: 'switch'
        }
      }
    });
  }
  buildState(props) {
    const newState = {};
    Object.keys(props).forEach(key => {
      newState[key] = props[key];
      newState[key].field.onChange = this.handleChange;
    });
    this.setState(newState);
  }
  handleChange(key, value) {
    console.log(key, value);
    const newVal = { ...this.state[key] };
    newVal.value = value;
    this.setState({ ...this.state, [key]: newVal });
  }
  pickFieldType(field) {
    switch (true) {
      case ['text', 'email', 'phone', 'password', null].includes(field.type):
        return <TextField {...field} />;
      case 'select' === field.type:
        return <Select {...field} />;
      case ['checkbox', 'switch'].includes(field.type):
        return <SelectControl {...field} />;
      default:
        return null;
    }
  }
  render() {
    return (
      <div style={{ padding: 10 }}>
        <Grid container direction="column">
          {Object.keys(this.state).map(key => (
            <Grid item key={key} style={{ width: '100%' }}>
              {this.pickFieldType(this.state[key].field)}
            </Grid>
          ))}
        </Grid>
      </div>
    );
  }
}

export default TextFieldForm;
