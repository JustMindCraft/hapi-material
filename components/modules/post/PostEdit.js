import TextField from '@material-ui/core/TextField';
import Head from 'next/head';
import { Button, Divider, CircularProgress, Typography, Paper, Link } from '@material-ui/core';
import PostSetting from './PostSetting';
import axios from 'axios';
import Breadcrumbs from '@material-ui/lab/Breadcrumbs';

class PostEdit extends React.Component {
    constructor(props){
      super(props);
      this.state = {
        EditorStart: false,
        cover: "",
        breif: "",
        speed: 10,
        title: "",
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
       const { post } = this.props;
       const { id } = this.state;
       if(post){
           this.setState({
               title: post.title,
               id: post._id,
               EditorStart: true,
               cover: post.cover,
               speed: post.speed,
               breif: post.breif,
           });
       }
      this.ue = UE.getEditor('editor', {
        autoHeightEnabled: true,
        autoFloatEnabled: true
      });
      if(post && window){
        this.ue.addListener("ready", ()=>{
            this.ue.setContent(post.content);
        })
        
        }
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
       const { id } = this.state;
        
        const contentTXT = this.ue.getContentTxt();
        if(contentTXT.length <= 150 || id!=="" || post){
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

    getSpeed = (speed=10) => {
      this.setState({
        speed,
      })
      
    }

    getData = () => {
      const content = this.ue.getContent();
      const { cover, breif, speed, title, password, status } = this.state;
      let breifTXT = breif;
      if(breifTXT==="" || !breif){
        breifTXT = this.ue.getContentTxt().substring(0, 150);
      }
      let isPublic = false;
      if(password==="" || !password){
        isPublic = true;
      }

      console.log({isPublic});
      
      
      return {
        content,
        cover,
        breif: breifTXT,
        speed,
        title,
        password,
        status,
        isPublic
      }
    }

    saveDraft = () => {
      this.setState({
        pending: true,
        pendingText: "正在保存草稿"
      })
      const { id } = this.state;
      this.updatePost(id, response => {
        if(response.data._id === id){
          window.location.assign("/posts?status=draft")
          }
      })
      
    }

    publish = () => {
      this.setState({
        pending: true,
        pendingText: "正在发表"
      })
      const { id } = this.state;
      this.updatePost(id, response => {
        const { _id } = response.data;
        axios.patch(`/api/posts/${_id}/publish`)
        .then(
        response => {
          if(response.data._id === id){
            window.location.assign("/posts?status=published")
            }
          }
        ) 
      })
      
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
             window.location.assign(`/posts/${id}/preview/`);

          }
        )
      }else{
        this.createPost(id=>{
          
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
        const { EditorStart, pending, pendingText, title, id } = this.state;
        let { post } = this.props;
        let { speed, cover, breif, password } = {};
        if(post){
          speed = post.speed;
          cover = post.cover;
          breif = post.breif;
          password = post.password;
        }
        
      
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
            <React.Fragment>
             <Head>
                <title>乐多多云收益 | 新建文章</title>
                <script type="text/javascript" charSet="utf-8" src="/ueditor/ueditor.config.js"></script>
                <script type="text/javascript" charSet="utf-8" src="/ueditor/ueditor.all.min.js"> </script>
                <script type="text/javascript" charSet="utf-8" src="/ueditor/lang/zh-cn/zh-cn.js"> </script>
              </Head>
              <div>
               
                  <TextField
                    required
                    id="outlined-required"
                    label="文章标题"
                    defaultValue=""
                    margin="normal"
                    variant="outlined"
                    fullWidth={true}
                    onChange={this.handleTitleChange}
                    value={title}
                  />
                  <div style={{
                      width: "100%"
                  }}>

                  </div>
                  <script id="editor" type="text/plain" style={{width:"100%",height:500}}>{!EditorStart? "此处编辑您的文章，字数多于150方可发布或者保存": ""}</script>
                  <div>
                    <br/>
                    <Divider />
                    <br/>
                  </div>
                  <PostSetting password={password} breif={breif} speed={speed} cover={cover} getCoverUrl={this.getCoverUrl} getBreif={this.getBreif} getSpeed={this.getSpeed} setPassword={this.setPassword} />
                  <div>
                    <Divider />
                  </div>
                  <div style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-around"
                  }}>
                  <Button disabled={id===""} color="primary"  variant="outlined" onClick={this.saveDraft}>保存草稿</Button>
                  <Button  disabled={id===""} color="secondary" variant="contained" onClick={this.publish}>发布</Button>
                  <Button color="default"  variant="outlined" onClick={this.preview}>预览</Button>

                  </div>
              </div>
            </React.Fragment>
        )
    }
}



export default PostEdit;