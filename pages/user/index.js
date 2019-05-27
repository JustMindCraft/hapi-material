import Home from "../../components/layouts/Home";
import { Typography, Link, List, ListItem, ListItemAvatar, Avatar } from "@material-ui/core";
class UserShow extends React.Component {
    render(){
        const { user, posts, currentUser} = this.props;
        return(
            <Home title="作者文章" currentUser={currentUser}>
                <div style={{
                    padding: "5%",
                    width: "100%"
                }}><br/>
                    <Typography style={{
                        width: "100%",
                        wordBreak: "break-all"
                    }} variant="h4">{user.email}的最新文章</Typography><br/>
                    <List>
                    {
                        posts.map((post, index)=>
                            <ListItem>
                                <ListItemAvatar>
                                    <Avatar>
                                       <img src={post.cover}/>
                                    </Avatar>
                                </ListItemAvatar>
                                <Link href={`/posts/${post._id}`} key={index}>{post.title}</Link>
                            </ListItem>
                        )
                        }
                    </List>
                </div>
               
            </Home>
        )
    }
}
UserShow.getInitialProps = async (props) => {
  
    return {
      msg: props.query.msg,
      posts: props.query.posts,
      user: props.query.user,
      currentUser: props.query.currentUser,
    }
}

export default UserShow
  