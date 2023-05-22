import './button.scss';

export const Button = ({ text, func, style, className, disabled, submit }) => {
   return(
       <button
           className={`btn ${className}`}
           type={submit}
           onClick={func}
           style={style}
           disabled={disabled}
       >
           {text}
       </button>
   )
}