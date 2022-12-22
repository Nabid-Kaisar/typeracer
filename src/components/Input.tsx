import React, {ChangeEvent} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: '25ch',
        },
    },
}));

interface InputPropTypes {
    value: string;
    handleChange: (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>)=> void;
    placeholder: string;
    label: string;
    className?: string;
}

const Input:React.FC<InputPropTypes>= ({handleChange, placeholder, label, value,className}) => {
    const classes = useStyles();

    return (
        <form className={classes.root} noValidate autoComplete="off">
            <div>
                <TextField
                    className={className}
                    onChange={handleChange}
                    id="standard-basic"
                    label={label}
                    placeholder={placeholder}
                    value={value}
                />
            </div>
        </form>
    );
};

export default Input;
