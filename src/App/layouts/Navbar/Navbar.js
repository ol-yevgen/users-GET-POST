import { Button } from '../../../components/UI/Button/Button';
import './navbar.scss';

export const Navbar = ({ scrollToUsers ,scrollToForm }) => {
   return(
       <nav className="navbar">
           <Button
               text={'User'}
               func={scrollToUsers}
           />
           <Button
               text={'Sign Up'}
               func={scrollToForm}
           />
       </nav>
   )
}