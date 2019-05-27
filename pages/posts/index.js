import { Link, Paper, Typography } from "@material-ui/core";
import EnhancedTable from "../../components/modules/EnhancedTable";
import Home from "../../components/layouts/Home";
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import PostTableDataItem from "../../components/modules/PostTableDataItem";

const rows = [
    { id: 'cover', numeric: false, disablePadding: false, label: '封面' },
    { id: 'title', numeric: false, disablePadding: false, label: '文章标题' },
    { id: 'isPublic', numeric: true, disablePadding: false, label: '是否公开' },
    { id: 'breif', numeric: true, disablePadding: false, label: '摘要' },
    { id: 'readCount', numeric: true, disablePadding: false, label: '阅读量' },
    { id: 'benifit', numeric: true, disablePadding: false, label: '收益速度' },
    { id: 'created', numeric: true, disablePadding: false, label: '发布时间' },
    { id: 'opera', numeric: true, disablePadding: true, label: '操作' },
]

const statuses = [
    {id: "draft", label: "草稿"}, 
    {id: "published", label: "已发布"},
    {id: "deleted", label: "回收站"}
]

class Posts extends React.Component {
    render(){
        const { posts, currentUser, initStatus } = this.props;
        
        return (
            <Home title="我的文章" currentUser={currentUser}>
                <Paper style={{
                  padding: 10
                }}>
                <Breadcrumbs aria-label="Breadcrumb">
                  <Link color="inherit" href="/personal" >
                    个人中心
                  </Link>
                  <Typography color="textPrimary">文章列表</Typography>
                </Breadcrumbs>
                </Paper>
                <EnhancedTable initStatus={initStatus} statuses={statuses} rows={rows} data={posts} source="posts" label="文章" DataItemComponent={PostTableDataItem}/>
            </Home>
        )
    }
}

Posts.getInitialProps = async (props) => {
    
    return {
        posts: props.query.posts,
        currentUser: props.query.currentUser,
        initStatus: props.query.status
    }
}

export default Posts