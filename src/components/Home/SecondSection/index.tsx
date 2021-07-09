import Gloves from '../../../assets/img/Gloves.png'
export const SecondSection = () => {
    return (
        <section id="secondSection">
            <div className="container">
                <div className="row pt-5">
                    <div className="col-lg-6">
                        <img src={Gloves} className="w-100" alt="Gloves Virus" />
                    </div>
                    <div className="col-lg-6 content pt-5">
                        <div className="head">
                            About Covid-19
                        </div>
                        <div className="title">
                            <h2>
                                What is novel coronavirus?
                            </h2>
                        </div>
                        <div className="des">
                            <h4>
                                More than 78,191 people have contracted the virus in China. Health authorities have identified many other people with COVID-19 around the world, including in the United States. On January 31, 2020, the virus pass from one person to another in the U.S. Coronaviruses are a type of virus. There are many different kinds.
                            </h4>
                        </div>
                        <div className="checkSymptomsBtn">
                            <button className="btn btn-primary d-block">  Check Symptoms</button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}