import { Link } from "@material-ui/core";

class Posts extends React.Component {
    render(){
        const { posts } = this.props;
        return (
            <ul>
                {posts.map((post, index)=> 
                <li key={index}>
                    {post.title}
                    &nbsp;<Link href={`/posts/${post._id}/edit`}>编辑</Link>
                    &nbsp;<Link href={`/posts/${post._id}`}>查看</Link>
                </li>
                )}
            </ul>
        )
    }
}

Posts.getInitialProps = async (props) => {
    
    return {
        posts: props.query.posts,
    }
}

export default Posts