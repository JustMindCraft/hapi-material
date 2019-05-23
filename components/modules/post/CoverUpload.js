import { Typography, Icon, CircularProgress } from "@material-ui/core";
const cloudName = 'ddycd5xyn';
const unsignedUploadPreset = 'rq6jvg1m';

class CoverUpload extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            uploading: false,
            progress: 0,
            done: false,
            url: "",
        }
    }

    uploadFile = file => {
        this.setState({
            uploading: true,
        })
        const url = `https://api.cloudinary.com/v1_1/${cloudName}/upload`;
        const xhr = new XMLHttpRequest();
        const fd = new FormData();
        xhr.open('POST', url, true);
        xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
        xhr.upload.addEventListener("progress", e =>  {
            const progress = Math.round((e.loaded * 100.0) / e.total);
            this.setState({
                progress,
            });
        });

        xhr.onreadystatechange = e =>  {
            if (xhr.readyState == 4 && xhr.status == 200) {
            // File uploaded successfully
            var response = JSON.parse(xhr.responseText);
            var url = response.secure_url;
            if(this.props.getUrl){
                this.props.getUrl(url);
            }
            this.setState({
                uploading: false,
                done: true,
                url,
                progress: 0,
            })
            }
        };
        fd.append('upload_preset', unsignedUploadPreset);
        fd.append('tags', 'browser_upload'); // Optional - add tag for image admin in Cloudinary
        fd.append('file', file);
        xhr.send(fd);
    }
    handeFileChange = e => {
        const file = e.target.files[0];
        if(file.type === "image/jpeg" || file.type === "image/png"){
            this.uploadFile(file);
        }else{
            return alert("图片格式不正确");
        }
       
        
    }

    componentDidMount(){
        const { cover } = this.props;
        if(cover!=="" && cover){
            this.setState({
                done: true,
                url: cover,
            })
        }
       
    }
    
    render(){
        const { uploading, progress, done, url} = this.state;
        return (
            <div style={{
                width: 150,
                height: 150,
                border: "dotted 5px gray",
                textAlign: "center"
            }}>
              <Typography style={{zIndex: 8888}} variant="subtitle1">{uploading? "正在上传": "上传封面"}</Typography>
              {
                  uploading ? 
                  <CircularProgress  variant="static" value={progress}  size={80}/>
                  :
                  done ? <img src={url} style={{
                    width: 141,
                    height: 141,
                    position: "relative",
                    top: -28
                  }} />:
                  <React.Fragment>
                    <Icon color="disabled" fontSize="large"  style={{ fontSize: 120 }}>     
                        add
                    </Icon>
                   
                  </React.Fragment>
              }
               <input type="file" style={{
                        width: 120,
                        opacity: 0,
                        height: 120,
                        position: "relative",
                        top: -120,
                        left: -1,
                        zIndex: 7777
                    }} multiple={false} onChange={this.handeFileChange} />
              
            </div>
        )
    }
}

export default CoverUpload;