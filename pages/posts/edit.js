import PostEdit from '../../components/modules/post/PostEdit';
import Home from "../../components/layouts/Home";
import { Paper, Typography, Link } from '@material-ui/core';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';

class EditPost extends React.Component {
   
    render(){
        return (<Home title="编辑文章" currentUser={this.props.currentUser}>
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
                  <Typography color="textPrimary">编辑文章</Typography>
                </Breadcrumbs>
                </Paper>
          <PostEdit post={this.props.post}/>
        </Home>);
    }
}

EditPost.getInitialProps = async (props) => {
  
    return {
      post: props.query.post,
      currentUser: props.query.currentUser,
    }
}

export default EditPost;