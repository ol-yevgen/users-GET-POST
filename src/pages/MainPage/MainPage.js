import { useState, Suspense, forwardRef, useEffect } from "react";
import { Hero } from "../../components/Hero/Hero";
import  Users  from "../../components/Users/Users";
import { CustomForm } from "../../components/Form/Form";
import { Spinner } from "../../components/Spinner/Spinner";
import { Successfully } from "../../components/Successfully /Successfully";

const MainPage = forwardRef((props, ref) => {

    const [formSubmited, setFormSubmited] = useState(false)

    const { refForm, refUsers } = ref;

    useEffect(() => {
        const interval = setTimeout(() => { 
            setFormSubmited(false)
        }, 3000)
        return () => clearTimeout(interval)
    }, [formSubmited, setFormSubmited])

    const successSubmit = formSubmited ? <Successfully/> : null

   return(
       <main>
           <Hero scrollToForm={props.scrollToForm} />
           <div className="main__content">
               <h2>Working with GET request</h2>
               <Suspense fallback={<Spinner />}>
                   <Users ref={refUsers} />
               </Suspense>
               <h2>Working with POST request</h2>
               <CustomForm
                   setFormSubmited={setFormSubmited}
                   ref={refForm} />
               {successSubmit}
           </div>
       </main>
   )
})

export default MainPage;