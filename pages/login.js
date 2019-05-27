import React from 'react';
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Paper from '@material-ui/core/Paper';
import withStyles from '@material-ui/core/styles/withStyles';
import Home from '../components/layouts/Home';

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

class  SignIn extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      msg: {}, currentUser: null, loaded: false,
    }
  }

  componentDidMount(){
    const { msg, currentUser, loaded } = this.props;
    this.setState({
      msg,currentUser, loaded
    })
  }
  render(){
    const { classes } = this.props;
    const { msg ,currentUser, loaded } = this.props;
    const popMsg = (msg) => {
      switch (msg) {
        case "login_first":
          return {
            open: true,
            content: "请先登录"
          };
        case "SAFETY_LOGOUT":
          return {
            open: true,
            content: "您已安全退出"
          }

        case "USR_OR_PASS_WRONG":
          return {
            open: true,
            content: "用户或者密码输入错误"
          }
      
        default:
          return {
            open: false,
            content: ""
          }
      }
    }
    return (
      
      <Home msg={popMsg(msg)} title="登录"  currentUser={currentUser} loaded={loaded}>
        <Paper className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          
          <form className={classes.form} action="/login" method="POST">
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="username">邮箱|用户名|手机号</InputLabel>
              <Input placeholder="邮箱|用户名|手机号"  name="username" autoComplete="email" autoFocus />
            </FormControl>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="password">密码</InputLabel>
              <Input placeholder="密码" name="password" type="password" id="password" autoComplete="current-password" />
            </FormControl>
            
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              登录
            </Button>
            <input type="hidden" name="token" value={require("uuid/v4")()} />
            <input type="hidden" name="type" value="password" />
            <br/><br/>
                    <Button
                      fullWidth
                      variant="contained"
                      component="a"
                      href="/register"
                      color="secondary"
                    >
                      注册
                    </Button>
          </form>
        </Paper>
      </Home>
    );

  }
  
}

SignIn.propTypes = {
  classes: PropTypes.object.isRequired,
};

SignIn.getInitialProps = async (props) => {
  
  return {
    msg: props.query.msg,
    currentUser: props.query.currentUser,
    loaded: true,
  }
}

export default withStyles(styles)(SignIn);