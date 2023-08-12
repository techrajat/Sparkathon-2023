import React from 'react';
import "../App.css";

function SearchResult(props) {
    const itemClick=()=>{
        props.setItemClicked(true);
        const id = props.article_id;
        localStorage.setItem('selectedItem', id);
    };

    return (
        <div>
            <div className="card suggestions" style={{width: 18+'rem'}} onClick={itemClick}>
                <img src={props.image} className="card-img-top" alt="..." style={{height: 350+'px'}} />
                <div className="card-body">
                    <span>&#8377;{props.price}</span>
                    <h5 className="card-title">{props.title}</h5>
                    <p className="card-text">{props.desc}</p>
                </div>
            </div>
        </div>
    )
}

export default SearchResult;