import React from 'react';
import '../App.css';
import img from '../assets/costume.jpg';

function Checkout() {
    return (
        <div className="container checkout-container">
            <div className="row">
                <h2 className="cartHead">Cart (2 items)</h2>

                <div className="col-lg-4 summary mobileCart">
                    <div className="card order-summary">
                        <div className="card-body">
                        <h5 className="card-title text-center mb-7 bigger">Order Summary</h5>
                            <div className="d-flex justify-content-between align-items-center mb-8 p-3">
                                <p className="total-amount font-weight-bold fs-5">Total amount</p>
                                <p className="price fw-bold fs-5 text-success">&#8377;698</p>
                            </div>
                            <div className="text-center">
                                <button className="btn btn-primary btn-block buyBtn mb-3">Buy online</button>
                            </div>
                            <div className="text-center">
                                <button className="btn btn-primary btn-block buyBtn">Buy in-store</button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-lg-8 cartItems">
                    <div className="product-list">
                        {/* Product Item 1 */}
                        <div className="card product-item custom-card">
                            <div className="row g-0">
                                <div className="col-md-3 cartItemImg">
                                    <img src={img} alt="" className="img-fluid product-image" />
                                </div>
                                <div className="col-md-6 d-flex justify-content-center align-items-center">
                                    <div className="card-body">
                                        <h5 className="card-title">Real School Uniforms Adult Everybody Pull-On Jogger Pant</h5>
                                        <p className="card-text">60002, 12, Khaki</p>
                                    </div>
                                </div>
                                <div className="col-md-3 d-flex justify-content-center align-items-center">
                                    <p className="card-text price">&#8377;299</p>
                                </div>
                            </div>
                        </div>

                        {/* Product Item 2 */}
                        <div className="card product-item custom-card">
                            <div className="row g-0">
                                <div className="col-md-3">
                                    <img src={img} alt="" className="img-fluid product-image" />
                                </div>
                                <div className="col-md-6 d-flex justify-content-center align-items-center">
                                    <div className="card-body">
                                        <h5 className="card-title">Real School Uniforms Adult Everybody Pull-On Jogger Pant</h5>
                                        <p className="card-text">60002, 12, Khaki</p>
                                    </div>
                                </div>
                                <div className="col-md-3 d-flex justify-content-center align-items-center">
                                    <p className="card-text price">&#8377;299</p>
                                </div>
                            </div>
                        </div>

                        {/* Add more product items here */}
                    </div>
                </div>

                <div className="col-lg-4 summary deskCart">
                    <div className="card order-summary">
                        <div className="card-body">
                            <h5 className="card-title text-center mb-7 bigger">Order Summary</h5>
                            <div className="d-flex justify-content-between align-items-center mb-8 p-3">
                                <p className="total-amount font-weight-bold fs-5">Total amount</p>
                                <p className="price fw-bold fs-5 text-success">&#8377;698</p>
                            </div>
                            <div className="text-center">
                                <button className="btn btn-primary btn-block buyBtn mb-3">Buy online</button>
                            </div>
                            <div className="text-center">
                                <button className="btn btn-primary btn-block buyBtn">Buy in-store</button>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default Checkout;
