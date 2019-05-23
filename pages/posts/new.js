import PostEdit from '../../components/modules/post/PostEdit';
import Home from "../../components/layouts/Home";
import { Paper, Link, Typography } from '@material-ui/core';
import Breadcrumbs from '@material-ui/lab/Breadcrumbs';

class NewPost extends React.Component {
   
    render(){
        return (
        <Home title="新建文章" currentUser={this.props.currentUser}>
                <Paper style={{
                  padding: 10
                }}>
                <Breadcrumbs aria-label="Breadcrumb">
                  <Link color="inherit" href="/personal" >
                    个人中心
                  </Link>
                  <Link color="inherit" href="/posts">
                    文章列表
                  </Link>
                  <Typography color="textPrimary">新建文章</Typography>
                </Breadcrumbs>
                </Paper>
                <PostEdit />
        </Home>);
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