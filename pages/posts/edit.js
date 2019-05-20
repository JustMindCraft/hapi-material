import PostEdit from '../../components/modules/post/PostEdit';
import Home from "../../components/layouts/Home";

class EditPost extends React.Component {
   
    render(){
        return (<Home title="编辑文章">
          <PostEdit post={this.props.post}/>
        </Home>);
    }
}

EditPost.getInitialProps = async (props) => {
  
    return {
      post: props.query.post,
    }
}

export default EditPost;