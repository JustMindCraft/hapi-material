import Home from "../components/layouts/Home";
import { Typography } from "@material-ui/core";

export default class Error extends React.Component {
    render(){
        return (
            <Home>
                <div>
                <Typography variant="h2">404</Typography>
                <Typography variant="h4">页面未找到</Typography>
                </div>
               
            </Home>
        )
    }
}
