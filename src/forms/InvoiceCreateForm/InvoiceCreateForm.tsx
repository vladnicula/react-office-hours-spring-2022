import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, TextField } from "@mui/material";
import { useFieldArray, useForm } from "react-hook-form";

import { ErrorMessage } from "../../containers/ClientTableContainer";

const InvoiceItemSchema = yup.object({
    description: yup.string().required("item description is required"),
    quantity: yup.number().default(1).min(1).typeError("quantity must be a positive number"),
    price: yup.number().required().typeError("price must be a positive number")
})

type InvoiceItemSchemaData = yup.InferType<typeof InvoiceItemSchema>

const InvoiceFormSchema = yup.object({
    number: yup.string().required(),
    projectCode: yup.string(),
    items: yup.array().of(InvoiceItemSchema).required().min(1)
})

export interface InvoiceFormData extends Omit<yup.InferType<typeof InvoiceFormSchema>, 'items'> {
    items: InvoiceItemSchemaData[]
}

export type InvoiceCreateProps = {
    genericError?: string;
    onInvoiceSubmitRequest: (data: InvoiceFormData) => unknown
}

export const InvoiceCreateForm = (props: InvoiceCreateProps) => {

    const { control, register, handleSubmit, formState: { errors } } = useForm<InvoiceFormData>({ 
        mode: "onBlur",
        resolver: yupResolver(InvoiceFormSchema),
        defaultValues: {
            items: [{}]
        }
    });

    const { fields: items, append, prepend, remove, swap, move, insert } = useFieldArray({
        control,
        name: "items",
    });

    const handleInvoiceRequest = (data: InvoiceFormData) => {
        console.log("ready to submit", data)
    }

    return (
        <div className="flex h-screen items-center justify-center">
            <div className="max-w-lg bg-white shadow-2xl rounded-lg p-8">
                { props.genericError ? <ErrorMessage message={props.genericError} /> : null}
                <form className="flex flex-col" onSubmit={handleSubmit(handleInvoiceRequest)}>

                    <TextField 
                        margin="normal" 
                        id="name"
                        label="Email"
                        inputProps={{...register("number", { required: true }), "data-test": "invoice-number"  }}
                        error={!!errors.number}
                        helperText={errors.number?.message}
                        
                    />

                    { !items.length && errors.items && !errors.items.length ? <ErrorMessage message={(errors.items as any).message} /> : null}
                    
                    {items.map((field, index) => (
                        <div
                            key={field.id}
                            className="flex"
                        >
                            <button
                                disabled={items.length === 1}
                                onClick={(ev) => {
                                    ev.preventDefault();
                                    remove(index);
                                }}
                            >-</button>
                            <TextField 
                                className="flex-1"
                                margin="normal" 
                                id="name"
                                inputProps={{...register(`items.${index}.description`), 'data-test': `invoice-item-${index}-description`} }
                                error={!!errors.items?.[index]?.description ?? false}
                                helperText={errors.items?.[index]?.description?.message}
                                
                            />
                            <TextField 
                                className="flex-1"
                                margin="normal" 
                                id="name"
                                inputProps={{...register(`items.${index}.quantity`), 'data-test': `invoice-item-${index}-quantity`} }
                                error={!!errors.items?.[index]?.quantity}
                                helperText={errors.items?.[index]?.quantity?.message}
                                
                            />
                            <TextField 
                                className="flex-1"
                                margin="normal" 
                                id="name"
                                inputProps={{...register(`items.${index}.price`), 'data-test': `invoice-item-${index}-price`} }
                                error={!!errors.items?.[index]?.price}
                                helperText={errors.items?.[index]?.price?.message}
                            />
                        </div>
                    ))}

                    <button
                        onClick={(ev) => {
                            ev.preventDefault();
                            append({})
                        }}
                    >+</button>

                    <br/>
                    <div className="flex justify-between">
                        <Button 
                            type="submit"
                            variant="contained"
                        >
                            Create  
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default InvoiceCreateForm;
