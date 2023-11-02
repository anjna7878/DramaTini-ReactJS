import React from 'react'
import SocialLogin from 'react-social-login'
import Button from '@material-ui/core/Button';

class SocialButton extends React.Component {

    render() {
      const { children, triggerLogin, ...props } = this.props
      return (
          // <button onClick={triggerLogin} {...props}>
          //   {children}
          // </button>

             <Button variant="contained" disableElevation onClick={triggerLogin} {...props}>
               {children}
               </Button> 

      );
    }
}

export default SocialLogin(SocialButton);