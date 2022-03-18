export type InputProps = {
    inputProps?: React.InputHTMLAttributes<HTMLInputElement>
    id: string;
    type?: React.InputHTMLAttributes<HTMLInputElement>['type']
}

export const Input = (props: InputProps) => {
    
    return (
        <input             
            {...props.inputProps}
            id={props.id}
            type={props.type}
            data-testid={`input-${props.id}`}
            className={`border border-2 rounded-r px-4 py-2 w-full`}  
        />
    )
}
