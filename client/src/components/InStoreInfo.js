import React from 'react';

function InStoreInfo(props) {
    return (
        <div className="card product-item custom-card">
            <div className="row g-0">
                <div className="col-md-3 cartItemImg">
                    {props.available === 0 && props.buyInStore === true && <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger availabilityBadge">Not Available</span>}
                    <img src={props.image} alt="" className="img-fluid product-image" />
                </div>
                <div className="col-md-6 d-flex justify-content-center align-items-center">
                    <div className="card-body">
                        <h5 className="card-title"><b className={`${!props.available && props.buyInStore ? 'notPresent' : 'present'}`} style={{ fontSize: 'large' }}>{props.title}</b> ({props.color})</h5>
                        <p className="card-text cartItemDesc" style={{ color: 'grey' }}>{props.desc}</p>
                        <div className="mt-4">
                            <h3 className="mb-2 font-bold">In-store location</h3>
                            <div className="mb-2">Section name: {props.section}</div>
                            <div>Section number: {props.sectionNum}</div>
                        </div>
                    </div>
                </div>
                <div className="col-md-3 d-flex justify-content-center align-items-center">
                    <p className={`card-text price ${!props.available && props.buyInStore ? 'notPresent' : 'present'}`}>&#8377;{props.price}</p>
                </div>
            </div>
        </div>
    )
}

export default InStoreInfo;