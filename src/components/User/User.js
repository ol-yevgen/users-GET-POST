import './user.scss';

export const User = ({ photo, name, position, email, phone }) => {
    return (
        <li className='user'>
            <img src={photo} alt="" />
            <p className="user__name">{name}</p>
            <p>{position}<br />
                {email}<br />
                {phone}
            </p>
        </li>
    )
}