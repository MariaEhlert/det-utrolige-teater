import { useEffect } from "react"

const Layout = props => {
    useEffect(() => {
        document.title = props.title
        //sætter description på vores browser så der ikke står react app
        if (props.description) {
            document.querySelector('meta[name="description"]')
                .setAttribute('content', props.description)
        }
    }, [props.title, props.description])
    return (
        <>
            {/* sætter section rundt om indholdet i children fra layout */}
            {/* så det er ligger inde i layout componetet */}
            <section>{props.children}</section>
        </>
    )
}

export { Layout }