import { Typography, TextField, Divider, Button } from "@material-ui/core";

class PostAccess extends React.Component{
    render(){
        return (
            <form action={`/posts/${this.props.id}/access`} method="POST" style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "space-around",
                alignContent: "space-around",
                width: "100%",
                height: 560
              }}>
                <Typography variant="h3">
                    {this.props.title}
                </Typography>
                <Divider />
                <Typography variant="h4">
                    文章已经加密
                </Typography>
                <TextField name="password" label="请输入访问密码" placeholder="请输入访问密码" />
                <input type="hidden" name="access" value={this.props.access} />
                <Button type="submit" color="primary"  variant="contained" >确定访问</Button>
            </form>
        )
    }
}


PostAccess.getInitialProps = async (props) => {
    return {
        title: props.query.title,
        id: props.query.id,
        msg: props.query.msg,
        access: props.query.access,
    }
}

export default PostAccess;