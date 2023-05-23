import { useEffect, useCallback, memo, useState, useMemo, forwardRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { User } from '../User/User';
import { Button } from "../UI/Button/Button"
import { fetchUsers, usersCount } from "../../redux/features/slices/usersSlice";

import { Spinner } from '../Spinner/Spinner';

const Users = forwardRef((props, ref) => {
    const users = useSelector(state => state.users.users);
    const offset = useSelector(state => state.users.usersCount);
    const totalPages = useSelector(state => state.users.totalPages);
    const usersLoadingStatus = useSelector(state => state.users.usersLoadingStatus);

    const [fetching, setFetching] = useState(false);
    const memoTotalPages = useMemo(() => totalPages, [totalPages])

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchUsers(`https://frontend-test-assignment-api.abz.agency/api/v1/users?page=1&count=6`))
        dispatch(usersCount())
        // eslint-disable-next-line
    }, []);


    useEffect(() => {
        offset < memoTotalPages ? setFetching(false) : setFetching(true);
        // eslint-disable-next-line
    }, [offset])

    const renderUsersList = (arr) => {


        return arr.map(({ id, ...props }) => {
            return <User key={id} {...props} />
        })
    }

    const addMoreUsers = useCallback(() => {
        dispatch(fetchUsers(`https://frontend-test-assignment-api.abz.agency/api/v1/users?page=${offset}&count=6`))
        dispatch(usersCount())
        // eslint-disable-next-line
    }, [dispatch, offset])

    const elements = renderUsersList(users);

    if (usersLoadingStatus === "loading") {
        return <Spinner />;
    } else if (usersLoadingStatus === "error") {
        return <h5 className="text-center mt-5">Ошибка загрузки</h5>
    }

    if (users.length === 0) {
        return <h3 className='users-not-found'>No any users</h3>
    }

    return (
        <section
            className="users"
            ref={ref}
        >
            <ul className="users__list">
                {elements}
            </ul>
            <Button
                text="Show more"
                func={addMoreUsers}
                style={fetching ? { display: 'none' } : { display: 'block' }}
            />
        </section>
    )
})

export default memo(Users);

