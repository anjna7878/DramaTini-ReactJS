import React from 'react'
import SocialLogin from 'react-social-login'
import Button from '@material-ui/core/Button';


import NumberFormat from 'react-number-format';


function NumberFormatCustom(props) {
    const { inputRef, onChange, ...other } = props;
    const MAX_VAL = 100;
    const withValueCap = (inputObj) => {
      const { value } = inputObj;
      if (value <= MAX_VAL) return true;
      return false;
    };
    return (
        <NumberFormat
            {...other}
            // getInputRef={inputRef}
            isAllowed={withValueCap}
            // allowNegative={false}
            // onValueChange={(values) => {
            //     onChange({
            //         target: {
            //             name: props.name,
            //             value: values.value,
            //         },
            //     });
            // }}
            // isNumericString
        />
    );
}

export default NumberFormatCustom;
