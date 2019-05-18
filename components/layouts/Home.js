import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import "./global.css"
import Message from './Message';

const styles = theme => ({
  appBar: {
    position: 'relative',
  },
  title: {
    flexGrow: 1,
    textAlign: "center"
  }, 
  icon: {
    marginRight: theme.spacing.unit * 2,
  },
  heroUnit: {
    backgroundColor: theme.palette.background.paper,
  },
  heroContent: {
    maxWidth: 600,
    margin: '0 auto',
    padding: `${theme.spacing.unit * 8}px 0 ${theme.spacing.unit * 6}px`,
  },
  heroButtons: {
    marginTop: theme.spacing.unit * 4,
  },
  
  cardGrid: {
    padding: `${theme.spacing.unit * 8}px 0`,
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing.unit * 6,
    width: "100%"
  },
});

class HomeLayout extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      msg: {
        text: "默认消息",
        show: false,
        auth: true,
        anchorEl: null,
      },
      currentUser: null
    }
  }
  

  handleMenu = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

 

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  render(){
    const { currentUser, msg } = this.props;
    
    const { props } = this;
    const { classes } = props;
    const {  anchorEl } = this.state;
    return (
      <React.Fragment>
        <CssBaseline />
        <AppBar position="fixed" className={classes.appBar}>
          <Toolbar>
            <Button component='a' href="/" color="inherit" size="large">云收益</Button>

            <Typography  className={classes.title} variant="h6" color="inherit" noWrap>
                {this.props.title}
            </Typography>
            {
              currentUser ?  <div>
              <IconButton
                aria-owns={anchorEl ? 'menu-appbar' : undefined}
                aria-haspopup="true"
                onClick={this.handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={this.handleClose}
              >
                <MenuItem component="a" href="/personal" >个人中心</MenuItem>
                <MenuItem component="a"  href="/logout">安全退出</MenuItem>
              </Menu>
            </div>
            :
            <React.Fragment>
              <Button  component='a' href="/login" color="inherit">登录</Button>
              <Button  component='a' href="/register" color="inherit">注册</Button>
            </React.Fragment>
            }
           
            
              
          </Toolbar>
        </AppBar>
        <main style={{
          overflow: "auto",
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "space-between",
          overflowX: "hidden",
          padding: 5,
        }}>
          {/* Hero unit */}
         
          {props.children}
         
          {/* Footer */}
        <footer className={classes.footer}>
          <Typography variant="h6" align="center" gutterBottom>
          {/* Footer */}
          </Typography>
          <Typography variant="subtitle1" align="center" color="textSecondary" component="p">
            {/* Something here to give the footer a purpose! */}
          </Typography>
        </footer>
        {/* End footer */}
        </main>
        {
          this.props.msg && 
          <Message open={this.props.msg.open} content={this.props.msg.content}/>
        }
       
      </React.Fragment>
    );
  }
  
}

HomeLayout.propTypes = {
  classes: PropTypes.object.isRequired,
};


export default withStyles(styles)(HomeLayout);