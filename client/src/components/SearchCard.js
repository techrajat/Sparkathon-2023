import React from 'react';
import "../App.css";

function SearchResult(props) {
    return (
        <div>
            <div className="card" style={{width: 18+'rem'}}>
                <a href="/">
                    <img id="searchImage" src={props.image} className="card-img-top" alt="..." style={{height: 350+'px'}} />
                    <div class="card-body">
                        <span>&#8377;{props.price}</span>
                        <h5 className="card-title">{props.title}</h5>
                        <p className="card-text">{props.desc}</p>
                    </div>
                </a>
            </div>
        </div>
    )
}

export default SearchResult;