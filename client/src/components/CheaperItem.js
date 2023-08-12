import React from 'react';

function CheaperItem(props) {
    const itemClick = () => {
        props.setItemClicked(true);
        const id = props.article_id;
        localStorage.setItem('selectedItem', id);
    };

    return (
        <div>
            <div className="card cheap" onClick={itemClick}>
                <img src={props.image} className="card-img-top" alt="..." style={{height: 350+'px'}} />
                <span className="price">&#8377;{props.price}</span>
                <h5 className="card-title">{props.title}</h5>
                <span className="group">{props.color_name} {props.colour_master_name} {props.dept_name}</span>
            </div>
        </div>
    )
}

export default CheaperItem;