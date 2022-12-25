import React, {ChangeEvent, KeyboardEventHandler} from 'react';
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
    handleKeyDown?: KeyboardEventHandler<HTMLDivElement> | undefined;
}

const Input = React.forwardRef((props: InputPropTypes, ref) => {
    const {
        disabled = false,
        handleChange,
        placeholder,
        label,
        value,
        className,
        handleKeyDown
    } = props;

    const classes = useStyles();

    return (
        <TextField
            style={{width: '50%'}}
            inputRef={ref}
            className={className}
            onChange={handleChange}
            id="standard-basic"
            label={label}
            placeholder={placeholder}
            value={value}
            disabled={disabled}
            onKeyDown={handleKeyDown}
        />

    );
})


export default Input;
