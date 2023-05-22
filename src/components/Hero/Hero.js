import { Button } from '../UI/Button/Button';

export const Hero = ({ scrollToForm }) => {
    return (
        <section className="hero">
            <div className="hero__background"></div>
            <div className="hero__content">
                <h1 className="hero__title">
                    Test assignment for front-end developer
                </h1>
                <p className="hero__text">
                    What defines a good front-end developer is one that has skilled knowledge of HTML, CSS, JS with a vast understanding of User design thinking as they'll be building web interfaces with accessibility in mind. They should also be excited to learn, as the world of Front-End Development keeps evolving.
                </p>
            </div>
            <Button
                text={'Sign Up'}
                func={scrollToForm}
            />
        </section>
    )
}