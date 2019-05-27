import React from 'react';
import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import {  withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';
import Home from '../components/layouts/Home';
import SearchInput from '../components/modules/SearchInput';
import { Button, CircularProgress } from '@material-ui/core';

function MadeWithLove() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Built with love by the '}
      <Link color="inherit" href="https://material-ui.com/">
        Material-UI
      </Link>
      {' team.'}
    </Typography>
  );
}
const useStyles = theme => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    "&:hover": {
      backgroundColor: "rgba(191, 188, 188, 0.25)",
      cursor: "pointer"
    }
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
    "&:hover": {
      backgroundColor: "rgba(191, 188, 188, 0.25)",
      cursor: "pointer"
    }
  },
  cardContent: {
    flexGrow: 1,
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
});


class NewPostList extends React.Component{
    constructor(props){
      super(props);
      this.state = {
        pending: false,
      }
    }
    handleCardClick = (e, postId) => {
      this.setState({
        pending: true,
      })
      window.open(`/posts/${postId}`, "_blank");
      setTimeout(()=>{
        this.setState({
          pending: false,
        })
      }, 1234)
    }
    componentDidMount(){
      this.setState({
        pending: false,
      })
    }
    render(){
      const { pending } = this.state;
       const { classes, currentUser, posts, page } = this.props;
        return (
              <Home title="最新文章" currentUser={currentUser}>
              {/* Hero unit */}
              <div className={classes.heroContent}>
                <Container maxWidth="sm">
                  <SearchInput />
                  
                </Container>
              </div>
              <Container className={classes.cardGrid} maxWidth="md">
                {/* End hero unit */}
                {
                  pending?  <div style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    alignContent: "center",
                    width: "100%",
                    height: 560
                  }}>
                  <div>
                   <CircularProgress  size={80} />   <br/>
        
                  </div>
                  <div>
                  <Typography variant="h4">"正在加载中"</Typography>  
        
                  </div>
                  </div>
                  :
                  <Grid container spacing={4}>
                  {posts.map(card => (
                    <Grid item key={card} xs={12} sm={6} md={4} >
                      <Card className={classes.card}  onClick={e => this.handleCardClick(e, card._id)}>
                        <CardMedia
                          className={classes.cardMedia}
                          image={card.cover? card.cover: "https://res.cloudinary.com/ddycd5xyn/image/upload/v1551880969/default.jpg"}
                          title="Image title"
                        />
                        <CardContent className={classes.cardContent}>
                          <Typography gutterBottom variant="h5" component="h2">
                            {card.title}
                          </Typography>
                          <Typography>
                            {card.breif}
                          </Typography>
                        </CardContent>
                        {/* <CardActions>
                          <Button size="small" color="primary">
                            View
                          </Button>
                          <Button size="small" color="primary">
                            Edit
                          </Button>
                        </CardActions> */}
                      </Card>
                    </Grid>
                  ))}
                </Grid>

                }
               
              </Container>
              <div>
                <Button disabled={parseInt(page)===1} variant="outlined" color="primary" component="a" href={`/new/posts?page=${(parseInt(page)-1).toString()}`}>上一页</Button>
                <Button  variant="outlined" color="secondary"  component="a"  href={`/new/posts?page=${(parseInt(page)+1).toString()}`}>下一页</Button>
              </div>
            {/* Footer */}
           {/* <footer className={classes.footer}>
               <Typography variant="h6" align="center" gutterBottom>
                 Footer
               </Typography>
               <Typography variant="subtitle1" align="center" color="textSecondary" component="p">
                 Something here to give the footer a purpose!
               </Typography>
               <MadeWithLove />
             </footer> */}
          </Home>
        );
    }
}

NewPostList.propTypes = {
    classes: PropTypes.object.isRequired,
};
  
NewPostList.getInitialProps = async (props) => {
    return {
      msg: props.query.msg,
      currentUser: props.query.currentUser,
      loaded: true,
      posts: props.query.posts,
      page: props.query.page
    }
}
export default withStyles(useStyles)(NewPostList);