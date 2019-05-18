import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';

class Message extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            open: false,
            content: ""
        }
    }

    componentWillMount(){
        const { open, content } = this.props;
        this.setState({
            open, content,
        })
    }

    handleClose = () => {
        this.setState({
            open: false,
            content: ""
        })
    }
   
    render(){
        const { open, content } = this.state;
        return (
            <Snackbar
            anchorOrigin={{ vertical: "top", horizontal: "left" }}
            autoHideDuration={3123}
            onClose = {this.handleClose}
            open={open}
            message={<span>{content}</span>}
          />
        )
    }
}

export default Message;