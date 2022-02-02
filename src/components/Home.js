import React, { useState, useEffect } from 'react';
import { Container, Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from 'axios';

function Home() {
    const [prodUrl, setProdUrl] = useState('');
    const [prod, setProd] = useState([]);
    const [load, setLoad] = useState(false);
    useEffect(() => {
        setLoad(true);
        axios.get('menu/', {
            headers: {
                "Content-Type" : "text/html; charset=UTF-8"
            }
        })
        .then((res) => {
            setLoad(false);
            setProdUrl(res.data.data.imagePath.category);
            setProd(oldArray => [...oldArray, ...res.data.data.categories]);
        })
        .catch(() => {
            setLoad(false);
            setProd([]);
        });
    },[]);
    return (
        <>
            <div className='main_cat_wrap'>
                <Container>
                    <img src='/ad_banner.jpg' alt='ad banner' className='img-fluid ad_banner' />
                    <h1 className='main_heading'><span>Main Category</span></h1>
                    {load?<div className='text-center'>Loading</div>:<div>{prod?<Row>
                        {prod.map((list) => <Col xs={6} lg={4} key={list.cat_id}>
                            <Link to={'/categories/'+list.cat_id} className='pr_image_wrap'>
                                <img src={prodUrl+list.category_image} className='img-fluid' alt={list.category_name} />
                                <span className='cat_name'>{list.category_name}</span>
                            </Link>
                        </Col>)}
                    </Row>:<div>Something went wrong...</div>}</div>}
                </Container>
            </div>
        </>
    );
}

export default Home;
