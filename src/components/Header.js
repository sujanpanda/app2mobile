import React from 'react';
import { Link } from "react-router-dom";

export default function Header() {
    return (
        <>
            <header className='main_header'>
                <div><Link to="/"><img src='/logo.png' alt='logo' /></Link></div>
                <div className='header_mid'><img src='/home_icon.png' alt='home icon' className='head_icon' /> Phase 1, Sushant Lok</div>
                <div><img src='/menu_icon.png' className='menu' alt='menu icon' /></div>
            </header>
        </>
    )
}