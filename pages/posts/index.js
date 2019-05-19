class Posts extends React.Component {
    render(){
        const { posts } = this.props;
        return (
            <ul>
                {posts.map((post, index)=> 
                <li key={index}>
                    {post.title}
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