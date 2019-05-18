import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import withStyles from '@material-ui/core/styles/withStyles';

const styles = theme => ({
 
    paper: {
      marginTop: theme.spacing.unit * 8,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      maxWidth: 600,
      padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
    },
    avatar: {
      margin: theme.spacing.unit,
      backgroundColor: theme.palette.secondary.main,
    },
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing.unit,
    },
    submit: {
      marginTop: theme.spacing.unit * 3,
    },
});

class VForm extends React.Component{

    constructor(props){
        super(props);
    }

    render(){
        const { classes } = this.props;
        return (
            <form className={classes.form}>
                <FormControl margin="normal" required fullWidth>
                    <InputLabel htmlFor="email">邮箱</InputLabel>
                    <Input id="email" type="email" name="email" autoComplete="email" autoFocus />
                </FormControl>
                <FormControl margin="normal" required fullWidth>
                    <InputLabel htmlFor="username">用户名</InputLabel>
                    <Input id="username" name="username" autoComplete="username" />
                </FormControl>
                <FormControl margin="normal" required fullWidth>
                    <InputLabel htmlFor="password">密码</InputLabel>
                    <Input name="password" type="password" id="password" autoComplete="current-password" />
                </FormControl>
                <FormControl margin="normal" required fullWidth>
                    <InputLabel htmlFor="password">重复密码</InputLabel>
                    <Input name="password" type="password" id="password" autoComplete="current-password" />
                </FormControl>
                
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                >
                    Sign in
                </Button>
            </form>
        )
    }
}

VForm.propTypes = {
    classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(VForm);