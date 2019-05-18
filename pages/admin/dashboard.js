import Admin from "../../components/layouts/Admin";

class DashBoard extends React.Component{
    render(){
        const { msg } = this.props;
        return (
            <Admin msg={msg} />
        )
    }
}
DashBoard.getInitialProps = async (props) => {
    
    return {
        msg: props.query.msg
    }
}

export default DashBoard