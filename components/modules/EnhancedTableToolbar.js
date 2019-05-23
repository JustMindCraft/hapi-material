import { Toolbar, Typography, Tooltip, IconButton, TextField, Button } from "@material-ui/core";
import DeleteIcon from '@material-ui/icons/Delete';
import FilterListIcon from '@material-ui/icons/FilterList';
import SearchIcon from '@material-ui/icons/Search';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { lighten } from '@material-ui/core/styles/colorManipulator';
import classNames from 'classnames';

const toolbarStyles = theme => ({
    root: {
      paddingRight: theme.spacing.unit,
      width: "100%",
      zIndex: "1100",
      color:  theme.palette.primary.main,
      border: "1px dotted",
      height: "auto"
    },
    highlight:
    
      theme.palette.type === 'light'
        ? {
            color: theme.palette.secondary.main,
            backgroundColor: lighten(theme.palette.secondary.light, 0.85),
            position: 'fixed',
            top: 50
          }
        : {
            color: theme.palette.text.primary,
            backgroundColor: theme.palette.secondary.dark,
          },
    spacer: {
      flex: '1 1 100%',
    },
    actions: {
      color: theme.palette.text.secondary,
    },
    title: {
      flex: '0 0 auto',
    },
  });
  
class EnhancedTableToolbar extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            searchOpen: false,
        }
    }

    showSearch = (e) => {
        const { searchOpen } = this.state;
        this.setState({
            searchOpen: !searchOpen,
        })
    }
    render(){
        const { numSelected, classes, label } = this.props;
        const { searchOpen } = this.state;
        return (
            <Toolbar
            className={classNames(classes.root, {
              [classes.highlight]: numSelected > 0,
            })}
          >
            <div className={classes.title}>
              {numSelected > 0 ? (
                <Typography color="inherit" variant="subtitle1">
                  {numSelected}项被选择
                </Typography>
              ) : (
                  <div style={{
                      display: "flex",
                      flexDirection: "row",
                      alignContent: "center",
                      alignItems: "center",
                      justifyContent: "center"
                  }}>
                      <Typography variant="h6" id="tableTitle">
                          {label}列表--
                      </Typography>
                      <Button component="a" href="/posts/new" color="primary" variant="contained" size="small">创作新{label}</Button>
                      <br/>
                    
                  </div>
              )}
            </div>
            <div className={classes.spacer} />
            <div className={classes.actions}>
              {numSelected > 0 ? (
                <Tooltip title="删除">
                  <IconButton  onClick={e => this.props.onDeleteMany()} aria-label="删除">
                    <DeleteIcon />
                  </IconButton>
                </Tooltip>
              ) : (
                <Tooltip title="检索">
                  <IconButton onClick={this.showSearch} aria-label="搜索">
                    <SearchIcon />
                  </IconButton>
                </Tooltip>
              )}
               { searchOpen && <div style={{
                 position: "fixed",
                 width: "100%",
                 left: 10,
                 background: "white",
                 display: "flex",
                 alignItems: "center",
                 justifyContent: "center"
               }}>
                <TextField label="搜索" placeholder="标题 | 正文内容" />
              </div>}
            </div>
           
          </Toolbar>
        )
         
    }
}

EnhancedTableToolbar.propTypes = {
    classes: PropTypes.object.isRequired,
    numSelected: PropTypes.number.isRequired,
  };
  
export default withStyles(toolbarStyles)(EnhancedTableToolbar);