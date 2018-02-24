import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Grid from 'material-ui/Grid';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';
import Input, { InputLabel, InputAdornment } from 'material-ui/Input';
import { FormControl, FormHelperText } from 'material-ui/Form';
import Visibility from 'material-ui-icons/Visibility';
import VisibilityOff from 'material-ui-icons/VisibilityOff';
import Autorenew from 'material-ui-icons/Autorenew';

// import { apiPostAuthRegister } from '../../redux/reduxAPI';
import { register } from '../async';

import { validateForm, validateField } from './validateRegistration';

class RegistrationForm extends Component {
  state = {
    email: { value: '' },
    emailVal: '',
    password: { value: '' },
    passwordVal: '',
    confirmPassword: { value: '' },
    confirmPasswordVal: '',
    showPassword: false
  };

  submitHandler = async e => {
    try {
      e.preventDefault();
      this.setState({ running: true });
      const submissionData = {
        email: this.state.email,
        password: this.state.password,
        confirmPassword: this.state.confirmPassword
      };
      const validatedForm = validateForm(submissionData);
      if (validatedForm.hasErrors) {
        this.setState({ ...validatedForm.form });
        return;
      }
      const postForm = Object.keys(validatedForm.form).reduce(
        (submission, field) => {
          submission[field] = this.state[field].value;
          return submission;
        },
        {}
      );
      this.props.register(postForm);
    } catch (error) {
      console.log(error);
    }
  };

  changeHandler = e => {
    e.preventDefault();
    const { name, value } = e.target;
    this.setState(() => ({
      [`${name}Val`]: value,
      ...validateField(name, value, this.state.password)
    }));
  };
  handleItem(e) {
    this.setState({ newItem: e.target.value });
  }
  showPasswordHandler = () => {
    this.setState({ showPassword: !this.state.showPassword });
  };
  loginHandler = () => this.props.push('/login');
  render() {
    const {
      email,
      emailVal,
      password,
      passwordVal,
      confirmPassword,
      confirmPasswordVal,
      showPassword
    } = this.state;
    const {
      submitHandler,
      loginHandler,
      changeHandler,
      showPasswordHandler
    } = this;
    return (
      <Paper>
        <form onSubmit={submitHandler}>
          <Grid container alignItems="center" direction="row" justify="center">
            <Grid item xs={10} sm={8}>
              <Typography variant="display1" color="secondary">
                Register New User
              </Typography>
            </Grid>
            <Grid item xs={10} sm={8}>
              <TextField
                value={emailVal}
                error={email.error ? true : false}
                helperText={email.error || null}
                onChange={changeHandler}
                name="email"
                label="Email"
                fullWidth
              />
            </Grid>
            <Grid item xs={10} sm={8}>
              <FormControl style={{ width: '100%' }}>
                <InputLabel
                  htmlFor="password"
                  error={password.error ? true : false}
                >
                  Password
                </InputLabel>
                <Input
                  name="password"
                  id="password"
                  type={this.state.showPassword ? 'text' : 'password'}
                  value={passwordVal}
                  error={password.error ? true : false}
                  onChange={changeHandler}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton onClick={showPasswordHandler} color="accent">
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                  fullWidth
                />

                {password.error ? (
                  <FormHelperText error>{password.error}</FormHelperText>
                ) : null}
              </FormControl>
            </Grid>
            <Grid item xs={10} sm={8}>
              <TextField
                value={confirmPasswordVal}
                error={confirmPassword.error ? true : false}
                helperText={confirmPassword.error || null}
                type={this.state.showPassword ? 'text' : 'password'}
                onChange={changeHandler}
                name="confirmPassword"
                label="Confirm Password"
                fullWidth
              />
            </Grid>

            <Grid item xs={10} sm={8}>
              <Button
                variant="raised"
                color="primary"
                onClick={submitHandler}
                style={{ width: '100%' }}
              >
                Register
              </Button>
            </Grid>
            <Grid item xs={10} sm={8}>
              <Button
                variant="raised"
                color="primary"
                onClick={loginHandler}
                style={{ width: '100%' }}
              >
                Login
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    );
  }
}

export default connect(null, { register, push })(RegistrationForm);
