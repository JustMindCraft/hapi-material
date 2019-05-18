import React from 'react';
import PropTypes from 'prop-types';
import { Typography, Paper, Grid, Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import Clipboard from 'clipboard';
import Slider from '@material-ui/lab/Slider';
const styles = {
    rootSlider: {
      width: 300,
    },
    slider: {
      padding: '22px 0px',
    },
};

class CopyCode extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            speed: 10,
            ads: true,
            url: "",
            dialog: false,
        }
    }
    setSpeed = (speed) => {
        this.setState({
            speed
        })
    }

    setAds = (ads) => {
        this.setState({
            ads,
        })
    }

    componentDidMount(){
        if(window){
            const btnCopy = new Clipboard('.copy-btn');
            this.setState({
                url: window.location.origin+"/miner2.289b4e36.js"
            });
            btnCopy.on('success', (e) => {
               this.setState({
                   dialog: true,
               })
            
                e.clearSelection();
            });
        }
    }

    handleClose = () => {
        this.setState({
            dialog: false,
        })
    }

    render(){
        const { url, speed, ads, dialog} = this.state;
        const { minerId, classes } = this.props;
const mineCode = 
`<script src="${url}"></script>
<script>
var client = window.MineClient;
client.setSiteKey("${minerId}");
client.start(${speed/100}, ${ads});
</script>`;

        return (
            <React.Fragment>
            <Typography style={{
                         width: "100%"
                       }} variant="h4">您的收益代码:</Typography>
                       <Paper style={{
                         display: "flex",
                         flexDirection: "column",
                         alignItems: "center"
                       }}>
                       <textarea  style={{
                           width: "90%",
                           height: 140,
                         }} value={mineCode} readOnly={true}>
                         </textarea>
                         <br />
                         <Typography style={{
                         width: "100%"
                       }} variant="subtitle2">调整代码收益速度({speed}%):</Typography>
                         <Grid container alignItems="center"
                             direction="row"
                             justify="center"
                         >
                             <Grid item  className={classes.rootSlider}>
                             <Slider
                                   classes={{ container: classes.slider }}
                                   value={speed}
                                   max={100}
                                   min={10}
                                   aria-labelledby="label"
                                   color="secondary"
                                   onChange={(event, value) => this.setSpeed(value)}
                                   />
                             </Grid>
                             
                         </Grid>
                         
                         <br />
                         <Grid container alignItems="center"
                         direction="row"
                         justify="space-around"
                         style={{
                           maxWidth: 300
                         }}
                             >
                               
                                 <Grid item>
                                     <Button variant="contained"
                           color="primary" onClick={e => this.setAds(!ads)} >{ads ? "隐藏推广(將减速收益5%)" : "添加推广(將加速收益5%)"}</Button>
                                 </Grid>
                                 <Grid item>
                                     <Button className="copy-btn" variant="contained"  data-clipboard-text={mineCode} color="secondary">复制代码</Button>
                                 </Grid>
                                 <Grid item >
                                     <Button component="a" href="/mine_demo" target="_blank">查看代码演示</Button>
                                 </Grid>
                                 
                                 
                             </Grid>
                       </Paper>

                       <Dialog onClose={this.handleClose} open={dialog}>
                         <DialogTitle>复制成功</DialogTitle>
                         <DialogContent>
                            <DialogContentText id="alert-dialog-description">
                                    您可以把代码粘帖到任何您的网站中,然后加速您的收益
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                           
                            <Button onClick={this.handleClose} color="primary" autoFocus>
                                明白了
                            </Button>
                        </DialogActions>
                       </Dialog>
       </React.Fragment>
        )
    }
}

CopyCode.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CopyCode);