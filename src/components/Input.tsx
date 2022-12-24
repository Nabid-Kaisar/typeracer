import React, {ChangeEvent} from 'react';
import {makeStyles} from '@material-ui/core/styles';
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
    handleChange: (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => void;
    placeholder: string;
    label: string;
    className?: string;
    disabled?: boolean;
}

const Input = React.forwardRef((props: InputPropTypes, ref) => {
    const {
        disabled = false,
        handleChange,
        placeholder,
        label,
        value,
        className
    } = props;

    const classes = useStyles();

    return (
        <form className={classes.root} noValidate autoComplete="off">
            <div>
                <TextField
                    inputRef={ref}
                    className={className}
                    onChange={handleChange}
                    id="standard-basic"
                    label={label}
                    placeholder={placeholder}
                    value={value}
                    disabled={disabled}
                />
            </div>
        </form>
    );
})


export default Input;
