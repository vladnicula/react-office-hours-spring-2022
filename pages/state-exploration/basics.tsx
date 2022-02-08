import { useMemo, useState } from "react";

const superComplicatedMethodThatReturns0 = () => {
    for ( let i = 0; i < 10000; i +=1 ) {

    }

    console.log("Just fnished doing something really hard on the CPU")
    return 0;
}

const Page = () => {

    const [count, setCount] = useState(superComplicatedMethodThatReturns0)

    console.log("page updates and count is", count)
    
    const loadingOrContent = count ? (
        <div>some contnet</div>
    ) : (
        <svg className="text-black animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg> 
    )

    return (
        <div className="flex flex-col items-center justify-center h-screen w-screen">
            {count}

            { loadingOrContent }
            <button
                onClick={() => {
                    setCount((previousState) => previousState + 1)
                }}
            >+ increment</button>
        </div>
    )
}

export default Page;