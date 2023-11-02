
import React, {  useEffect } from "react";
import Layout from "../../components/global/Layout";
import NavBar from "../../components/global/NavBar";
import { Redirect } from "react-router-dom";
import { useDispatch } from "react-redux";



import { logout } from "../../store/_actions";


function LogOutPage({ history }) {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(logout());
    }, []);

    return (
        <Layout sectionId="logout-section">
            <NavBar />
            <Redirect to="/" />
        </Layout>
    )
}
export default LogOutPage;
