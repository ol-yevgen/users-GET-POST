import { useImageLazyLoading } from '../../hooks/useImageLazyLoading';
import placeholder from '../../App/assets/placeholder.png';

import './user.scss';

export const User = ({ photo, name, position, email, phone }) => {

    const photoLazy = useImageLazyLoading(photo)

    return (
        <li className='user'>
            <img src={photoLazy || placeholder} width='70px' height='70px' alt="" />
            <p className="user__name">{name}</p>
            <p>{position}<br />
                {email}<br />
                {phone}
            </p>
        </li>
    )
}