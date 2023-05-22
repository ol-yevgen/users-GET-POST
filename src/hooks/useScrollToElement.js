import { useCallback } from "react";

export const useScrollToElement = (ref) => {
    const scrollTo = useCallback(() => {
        ref.current?.scrollIntoView({ behavior: 'smooth' });
    }, [ref])

    return scrollTo
}