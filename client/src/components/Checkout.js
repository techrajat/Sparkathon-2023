import React, { useEffect, useState } from 'react';
import '../App.css';
import CartItem from './CartItem';

function Checkout(props) {
    const [cartItems, setCartItems] = useState([]);
    const [numcart, setNumcart] = useState(0);
    const [totalAmount, setTotalAmount] = useState(0);

    const getCartItems = async () => {
        let response = await fetch("http://127.0.0.1:8000/numcart", {
            method: 'GET',
            headers: { 'Authorization': localStorage.getItem('token') }
        });
        if (response.status === 200) {
            const jsonRes = await response.json();
            setNumcart(jsonRes.numsItems);
        }

        response = await fetch("http://127.0.0.1:8000/cartitems", {
            method: "GET",
            headers: { "Authorization": localStorage.getItem('token') }
        });
        if (response.status === 200) {
            let items = await response.json();
            items = items.result;
            if (!items.length) {
                document.querySelector('.mobileCart').style.display = 'none';
                document.querySelector('.deskCart').style.display = 'none';
                document.querySelector('.cartItems').style.display = 'none';
            }
            else {
                setCartItems(items);
                let amt = 0;
                items.forEach((element)=>{
                    amt += element.price;
                });
                setTotalAmount(amt);
            }
        }
    };

    useEffect(() => {
        getCartItems();
        //eslint-disable-next-line
    }, [props.isLogin, props.numItemsCart]);

    return (
        <div className="container checkout-container">
            <div className="row">
                <h2 className="cartHead">Cart ({numcart} items)</h2>
                <div className="col-lg-4 summary mobileCart">
                    <div className="card order-summary">
                        <div className="card-body">
                            <h5 className="card-title text-center mb-7 bigger">Order Summary</h5>
                            <div className="d-flex justify-content-between align-items-center mb-8 p-3">
                                <p className="total-amount font-weight-bold fs-5">Total amount</p>
                                <p className="price fw-bold fs-5 text-success">&#8377;{totalAmount}</p>
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
                        {cartItems.map((element) => {
                            return <CartItem image={`data:image/jpeg;base64,${element.image}`} title={element.prod_name} desc={element.detail_desc} color={element.colour_group_name} price={element.price} />
                        })}
                    </div>
                </div>

                <div className="col-lg-4 summary deskCart">
                    <div className="card order-summary">
                        <div className="card-body">
                            <h5 className="card-title text-center mb-7 bigger">Order Summary</h5>
                            <div className="d-flex justify-content-between align-items-center mb-8 p-3">
                                <p className="total-amount font-weight-bold fs-5">Total amount</p>
                                <p className="price fw-bold fs-5 text-success">&#8377;{totalAmount}</p>
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
