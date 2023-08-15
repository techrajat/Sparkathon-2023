import React, { useEffect, useState } from 'react';
import '../App.css';
import CartItem from './CartItem';
import { useNavigate } from 'react-router-dom';

function Checkout(props) {
    const navigate = useNavigate();

    const [numcart, setNumcart] = useState(0);
    const [cartItems, setCartItems] = useState([]);
    const [totalAmount, setTotalAmount] = useState(0);
    const [newAmount, setNewAmount] = useState(0);

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
                document.querySelector('.cartItems').style.display = 'none';
            }
            else {
                setCartItems(items);
                let amt = 0, decreaseAmt = 0;
                items.forEach((element) => {
                    amt += element.price;
                });
                localStorage.setItem('totalAmt', amt);
                setTotalAmount(amt);
                items.forEach((element) => {
                    if (!element.remaining_stock)
                        decreaseAmt += element.price;
                });
                localStorage.setItem('newAmt', (amt - decreaseAmt));
                setNewAmount(amt - decreaseAmt);
            }
        }
    };

    useEffect(() => {
        getCartItems();
        //eslint-disable-next-line
    }, [props.isLogin, props.numItemsCart]);

    const storeItems = async () => {
        let itemsToStore = [];
        cartItems.forEach((element) => {
            if (element.remaining_stock)
                itemsToStore.push(element.article_id);
        });
        await fetch("http://127.0.0.1:8000/store", {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                "Authorization": localStorage.getItem('token')
            },
            body: `items=${encodeURIComponent(itemsToStore.join(","))}`
        });
        await fetch("http://127.0.0.1:8000/emptycart", {
            method: "GET",
            headers: { "Authorization": localStorage.getItem('token') }
        });
        props.setNumItemsCart(0);
        props.setBuyInStore(false);
        navigate('/payment');
    }

    useEffect(() => {
        if (props.buyInStore) {
            if (window.innerWidth > 768) {
                document.querySelector('.buyBtnStore').style.display = 'none';
                document.querySelector('.buyBtnCnf').style.display = 'block';
            }
            else {
                document.querySelector('.buyBtnStore2').style.display = 'none';
                document.querySelector('.buyBtnCnf2').style.display = 'block';
            }
            if (parseInt(localStorage.getItem('totalAmt')) !== parseInt(localStorage.getItem('newAmt'))) {
                if (window.innerWidth > 768) {
                    document.querySelector('.originalAmt').style.color = 'red';
                    document.querySelector('.originalAmt').style.textDecoration = 'line-through red';
                }
                else {
                    document.querySelector('.originalAmt2').style.color = 'red';
                    document.querySelector('.originalAmt2').style.textDecoration = 'line-through red';
                }
            }
        }
        else {
            if (window.innerWidth > 768)
                document.querySelector('.buyBtnCnf').style.display = 'none';
            else
                document.querySelector('.buyBtnCnf2').style.display = 'none';
        }
        // eslint-disable-next-line
    }, [props.numItemsCart, props.buyInStore]);

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
                                <p className="price fw-bold fs-5 text-success originalAmt2">&#8377;{totalAmount}</p>
                                {props.buyInStore === true && totalAmount !== newAmount && <p className="price fw-bold fs-5 text-success newAmount">&#8377;{newAmount}</p>}
                            </div>
                            <div className="text-center">
                                <button className="btn btn-primary btn-block buyBtn mb-3">Buy online</button>
                            </div>
                            <div className="text-center">
                                <button className="btn btn-primary btn-block buyBtn buyBtnStore2" onClick={() => { props.setBuyInStore(true) }}>Buy in-store</button>
                            </div>
                            <div className="text-center buyBtnCnf2">
                                <button className="btn btn-primary btn-block buyBtn" style={{ width: 200 + 'px' }} onClick={storeItems}>Continue to buy in-store</button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-lg-8 cartItems">
                    <div className="product-list">
                        {cartItems.map((element) => {
                            return <CartItem image={`data:image/jpeg;base64,${element.image}`} title={element.prod_name} type={element.product_type_name} desc={element.detail_desc} color={element.colour_group_name} price={element.price} available={element.remaining_stock} gender={element.index_group_name} buyInStore={props.buyInStore} />
                        })}
                    </div>
                </div>

                <div className="col-lg-4 summary deskCart">
                    <div className="card order-summary">
                        <div className="card-body">
                            <h5 className="card-title text-center mb-7 bigger">Order Summary</h5>
                            <div className="d-flex justify-content-between align-items-center mb-8 p-3">
                                <p className="total-amount font-weight-bold fs-5">Total amount</p>
                                <p className="price fw-bold fs-5 text-success originalAmt">&#8377;{totalAmount}</p>
                                {props.buyInStore === true && totalAmount !== newAmount && <p className="price fw-bold fs-5 text-success newAmount">&#8377;{newAmount}</p>}
                            </div>
                            <div className="text-center">
                                <button className="btn btn-primary btn-block buyBtn mb-3">Buy online</button>
                            </div>
                            <div className="text-center">
                                <button className="btn btn-primary btn-block buyBtn buyBtnStore" onClick={() => { props.setBuyInStore(true) }}>Buy in-store</button>
                            </div>
                            <div className="text-center buyBtnCnf">
                                <button className="btn btn-primary btn-block buyBtn" style={{ width: 200 + 'px' }} onClick={storeItems}>Continue to buy in-store</button>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default Checkout;
