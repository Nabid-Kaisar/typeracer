import {useEffect} from "react";

interface useKeyHandlerArgs {
    eventName: keyof DocumentEventMap;
    handlerCb: EventListenerOrEventListenerObject;
}

export default function useKeyHandler({eventName, handlerCb}: useKeyHandlerArgs) {
    useEffect(() => {
        document.addEventListener(eventName, handlerCb)
        return () => {
            document.removeEventListener(eventName, handlerCb)
        }
    }, [])
}