import { VisibilityOff, Visibility } from "@mui/icons-material";
import { FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput } from "@mui/material";
import { ReactNode, useState } from "react";

export type PasswordFieldProps = {
    fieldId: string
    labelTitle: string;
    inputProps?: React.InputHTMLAttributes<HTMLInputElement> & { [key: string]: any }
    errorMessage?: ReactNode;
}

export const PasswordField = (props: PasswordFieldProps) => {
    
    const [currentType, setCurrentType] = useState("password")

    const handleClickEyeIcon: React.MouseEventHandler = (ev) => {
        ev.preventDefault();
        setCurrentType((s) => s === 'text' ? "password" : "text")
    }

    return (
        <>
            <FormControl sx={{ width: '25ch' }} variant="outlined">
                {/* <Input type={currentType} id={props.fieldId} inputProps={{...props.inputProps}} /> */}
                <InputLabel htmlFor={props.fieldId}>{props.labelTitle}</InputLabel>
                <OutlinedInput
                    margin="dense"
                    id={props.fieldId}
                    label={props.labelTitle}
                    type={currentType}
                    endAdornment={
                        <InputAdornment position="end">
                            <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickEyeIcon}
                                onMouseDown={handleClickEyeIcon}
                                edge="end"
                                >
                            {currentType === 'text'  ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                        </InputAdornment>
                    }
                    inputProps={{...props.inputProps}}
                />
            </FormControl>
            {props.errorMessage}
        </>
    )
}
