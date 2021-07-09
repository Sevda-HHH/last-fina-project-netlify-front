import './globalstatistics.scss'
import Gloves from '../../assets/img/Gloves.png'
import Image1 from '../../assets/img/Image1.png'
import image2 from '../../assets/img/image2.png'
import React from 'react'

interface IProps {
    totalDeath: number,
    titalConfirmed: number,
    totalRecovered: number
}

export const GlobalTotalStatistics: React.FC<IProps> = ({ totalDeath, titalConfirmed, totalRecovered }) => {
    return (
        <div id="glocalStatistics">
            <div className="container">
                <div className="row">
                    <div className="col-lg-4">
                        <div className="image w-100">
                            <img src={Gloves} className="w-100" alt="Gloves" />
                        </div>
                        <div className="numberOf w-100">
                            <div className="head">
                                <h2>Death</h2>
                            </div>
                            <div className="num">
                                <h4 data-testId="totalDeath">{totalDeath}</h4>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4">
                        <div className="image w-100">
                            <img src={image2} className="w-100" alt="Gloves" />
                        </div>
                        <div className="numberOf w-100">
                            <div className="head">
                                <h2>Confirmed </h2>
                            </div>
                            <div className="num">
                                <h4 data-testId="titalConfirmed">{titalConfirmed}</h4>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4">
                        <div className="image w-100">
                            <img src={Image1} className="w-100" alt="Gloves" />
                        </div>
                        <div className="numberOf w-100">
                            <div className="head">
                                <h2>Recovered</h2>
                            </div>
                            <div className="num">
                                <h4 data-testId="totalRecovered">{totalRecovered}</h4>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
