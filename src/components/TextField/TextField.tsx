import { Input, InputProps } from "../../elements/Input/Input"
import { Label } from "../../elements/Label/Label"

export type TextFieldProps = {
    fieldId: string
    labelTitle: string;
    inputProps?: InputProps['inputProps']
    errorMessage?: string;
}

export const TextField = (props: TextFieldProps) => {
    return (
        <>
            <Label htmlFor={props.fieldId} title={props.labelTitle} />
            <Input id={props.fieldId} inputProps={{...props.inputProps}} />
            {props.errorMessage && <span>{props.errorMessage}</span>}
        </>
    )
}
