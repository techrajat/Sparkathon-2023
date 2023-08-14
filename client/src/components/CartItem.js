import React from 'react';

function CartItem(props) {
    return (
        <div className="card product-item custom-card">
            <div className="row g-0">
                <div className="col-md-3 cartItemImg">
                    <img src={props.image} alt="" className="img-fluid product-image" />
                </div>
                <div className="col-md-6 d-flex justify-content-center align-items-center">
                    <div className="card-body">
                        <h5 className="card-title"><b style={{fontSize: 'large'}}>{props.title}</b> ({props.color})</h5>
                        <p className="card-text cartItemDesc" style={{color: 'grey'}}>{props.desc}</p>
                    </div>
                </div>
                <div className="col-md-3 d-flex justify-content-center align-items-center">
                    <p className="card-text price">&#8377;{props.price}</p>
                </div>
            </div>
        </div>
    )
}

export default CartItem;