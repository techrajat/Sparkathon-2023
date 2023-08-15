import React, { useEffect, useState } from 'react';
import Card from './Card';
import Spinner from './Spinner';

function SearchRec(props) {
    const [searchRec, setSearchRec] = useState([]);
    const [loaded, setLoaded] = useState(false);

    const getPromo = async () => {
        let promo = await fetch("http://127.0.0.1:8000/promotion", {
            method: "GET",
            headers: { "Authorization": localStorage.getItem('token') }
        });
        if (promo.status === 200) {
            promo = await promo.json();
            setLoaded(true);
            setSearchRec(promo.result);
        }
    }

    useEffect(()=>{
        getPromo();
    }, []);

    return (
        <div className="mt-3">
            {!loaded && <Spinner />}
            <div className="w-full flex justify-center pb-12">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 md:w-max xl:w-[70vw] gap-4 mt-4 mx-auto">
                {(searchRec).map((element) => (
                    <Card article_id={element.article_id} image={`data:image/jpeg;base64,${element.image}`} title={element.prod_name} price={element.price} />
                ))}
            </div>
        </div>
        </div>
    )
}

export default SearchRec;