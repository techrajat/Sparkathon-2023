import React from 'react';
import { useNavigate } from 'react-router-dom';

function CartItem(props) {
    const navigate = useNavigate();

    const similarCart=()=>{
        localStorage.setItem('searchStr', props.title + " " + props.type + " " + props.gender);
        navigate('/search');
    };

    return (
        <div className="card product-item custom-card" id="itemDiv">
            <div className="row g-0">
                <div className="col-md-3 cartItemImg">
                    {props.available === 0 && props.buyInStore === true && <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger availabilityBadge">Not Available</span>}
                    <img src={props.image} alt="" className="img-fluid product-image" />
                </div>
                <div className="col-md-6 d-flex justify-content-center align-items-center">
                    <div className="card-body">
                        <h5 className="card-title"><b className={`${!props.available && props.buyInStore ? 'notPresent': 'present'}`} style={{ fontSize: 'large' }}>{props.title}</b> ({props.color})</h5>
                        <p className="card-text cartItemDesc" style={{ color: 'grey' }}>{props.desc}</p>
                        {props.available === 0 && props.buyInStore === true && <span className="similarCart" onClick={similarCart}>Buy similar product</span>}
                    </div>
                </div>
                <div className="col-md-3 d-flex justify-content-center align-items-center">
                    <p className={`card-text price ${!props.available && props.buyInStore ? 'notPresent': 'present'}`}>&#8377;{props.price}</p>
                </div>
            </div>
        </div>
    )
}

export default CartItem;