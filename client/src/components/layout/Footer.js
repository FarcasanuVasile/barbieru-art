import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="footer bg-dark ">
            <div className="footer-main py-4">
                <div className="container">
                    <div className="row py-4">
                        <div className="col-md-3 mb-md-0 mb-4">
                            <h3 className="text-white">BARBIERU ART</h3>
                        </div>
                        <div className="col-md-4 mb-md-0 mb-4 text-white">
                            <p>
                                <i className="fas fa-map-marker-alt mr-2"></i>
                                <span>5 Rue Victor Hugo, 91410 Dourdan</span>
                                
                            </p>
                            <p>
                                <i className="far fa-envelope mr-2"></i>
                                <a className="text-white" href="mailto:barbierubarbieru_art@yahoo.com">barbierubarbieru_art@yahoo.com</a>
                            </p>
                            <p>
                                <i className="fas fa-phone-alt mr-2"></i>
                                <a className="text-white" href="tel:+33661535337">06 61 53 53 37</a>
                            </p>
                        </div>
                        
                        <div className="col-md-5 mb-md-0 mb-4 text-left text-md-right">
                        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2642.5125153043077!2d2.010466315844709!3d48.52340903218782!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e4326987560487%3A0xdbd2a1e410095b48!2s5%20Rue%20Victor%20Hugo%2C%2091410%20Dourdan%2C%20France!5e0!3m2!1sfr!2sro!4v1613489820728!5m2!1sfr!2sro"></iframe>
                        </div>
                    </div>
                </div>
            </div>
            <div className="footer-bottom py-2 ">
                <div className="container">
                    <hr className="border-top border-white" />
                    <p className="text-center text-white">2021 &copy; BARBIERU ART</p>
                </div>
            </div>
        </footer>
        
    )
}


export default Footer