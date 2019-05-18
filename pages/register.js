import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Paper from '@material-ui/core/Paper';
import withStyles from '@material-ui/core/styles/withStyles';
import Home from '../components/layouts/Home';
import FormHelperText from '@material-ui/core/FormHelperText';

const styles = theme => ({
 
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    maxWidth: 600,
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing.unit,
  },
  submit: {
    marginTop: theme.spacing.unit * 3,
  },
});

class SignUp extends React.Component {


    constructor(props){
        super(props);
        this.state = {
            submit: false,
            email: "",
            password: "",
            passwordRepeat: "",
            passwordRepeatValid: false,
            emailValid: false,
            passwordValid: false,
        }
    }

    componentWillMount(){
        
        const { email, passwordValid, passwordRepeatValid } = this.props;
        if(email){
            this.setState({
                email,
            })
        }
        
        
    }

    handleSubmit = async (e) =>{
        this.setState({
            submit: true,
        })
        window.localStorage.setItem("token", this.refs.token.value);
        const { password, passwordRepeat} = this.state;
        if(password !== passwordRepeat){
           
            e.preventDefault();
            this.setState({
                submit: false,
                passwordRepeatValid: true,
            })
            return false;
        }
    }

    handleInput = (e, text) => {
        const fields = {};
        fields[text] = e.target.value;
        this.setState({
            ...fields
        })
           
    }
 
    render(){
        const { classes } = this.props;

        const { passwordRepeatValid, email, password, passwordRepeat } = this.state;
        const { passwordValid, helperText, emailValid } = this.props;
        
        return (
            <Home title="注册">
              <Paper className={classes.paper}>
                <form onSubmit={this.handleSubmit} method="POST" action="/register" className={classes.form} onSubmit={this.handleSubmit}>
                  <FormControl margin="normal" required fullWidth error={emailValid}>
                    <InputLabel htmlFor="email">邮箱</InputLabel>
                    <Input value={email} onChange={e => this.handleInput(e, "email")} id="email" type="email" name="email" autoComplete="email" autoFocus />
                    {
                    emailValid && 
                        <FormHelperText id="component-helper-text">{helperText}</FormHelperText>
                    }
                  </FormControl>
                  <FormControl margin="normal" required fullWidth error={passwordValid}>
                    <InputLabel htmlFor="password">密码</InputLabel>
                    <Input value={password} onChange={e => this.handleInput(e, "password")} placeholder="至少八个字符，至少一个字母和一个数字" name="password" type="password" id="password" autoComplete="current-password" />
                    {
                        passwordValid && 
                        <FormHelperText id="component-helper-text">{helperText}</FormHelperText>
                    }
                  </FormControl>
                  <FormControl margin="normal" required fullWidth error={passwordRepeatValid}>
                    <InputLabel htmlFor="passwordRepeat">重复密码</InputLabel>
                    <Input value={passwordRepeat} onChange={e => this.handleInput(e, "passwordRepeat")} name="passwordRepeat" type="password" id="passwordRepeat" autoComplete="current-password" />
                    {
                        passwordRepeatValid && 
                        <FormHelperText id="component-helper-text">两次密码不一致</FormHelperText>
                    }
                    
                  </FormControl>
                
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    disabled={this.state.submit}
                    className={classes.submit}
                  >
                    注册
                  </Button>
                  <br/><br/>
                  <Button
                    fullWidth
                    variant="contained"
                    component="a"
                    href="/login"
                    color="secondary"
                  >
                    登录
                  </Button>
                  <input ref="token" type="hidden" value={require("uuid/v4")()} name="token"/>
                </form>
              </Paper>
            </Home>
          );

    }
  
}

SignUp.propTypes = {
  classes: PropTypes.object.isRequired,
};

SignUp.getInitialProps = async (props) => {
    return {
        helperText: props.res.helperText,
        email: props.res.email,
        passwordValid: props.res.passwordValid, 
        passwordRepeatValid: props.res.passwordRepeatValid,
        emailValid: props.res.emailValid
    }
}

export default withStyles(styles)(SignUp);