import React, { useEffect, useState } from 'react';
import InStoreInfo from './InStoreInfo';

function Payment(props) {
    const [store, setStore] = useState([]);
    const [storeLen, setStoreLen] = useState(0);
    const [price, setPrice] = useState(0);

    const getStore = async () => {
        const response = await fetch("http://127.0.0.1:8000/getstore", {
            method: 'GET',
            headers: { 'Authorization': localStorage.getItem('token') }
        });
        if (response.status === 200) {
            const jsonRes = await response.json();
            setStore(jsonRes.result);
            let lenSt = 0, stockPrice = 0;
            jsonRes.result.forEach((element)=>{
                if(element.remaining_stock){
                    stockPrice += element.price;
                    lenSt++;
                }
            });
            setStoreLen(lenSt);
            setPrice(stockPrice);
        }
    };

    useEffect(() => {
        getStore();
    }, []);

    return (
        <div className="product-list">
            <div id="payLink">Pay &#8377;{price} for {storeLen} items</div>
            {store.map((element) => {
                return element.remaining_stock !== 0 && <InStoreInfo image={`data:image/jpeg;base64,${element.image}`} title={element.prod_name} type={element.product_type_name} desc={element.detail_desc} color={element.colour_group_name} price={element.price} available={element.remaining_stock} gender={element.index_group_name} buyInStore={props.buyInStore} section={element.section_name} sectionNum={element.section_no} />
            })}
        </div>
    )
}

export default Payment;