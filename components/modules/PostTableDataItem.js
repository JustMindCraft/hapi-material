import { TableCell, Link } from "@material-ui/core";
import moment from 'moment';
import 'moment/locale/zh-cn';

class PostTableDataItem extends React.Component {
    render(){
        const { item } = this.props;
        return (
            <React.Fragment>
                <TableCell align="right">
                        <img style={{
                            width: 100,
                            height: 100
                        }} src={item.cover==="" || !item.cover ? "https://res.cloudinary.com/ddycd5xyn/image/upload/v1551880969/default.jpg": item.cover} />
                </TableCell>
                <TableCell component="th" scope="row" padding="none">
                <Link href={`/posts/${item._id}?from=list`}>{item.title? item.title: "未命名标题"}</Link>
                </TableCell>
                <TableCell align="right">{item.isPublic? "公开": "密码："+item.password}</TableCell>
                <TableCell align="right" style={{padding: 0, textAlign: "left"}} >{item.breif}</TableCell>
                <TableCell align="right">{item.read? item.read:0}</TableCell>
                <TableCell align="right">{item.speed? item.speed:0}%</TableCell>
                <TableCell align="right" style={{
                    width: "16%",
                    wordBreak: "keep-all"
                }}>{moment(item.created).format('lll')}</TableCell>
            </React.Fragment>
        )
    }
}

export default PostTableDataItem;