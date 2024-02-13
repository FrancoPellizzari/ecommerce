import React from "react";
import Navbar from "../components/navbar";
import PropTypes from 'prop-types';
import Footer from "../components/Footer";

const Layout = ({ children }) => {
    return (
        <div className = "layout">
            <navbar/>
            <div className = "content"> {children}</div>
            <Footer/>
        </div>
    );
};

Layout.propTypes = {
    children: PropTypes.node.isRequired,
};


export default Layout;