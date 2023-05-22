import { Suspense, lazy, useRef } from 'react';
import { useScrollToElement } from '../hooks/useScrollToElement';

import { Spinner } from "../components/Spinner/Spinner"
import { Header } from '../App/layouts/Header/Header';

const MainPage = lazy(() => import('../pages/MainPage/MainPage'));

export const App = () => {
    const refUsers = useRef(null);
    const refForm = useRef(null);

    const scrollToUsers = useScrollToElement(refUsers)
    const scrollToForm = useScrollToElement(refForm)

    return (
        <Suspense fallback={<Spinner />}>
            <Header scrollToForm={scrollToForm} scrollToUsers={scrollToUsers} />
            <MainPage
                scrollToForm={scrollToForm}
                ref={{ refForm: refForm, refUsers: refUsers }} />
        </Suspense>
    );
}