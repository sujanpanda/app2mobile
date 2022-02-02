import React, { useEffect, useState, useContext } from 'react';
import { Col, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import axios from 'axios';

import { UserContext } from "../App";

function Categories() {
    const { id } = useParams();
    const [load, setLoad] = useState(false);
    const [category, setCategory] = useState({});
    const {dispatch} = useContext(UserContext);
    useEffect(() => {
        setLoad(true);
        setLoad(true);
        axios.get('menu/', {
            headers: {
                "Content-Type" : "text/html; charset=UTF-8"
            }
        })
        .then((res) => {
            setLoad(false);
            setCategory(res.data.data.categories.find(data => data.cat_id === id));
            console.log(res.data.data.categories.find(o => o.cat_id === id));
        })
        .catch(() => {
            setLoad(false);
        });
    },[id]);
    const addLocal = (pr_id) => {
        let addtoData = category.product.find(data => data.store_product_id === pr_id);
        let price = addtoData.product_price;
        if(addtoData.product_price === '0.00') {
            price = addtoData.d_price.split('-')[1].split('$')[1];
        } else {
            price = addtoData.product_price;
        }
        dispatch({type:"ADD_CART", payload:{
            "store_pr_id": addtoData.store_product_id,
            "store_name": addtoData.store_product_name,
            "quantity": 1,
            "price": price
        }});
    }
    return (
        <div className='categories_page'>
            <div className='left_sidebar'>
                Left Sidebar
            </div>
            <div className='categories_list'>
                {load?<div className='text-center'>Loading</div>:<div className='mid_class'><img src='/closed_banner.jpg' alt='closed banner' className='full_img' />
                <h1 className='main_heading'><span>{category.category_name}</span></h1>
                {/* {category.product?category.product.length:''} */}
                {category.product?<Row>
                    {category.product.map((list) => <Col xs={6} key={list.store_product_id}>
                        <div className='pro_cat_wrap'>
                            <p className='pro_cat_name'>{list.store_product_name}</p>
                            {list.product_desc?<p className='pro_cat_det'>{list.product_desc}</p>:<p className='pro_cat_det'>&nbsp;</p>}
                            <div className='customize_txt'>
                                <a href="#" className='custom_txt'>Customize</a>
                                <span className='add_to_cart_btn' onClick={()=>addLocal(list.store_product_id)}>ADD | {list.product_price === '0.00'?<span><span className='strike_price'>{list.d_price.split('-')[0]}</span> {list.d_price.split('-')[1]}</span>:'$'+list.product_price}</span>
                            </div>
                        </div>
                    </Col>)}
                </Row>:<div>Something went wrong...</div>}</div>}
            </div>
        </div>
    );
}

export default Categories;
