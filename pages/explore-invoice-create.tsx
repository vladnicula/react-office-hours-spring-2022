import { createElement, lazy, Suspense, useEffect, useState } from 'react'

import dynamic from 'next/dynamic'

import type { InvoiceCreateProps } from "../src/forms/InvoiceCreateForm/InvoiceCreateForm"

const DynamicInvoiceCreateForm = dynamic<InvoiceCreateProps>(
    () => import("../src/forms/InvoiceCreateForm/InvoiceCreateForm")
        .then((module) => {
            return module.InvoiceCreateForm
        }),
    { loading: () => <p>Loading</p>, ssr: false },
    
)


const ThePureReactWay = lazy(() => import("../src/forms/InvoiceCreateForm/InvoiceCreateForm")
    .then((module) => {
        return { default: module.InvoiceCreateForm }
    })
)

type ComponentType = (props: InvoiceCreateProps) => JSX.Element;

export default function () {

    const [isMounted, setIsMounted] = useState(false)
    const [DynamicComponent, setDynamicCompoennt] = useState<null | {component: ComponentType}>();

    useEffect(() => {
        setIsMounted(true)
        import("../src/forms/InvoiceCreateForm/InvoiceCreateForm")
            .then((module) => {
                return module.InvoiceCreateForm
            })
            .then((ComponentResult) => {
                setDynamicCompoennt({component: ComponentResult})
            })
    }, [])

    if ( !isMounted ) {
        return <div>Loading...</div>;
    }

    return (
        <>
        {/* <DynamicInvoiceCreateForm onInvoiceSubmitRequest={function (data): unknown {
            throw new Error("Function not implemented.");
        } } /> */}
        {/* <Suspense fallback={<div>Loading...</div>}>
            <ThePureReactWay onInvoiceSubmitRequest={function (data): unknown {
                throw new Error("Function not implemented.");
            } } />
        </Suspense> */}

        {/* {
            DynamicComponent ? createElement(DynamicComponent.component, 
                {
                    onInvoiceSubmitRequest: function (data): unknown {
                        throw new Error("Function not implemented.");
                    }
                }
            ) :  <p>Loading</p>
        } */}
        </>

    )
}