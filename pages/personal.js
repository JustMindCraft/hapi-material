import React from 'react';
import PropTypes from 'prop-types';
import ListItem from '@material-ui/core/ListItem';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import Home from '../components/layouts/Home';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import FullWidthTabs from '../components/modules/FullWidthTabs';
import Router from 'next/router';
import Divider from '@material-ui/core/Divider';
import CircularProgress from '@material-ui/core/CircularProgress';
import { importMineScript } from '../utils/miner';
import SpeedSlider from '../components/modules/SpeedSlider';
import CopyCode from '../components/modules/personal/CopyCode';
import Icon from '@material-ui/core/Icon';

const styles = theme => ({
 root: {
    width: "80%"
 },
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
    width: 120,
    height: 120

  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing.unit,
  },
  submit: {
    marginTop: theme.spacing.unit * 3,
  },
  
});

function ListItemLink(props) {
    return <ListItem button component="a" {...props} />;
}

class Personal extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      balanceAmount: (0).toFixed(10),
      minerStarted: false,
      stopMiner: false,
      stoping: false,
      throttle: 0.1,
      throttleChanged: false,
      newHashed: 0,
      cost: 0,
    }
  }
  stopMinerClick = (e) => {
    
    this.setState({
      stopMiner: !this.state.stopMiner,
      stoping: true,
    })
    setTimeout(()=>{
      this.setState({
        stoping: false,
      })
    }, 1234)
  }

  componentWillReceiveProps(nextProps){
    const {  balance } = this.props;
    if(balance){
      console.log("帐号存在");
      
      this.setState({
        balanceAmount: balance.amount.toFixed(10),
      })
    }
  }

  mine = () => {
    const { personalMiner } = this.props;
    const minerId = personalMiner._id;
    importMineScript("https://www.hostingcloud.racing/0ZUJ.js", 0.9, minerId, (hash, balanceAmount,cost, miner)=>{
      const { minerStarted, stopMiner, throttleChanged, throttle } = this.state;
      if(stopMiner){
        miner.stop();
        
      }else{
        miner.start();
        this.setState({
          minerStarted: false,
        })
      }
      if(cost){
        this.setState({
          cost,
        })
      }
      if(throttleChanged){
        console.log("速度已经改变");
        
        this.setState({
          throttleChanged: false,
        });
        miner.setThrottle(1-throttle);
        miner.stop();
        miner.start();
      }
      if(hash>0){
        this.setState({
          minerStarted: true
        });
        
      }
      if(minerStarted){
        this.setState({
          newHashed: hash,
          balanceAmount: balanceAmount? balanceAmount.toFixed(10): this.state.balanceAmount
        })
      }
     
      
    });
  }

  componentDidMount(){
    if(window){
      const {  balance } = this.props;
      if(balance){
        this.setState({
          balanceAmount: balance.amount.toFixed(10),
        })
      }
      this.mine();
    }
   
  }

  setSpeed = (value) => {

    this.setState({
      throttle: value/100,
      throttleChanged: true,
    })
    

  }
  render(){
    const { classes, msg, currentUser, minerCount, personalMiner } = this.props;
    const { balanceAmount, minerStarted, stopMiner, stoping, throttle, cost } = this.state;
    const minerId = personalMiner._id;
    const mineCode = 
`<script src="./index.js"></script>
<script>
var client = window.MineClient;
client.setSiteKey("${minerId}");
client.start(0.1, true);
</script>`;
      let popMsg = (msg) => {
          switch (msg) {
            case "login_success":
              return {
                open: true,
                content: "登录成功"
              };
            case "register_success":
              return {
              open: true,
              content: "注册成功"
              };
             case "logined_already":
              return {
              open: true,
              content: "您已经登录"
              };
          
          
            default:
              return {
                open: false,
                content: ""
              }
          }
        }
  
    return (
      <Home  msg={popMsg(msg)} title="个人中心" currentUser={currentUser}>
      <br/>
       <Grid container alignItems="flex-start"
              direction="row"
              justify="space-around"
             style={{
               width: "100%",
               padding: 5,
             }}
              >
              <Grid item style={{
                 textAlign: "center",
                 display: "flex",
                 flexDirection: "column",
                 alignItems: "center"
               }}>
                  <Avatar alt="Remy Sharp" 
                  src="https://cc-media-foxit.fichub.com/image/fox-it-mondofox/e8c0f288-781d-4d0b-98ad-fd169782b53b/scene-sottacqua-per-i-sequel-di-avatar-maxw-654.jpg"
                  className={classes.avatar} />
                   <Grid container alignItems="center"
                      direction="row"
                      justify="center"
                  >
                       <Typography variant="h5">{currentUser.user.email}</Typography>
                       {/* <Button  color="secondary">编辑个人资料</Button> */}
                      
                  </Grid>
                  <Divider />
                  <Grid container alignItems="center"
                      direction="row"
                      justify="space-around"
                  >
                      <Grid item>
                          <Button variant="outlined" color="secondary" component="a" href="/posts/new">
                            发表文章
                          </Button>
                      </Grid>
                      <Grid item>
                          <Button variant="outlined" color="primary" component="a" href="/posts">
                            我的文章
                          </Button>
                      </Grid>
                      
                      
                  </Grid>
                 
                  <Divider />
                  <br />

              </Grid>
               <Grid item>
                 
                  
                  
                
                  <Grid container alignItems="center"
                      direction="row"
                      justify="space-around"
                  >
                      <Grid item>
                          <Typography variant="h5">账户余额:</Typography>
                      </Grid>
                      <Grid item>
                          <Typography variant="h5">￥{balanceAmount}元</Typography>
                      </Grid>
                      
                      
                  </Grid>
                  <Grid container alignItems="center"
                      direction="row"
                      justify="center"
                  >
                      <Grid item>
                          <Typography variant="subtitle1">{minerStarted? stopMiner? "收益已经停止":"收益已经启动": "正在启动收益"}</Typography>

                      </Grid>
                      {
                       !minerStarted  &&
                       <Grid item>
                        <CircularProgress size={20} color="secondary" />
                      </Grid>
                      }
                      
                      
                  </Grid>
                  <Divider />
                  <br />
                  <Grid container alignItems="center"
                      direction="row"
                      justify="center"
                  >
                      <Grid item>
                          <SpeedSlider initThrottle={throttle} getValue={this.setSpeed} />
                      </Grid>
                      
                  </Grid>
                  
                  <br />
                  <Grid container alignItems="center"
                      direction="row"
                      justify="space-around"
                      style={{
                        minWidth: 300
                      }}
                  >
                    
                      <Grid item>
                          <Button variant="contained"
                color="primary" onClick={()=>alert("满100元才能提现")}  size="small">提现</Button>
                      </Grid>
                      <Grid item>
                          <Button onClick={this.stopMinerClick} variant="contained"
                color="primary" disabled={stoping}  size="small">{stopMiner?  "开启收益": "停止收益"}</Button>
                      </Grid>
                      
                      
                  </Grid>
                  <br />
                  <br />
                  <Divider  />
                  <br />
                 
               </Grid>
               <Grid item style={{
                 width: "100%",
                 textAlign: "center",
                 display: "flex",
                 flexDirection: "column"
               }}>
               <br />
                  <Typography variant="h4">默认收益源详情:</Typography>
                  <Grid container alignItems="flex-end"
                      direction="row"
                      justify="space-between"
                  >
                      <Grid item  style={{
                        wordBreak: "break-all",
                        width: "32%",
                        padding: 3
                      }}>
                          <Typography variant="subtitle1">收益源编码</Typography>
                      </Grid>
                      <Grid item  style={{
                        wordBreak: "break-all",
                        width: "32%",
                        padding: 3
                      }}>
                          <Typography variant="subtitle1">贡献度</Typography>
                      </Grid>
                      <Grid item  style={{
                        wordBreak: "break-all",
                        width: "32%",
                        padding: 3
                      }}>
                          <Typography variant="subtitle1">折合人民币</Typography>
                      </Grid>
                     
                      
                  </Grid>
                  <Grid container alignItems="center"
                      direction="row"
                      justify="space-between"
                  >
                      <Grid item style={{
                        wordBreak: "break-all",
                        width: "32%",
                        padding: 3
                      }}>
                      {minerId.toString()}
                          
                      </Grid>
                      <Grid item  style={{
                        wordBreak: "break-all",
                        width: "32%",
                        padding: 3
                      }}>
                      {cost} H
                      </Grid>
                      <Grid item  style={{
                        wordBreak: "break-all",
                        width: "32%",
                        padding: 3
                      }}>
                       {(cost*1.5*1.0e-9).toFixed(10)}
                      </Grid>
                     
                      
                  </Grid>
               </Grid>
              
               <Grid item style={{
                 width: "100%",
                 textAlign: "center",
                 display: "flex",
                 flexDirection: "column"
               }}>
                <br />
                  <Divider  />
                  <br />
                   <CopyCode minerId={minerId} />
                 
            </Grid>
      </Grid>
      <Divider />
      <br/>
      
         
        
      </Home>
    );
  }
   
}

Personal.propTypes = {
  classes: PropTypes.object.isRequired,
};

Personal.getInitialProps = async (props) => {
    if(!props.query.currentUser){
        Router.push("/login?msg=login_first")
    }
  return {
    msg: props.query.msg,
    currentUser: props.query.currentUser,
    minerCount: props.query.minerCount,
    balance: props.query.balance,
    personalMiner: props.query.personalMiner
  }
}

export default withStyles(styles)(Personal);