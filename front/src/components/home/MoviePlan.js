const MoviePlan = () => {
    return (
        <section className="section section--pb0 section--gradient">
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <h2 className="section__title">Select Your Plan</h2>
                        <p className="section__text">No hidden fees, equipment rentals, or installation appointments.</p>
                    </div>
                </div>

                <div className="row">
                    <div className="col-12 col-md-6 col-xl-4 order-md-2 order-xl-1">
                        <div className="plan">
                            <h3 className="plan__title">Regular</h3>
                            <ul className="plan__list">
                                <li className="green"><svg width="19" height="14" viewBox="0 0 19 14" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1.43994 6.95981L6.77477 12.2924L17.4399 1.62723" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg> FlixTV Originals</li>
                                <li className="green"><svg width="19" height="14" viewBox="0 0 19 14" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1.43994 6.95981L6.77477 12.2924L17.4399 1.62723" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg> Switch plans or cancel anytime</li>
                                <li className="red"><svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M17.596 1.59982L1.60938 17.5865" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M17.601 17.5961L1.60101 1.5928" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg> Stream 65+ top Live</li>
                                <li className="red"><svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M17.596 1.59982L1.60938 17.5865" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M17.601 17.5961L1.60101 1.5928" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg> TV channels</li>
                            </ul>
                            <span className="plan__price">$11.99<span>/month</span></span>
                            <button className="plan__btn" type="button">Select plan</button>
                        </div>
                    </div>

                    <div className="col-12 col-xl-4 order-md-1 order-xl-2">
                        <div className="plan plan--best">
                            <h3 className="plan__title">Premium</h3>
                            <ul className="plan__list">
                                <li className="green"><svg width="19" height="14" viewBox="0 0 19 14" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1.43994 6.95981L6.77477 12.2924L17.4399 1.62723" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg> FlixTV Originals</li>
                                <li className="green"><svg width="19" height="14" viewBox="0 0 19 14" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1.43994 6.95981L6.77477 12.2924L17.4399 1.62723" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg> Switch plans or cancel anytime</li>
                                <li className="green"><svg width="19" height="14" viewBox="0 0 19 14" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1.43994 6.95981L6.77477 12.2924L17.4399 1.62723" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg> Stream 65+ top Live</li>
                                <li className="red"><svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M17.596 1.59982L1.60938 17.5865" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M17.601 17.5961L1.60101 1.5928" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg> TV channels</li>
                            </ul>
                            <span className="plan__price">$34.99<span>/month</span></span>
                            <button className="plan__btn" type="button">Select plan</button>
                        </div>
                    </div>

                    <div className="col-12 col-md-6 col-xl-4 order-md-3 order-xl-3">
                        <div className="plan">
                            <h3 className="plan__title">Premium + TV channels</h3>
                            <ul className="plan__list">
                                <li className="green"><svg width="19" height="14" viewBox="0 0 19 14" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1.43994 6.95981L6.77477 12.2924L17.4399 1.62723" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg> FlixTV Originals</li>
                                <li className="green"><svg width="19" height="14" viewBox="0 0 19 14" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1.43994 6.95981L6.77477 12.2924L17.4399 1.62723" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg> Switch plans or cancel anytime</li>
                                <li className="green"><svg width="19" height="14" viewBox="0 0 19 14" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1.43994 6.95981L6.77477 12.2924L17.4399 1.62723" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg> Stream 65+ top Live</li>
                                <li className="green"><svg width="19" height="14" viewBox="0 0 19 14" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1.43994 6.95981L6.77477 12.2924L17.4399 1.62723" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg> TV channels</li>
                            </ul>
                            <span className="plan__price">$49.99<span>/month</span></span>
                            <button className="plan__btn" type="button">Select plan</button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default MoviePlan;