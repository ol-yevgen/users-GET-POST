import { Navbar } from '../Navbar/Navbar';
import logo from '../../assets/Logo.svg';

import './header.scss';

export const Header = ({ scrollToUsers, scrollToForm}) => {
   return(
       <header>
           <div className="header__content">
               <img src={logo} width="104px" height="26px" alt='logo' />
               <Navbar scrollToForm={scrollToForm} scrollToUsers={scrollToUsers} />
           </div>
       </header>
   )
}