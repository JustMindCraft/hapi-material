import PostEdit from '../../components/modules/post/PostEdit';
import Home from "../../components/layouts/Home";

class NewPost extends React.Component {
   
    render(){
        return (<Home title="新建文章">
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