import successImage from '../../App/assets/success-image.svg';

import './successfully.scss';

export const Successfully = () => {
   return(
       <section className='successlully'>
           <h1>User successfully registered</h1>
           <img src={successImage} alt="" />
       </section>
   )
}