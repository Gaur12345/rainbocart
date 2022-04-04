import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './css/HomeCustomer.css';
import HeaderNavBar from './Header';
import SideBar from './sidebar/Sidebar';
import FooterBar from './FooterBar';
import WSppiner from '../../common/WSppiner';
import { Redirect } from 'react-router-dom';
import Shopcard from '../sharedModuls/searchbar/Shopcard';
import { encryptData, decryptData } from '../sharedModuls/Utils/Utils';
const crypto = require('crypto-js');




class HomeCustomer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            searchSHopName: this.props.match.params.searchIteamData,
            data: [],
            lat: 0,
            nextPage: false,
            email: "",
            mobile: "",
            shopName: "",
            area: "",
            city: "",
            stateS: "",
            name: "",
            uid: "",
            resultShow: true,
            isLoading: false,
            userData: [],
            pTable: ""
        }
        console.log("Hello World ")
    }



    componentDidMount = () => {

        // let bytes  = CryptoJS.AES.decrypt( this.props.match.params.searchIteamData, 'customerCard@@##12345!!@@23');
        // let originalText = bytes.toString(CryptoJS.enc.Utf8);
        // this.setState({searchSHopName : originalText})
        // console.log("plan text ",originalText)
        let key = "password";
        let SHopName = encryptData(this.state.searchSHopName, key);
        this.setState({ isLoading: true });
        axios.post(`${process.env.REACT_APP_API_URL_BACKEND_CALL}/searchShop`, { shopName: SHopName })
            .then(response => {

                console.log("Search Data is ", response.data)
                let data = [];

                data = decryptData(response.data, key);
                data = JSON.parse(data.toString(crypto.enc.Utf8));
                //console.log("test",data);
                if (response.data.length > 0) {
                    // console.log("ssd asd ",data)
                    this.setState({ data: data, resultShow: true, isLoading: false });
                }
                else {
                    console.log("Else run ")
                    this.setState({ resultShow: false, isLoading: false })
                }

            })
            .catch(error => {
                this.setState({ isLoading: false });

            })


    }

    goNextPage = (user) => {

        this.setState({
            nextPage: true,
            email: user.uEmail,
            mobile: user.uMobile,
            name: user.uname,
            shopName: user.uShopName,
            area: user.uArea,
            city: user.uCity,
            stateS: user.uState,
            uid: user.uid,
            pTable: user.uid + "producttable",
            userData: user
        });
    }
    render() {
        if (this.state.nextPage == true) {
            return <Redirect to={{
                pathname: "/showShopProduct",
                propetries: { productInfomation: this.state.userData, productTableName: this.state.pTable },
            }} />
        }
        return (
            <div>
                {this.state.isLoading && <WSppiner isLoading={this.state.isLoading} />}

                <HeaderNavBar />

                <SideBar />

                <div className="shopLocation">
                    <h5 className="pl-3 pt-2 searchtionText">Search Location : {this.state.searchSHopName}</h5>

                    <Shopcard key={this.state.data} data={this.state.data} resultShow={this.state.resultShow} goNextPage={this.goNextPage} />
                </div>


                <FooterBar />
            </div>
        )
    }
}


export default HomeCustomer;