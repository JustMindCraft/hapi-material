import { Paper, Tabs, Tab } from "@material-ui/core";

class StatusTabs extends React.Component{
    state = {
        value: 0,
    };
    handleChange = (event, value) => {
        this.setState({ value });
        const { statuses } = this.props;
        this.props.onTabChange(statuses[value].id);
    };

    componentWillReceiveProps(nextProps){
        const { currentStatus } = nextProps;
        this.covertId(currentStatus);
    }

    componentDidMount(){
        const { currentStatus } = this.props;
        this.covertId(currentStatus);
    }
    covertId = (id) => {
        let value = 0;
        const { statuses } = this.props;
        for (let index = 0; index < statuses.length; index++) {
            const item = statuses[index];
            if(item.id === id){
                value = index;
            }
        }
        this.setState({
            value,
        })
    }
    
    render(){
        const { statuses } = this.props;
        return (
            <Paper>
            <Tabs  
              value={this.state.value}
              indicatorColor="primary"
              textColor="primary"
              onChange={this.handleChange}
              >
              {
                  statuses.map((state, index) => 
                    <Tab label={state.label} key={index}/>
                    )
              }
             
              
            </Tabs>
          </Paper>
        )
    }
}

export default StatusTabs;