import TextField from '@material-ui/core/TextField';
import Home from "../../components/layouts/Home";
import Head from 'next/head';
import './new.css';
import { Button, Divider, CircularProgress, Typography, Paper } from '@material-ui/core';
import PostSetting from '../../components/modules/post/PostSetting';
import axios from 'axios';
import Breadcrumbs from '@material-ui/lab/Breadcrumbs';

class NewPost extends React.Component {
    constructor(props){
      super(props);
      this.state = {
        EditorStart: false,
        cover: "",
        breif: "",
        speed: 10,
        title: "未命名标题",
        password: "",
        id: "",
        pending: false,
        pendingText: "",
        status: "draft",
      }
    }
    createPost = (cb) => {
        const data = this.getData();
       
        axios.post("/posts", {...data})
        .then(response => {
            cb(response.data._id);
        })
    }


    updatePost = (id, cb) => {
      const data = this.getData();
      axios.patch("/posts/"+id, {...data})
          .then(
          response => {
            cb(response);
            
          }
      ) 
    }

    componentDidMount(){
      this.ue = UE.getEditor('editor');
      this.ue.addListener("focus", ()=>{
        const { EditorStart } = this.state;
        if(!EditorStart){
          this.ue.setContent("");
          this.setState({
            EditorStart: true, 
          })
        }
        
      });
      const autocreate = setInterval(()=>{
        const contentTXT = this.ue.getContentTxt();
        if(contentTXT.length <= 150){
          return false;
        }
        this.createPost(id=>{
          if(id){
            this.setState({
              id,
            })
          }else{
            clearInterval(autocreate);
          }
          
        });
      }, 2000);

      const autosave = setInterval(()=>{
        const { id } = this.state;
        const data = this.getData();
        if(id!==""){
          console.log("可以自动保存");
          this.updatePost(id, response=>{
            console.log(response);
            
          })
          
        }
      },5000)
      
    }

    getCoverUrl = url => {
     this.setState({
       cover: url,
     })
      
    }

    getBreif = breif => {
      this.setState({
        breif
      })
      
    }

    getSpeed = speed => {
      this.setState({
        speed,
      })
      
    }

    getData = () => {
      const content = this.ue.getContent();
      const { cover, breif, speed, title, password, status } = this.state;
      let breifTXT = breif;
      if(breifTXT===""){
        breifTXT = this.ue.getContentTxt().substring(0, 150);
      }
      return {
        content,
        cover,
        breif: breifTXT,
        speed,
        title,
        password,
        status,
      }
    }

    saveDraft = () => {
      this.setState({
        pending: true,
        pendingText: "正在保存草稿"
      })
      const { content, cover, breif, speed, title } = this.getData();
      console.log({
        content, 
        cover, 
        breif,
        speed,
        title,
      });
      const axios = require('axios');
      axios.post("/posts/autosave")
      .then(response => {
        console.log(response);
        
      })
      ;
      
    }

    publish = () => {
      this.setState({
        pending: true,
        pendingText: "正在发布"
      })
      const { content, cover, breif, speed, title, password } = this.getData();
      console.log({
        content, 
        cover, 
        breif,
        speed,
        title,
        breif
      });
    }

    preview = () => {
      this.setState({
        pending: true,
        pendingText: "正在生成预览"
      })
      const { id } = this.state;
      if(id!==""){
        this.updatePost(id,
          response => {
            console.log(response);
          window.location.assign(`/posts/${id}/preview/`);

          }
        )
      }else{
        this.createPost(id=>{
          console.log(id, id);
          
          this.setState({
            id,
          });
          window.location.assign(`/posts/${id}/preview/`);
        });
      }
    }

    handleTitleChange = e => {
      this.setState({
        title: e.target.value,
      })
    }
    setPassword = password => {
      this.setState({
        password
      })
    }

    render(){
        const { currentUser } = this.props;
        const { EditorStart, pending, pendingText } = this.state;
        if(pending){
          return (
            <div style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              alignContent: "center",
              width: "100%",
              height: 560
            }}>
            <div>
             <CircularProgress  size={80} />   <br/>

            </div>
            <div>
            <Typography variant="h4">{pendingText}</Typography>  

            </div>
            </div>
            
          )
        }
        return (
            <Home currentUser={currentUser} title="发表文章">
             <Head>
                <title>乐多多云收益 | 新建文章</title>
                <script type="text/javascript" charSet="utf-8" src="/ueditor/ueditor.config.js"></script>
                <script type="text/javascript" charSet="utf-8" src="/ueditor/ueditor.all.min.js"> </script>
                <script type="text/javascript" charSet="utf-8" src="/ueditor/lang/zh-cn/zh-cn.js"> </script>
              </Head>
              <div>
                <Paper style={{
                  padding: 10
                }}>
                <Breadcrumbs aria-label="Breadcrumb">
                  <a color="inherit" href="/personal" >
                    个人中心
                  </a>
                  <a color="inherit" href="/posts">
                    文章列表
                  </a>
                  <Typography color="textPrimary">新建文章</Typography>
                </Breadcrumbs>
                </Paper>
                  <TextField
                    required
                    id="outlined-required"
                    label="文章标题"
                    defaultValue=""
                    margin="normal"
                    variant="outlined"
                    fullWidth={true}
                    onChange={this.handleTitleChange}
                  />
                  <script id="editor" type="text/plain" style={{width:"100%",height:500}}>{!EditorStart? "此处编辑您的文章": ""}</script>
                  <div>
                    <br/>
                    <Divider />
                    <br/>
                  </div>
                  <PostSetting getCoverUrl={this.getCoverUrl} getBreif={this.getBreif} getSpeed={this.getSpeed} setPassword={this.setPassword} />
                  <div>
                    <Divider />
                  </div>
                  <div style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-around"
                  }}>
                  <Button color="primary"  variant="outlined" onClick={this.saveDraft}>保存草稿</Button>
                  <Button color="secondary" variant="contained" onClick={this.publish}>发布</Button>
                  <Button color="default"  variant="outlined" onClick={this.preview}>预览</Button>

                  </div>
              </div>
            </Home>
        )
    }
}

NewPost.getInitialProps = async (props) => {
  
    return {
      msg: props.query.msg,
      currentUser: props.query.currentUser,
      personalMiner: props.query.personalMiner,
    }
}

export default NewPost;