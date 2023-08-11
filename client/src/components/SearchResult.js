import React from 'react';
import "../App.css"
import jacket2 from "../assets/2.jpg";

function SearchResult() {
    return (
        <div id="searchResult">
            <div className="card" style={{width: 18+'rem'}}>
                <a href="/">
                    <img id="searchImage" src={jacket2} className="card-img-top" alt="..." style={{height: 350+'px'}} />
                    <div class="card-body">
                        <span>&#8377;100</span>
                        <h5 className="card-title">Card title</h5>
                        <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                    </div>
                </a>
            </div>
            
            <div className="card" style={{width: 18+'rem'}}>
                <a href="/">
                    <img id="searchImage" src={jacket2} className="card-img-top" alt="..." style={{height: 350+'px'}} />
                    <div class="card-body">
                        <span>&#8377;100</span>
                        <h5 className="card-title">Card title</h5>
                        <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                    </div>
                </a>
            </div>

            <div className="card" style={{width: 18+'rem'}}>
                <a href="/">
                    <img id="searchImage" src={jacket2} className="card-img-top" alt="..." style={{height: 350+'px'}} />
                    <div class="card-body">
                        <span>&#8377;100</span>
                        <h5 className="card-title">Card title</h5>
                        <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                    </div>
                </a>
            </div>

            <div className="card" style={{width: 18+'rem'}}>
                <a href="/">
                    <img id="searchImage" src={jacket2} className="card-img-top" alt="..." style={{height: 350+'px'}} />
                    <div class="card-body">
                        <span>&#8377;100</span>
                        <h5 className="card-title">Card title</h5>
                        <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                    </div>
                </a>
            </div>
        </div>
    )
}

export default SearchResult;