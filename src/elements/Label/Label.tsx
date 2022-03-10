type LabelProps = {
    title: string;
    htmlFor: string;
    labelProps?: React.LabelHTMLAttributes<HTMLLabelElement>
}

export const Label = (props: LabelProps) => {
    
    return (
        <label             
            {...props.labelProps}
            htmlFor={props.htmlFor}
        >
            {props.title}
        </label>
    )
}
