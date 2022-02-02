import React, { useState, useContext, useEffect } from 'react';

import { UserContext } from "../App";

function Cart() {
    const {state, dispatch} = useContext(UserContext);
    const [cartBx, setCartBx] = useState(false);
    const [subtotal, seTsubtotal] = useState(0);
    const [taxes, setTaxes] = useState(0);
    const [fullPrice, setFullPrice] = useState(0);
    const delevery = 2;
    const cartBox = () => {
        setCartBx(!cartBx);
    }
    useEffect(() => {
        console.log(state);
        if(state) {
            let sum = 0;
            state.map((list)=>{
                sum += parseFloat(list.price);
            });
            seTsubtotal(sum.toFixed(2));
            setTaxes((10/100)*sum);
            setFullPrice(sum+((10/100)*sum)+delevery);
        }
    },[state]);
    const removeCart = (st_id)=> {
        dispatch({type:"REMOVE_CART", payload:{
            "store_pr_id": st_id
        }});
    }
  return (
        <>
            <div className={cartBx?'cart_body open':'cart_body'}>
                <div className='cart_head'>
                    <div className='call_back_btn'>
                        <span onClick={cartBox}><img src='/back_btn.png' className='location_icon' alt='location icon' /></span>
                    </div>
                    <div>
                        Pickup at : Today 10:30 am
                        <span className='locat_wrap'>
                        <img src='/location_icon.png' className='location_icon' alt='location icon' />
                        Phase 1, Sushant Lok Phase Gurugram
                        </span>
                    </div>
                    <div>
                        <span className='edit_anch'><img src='/edit_icon.png' className='edit_icon' alt='edit icon' /></span>
                    </div>
                </div>
                <div className='all_carts'>
                    {state?<div className='cart_wrap'>
                        <div className='cart_list_wrap'>
                            {state.map((list)=>
                                <div className='cart_list' key={list.store_pr_id}>
                                    <select className='cart_quantity' defaultValue={list.quantity}>
                                        <option value={1}>1</option>
                                        <option value={2}>2</option>
                                        <option value={3}>3</option>
                                    </select>
                                    <div className='cart_detail'>
                                        <div className='cart_flex'>
                                            <div className='cart_ellipse'>
                                                <span className='cart_ellipse'>{list.store_name}</span>
                                                <span className='rem_item' onClick={()=>removeCart(list.store_pr_id)}>Remove</span>
                                            </div>
                                            <div className='price_box'>
                                                <div className='price_wrap'>${list.price}</div>
                                                <span className='edit_item'>Edit</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                        <input type="text" className='special_inst' placeholder='Add Special Instruction' />
                        <div className='calculation_list'>
                            <span className='calc_title'>Subtotal</span>
                            <span className='calc_title'>${subtotal}</span>
                        </div>
                        <div className='calculation_list'>
                            <span className='calc_title'>Taxes(10%)</span>
                            <span className='calc_title'>${taxes.toFixed(2)}</span>
                        </div>
                        <div className='calculation_list'>
                            <span className='calc_title'>Delivery Charge</span>
                            <span className='calc_title'>${delevery.toFixed(2)}</span>
                        </div>
                        <div className='calculation_list'>
                            <span className='calc_title'>Order Total</span>
                            <span className='calc_title'>${fullPrice.toFixed(2)}</span>
                        </div>
                        <img src='/cart_ad.jpg' alt="cart_banner" className='img-fluid' />
                        <button className='checkout_btn'>
                            <span>CHECKOUT</span>
                            <span className="check_btn">
                                <span className='order_btn'>ORDER TOTAL</span>
                                ${fullPrice.toFixed(2)}
                            </span>
                        </button>
                    </div>:<div className='empty_box'>
                        <img src='/cart_empty.png' alt='Cart is Empty' />
                    </div>}
                </div>
            </div>
            {!cartBx?<span className='cart_btn' onClick={cartBox}>CART</span>:''}
        </>
    );
}

export default Cart;
