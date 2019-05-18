import { Typography, Divider, TextField } from "@material-ui/core";
import Slider from '@material-ui/lab/Slider';
import CoverUpload from "./CoverUpload";

class PostSetting extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            speed: 10,
            textLength: 0,
            text: ""
        }
    }
    handleChange = (event, value) => {

        this.setState({
            speed: value,
            
        })
        this.props.getSpeed(value);
    }
    handleTextInput = (event) => {
        if(event.target.value.length>150){
           
            return false;
        }
        this.setState({
            textLength: event.target.value.length,
            text: event.target.value
        })

        this.props.getBreif(event.target.value);
        
    }
    getCover = url => {
       this.props.getCoverUrl(url);
        
    }
    setPassword = password => {
        this.props.setPassword(password);
    }
    render(){
        const { speed, textLength, text } = this.state;

        return (
            <div style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                justifyContent: "center"
              }}>
              <Typography variant="h5">文章设置</Typography>
              <br/>
                    <Divider />
                    <br/>
              <div  style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                alignContent: "center",
                width: "100%"
              }}>
                  <CoverUpload getUrl={this.getCover} />
                  <div style={{
                      width: "50%",
                      marginLeft: 10
                  }}>
                     <textarea value={text} onChange={this.handleTextInput}  placeholder="摘要,若是留空，则截取文章前150个字符" style={{height: 148, padding: 10, width: "100%", resize: "none"}}></textarea>
                     <div>{textLength}/150<span style={{color: "red"}}>{textLength>150? "超出字符限制": ""}</span></div>
                  </div>
                 
              </div>
              <br/>
                <Divider style={{width: "100%"}} />
                <br/>
              <div style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                alignContent: "center",
                width: "100%",
                textAlign: "center",
              }}>
                    <Typography variant="subtitle1">设置收益速度:&nbsp;&nbsp;<br/>{speed}%<br/><span style={{
                        fontSize: "small",
                        fontStyle: "italic"
                    }}>(!速度会影响<br/>文章页面流畅度)</span></Typography>
                    <Slider
                        value={speed}
                        max={100}
                        min={10}
                        aria-labelledby="label"
                        onChange={this.handleChange}
                        style={{
                            width: "50%"
                        }}
                    />
              </div>
              <br/>
                <Divider style={{width: "100%"}} />
              <br/>
              <div style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                alignContent: "center",
                width: "100%",
                textAlign: "center",
              }}>
                  <TextField onChange={e => this.setPassword(e.target.value)} label="设置访问密码(若是留空，则公开文章)" variant="filled" placeholder="设置访问密码(若是留空，则公开文章)" style={{width: 320}} />
              </div>
              <br/>
               
              <br/>
              
            </div>
        )
    }
}

export default PostSetting;