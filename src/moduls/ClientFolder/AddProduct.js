import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import Header from './Header';
import SideBar from './SideBar';
import Select from 'react-select';
import shirt from './Images/shirt.svg';
import { Redirect, Link } from 'react-router-dom';
import { Button, Card } from 'react-bootstrap';
import WSppiner from '../../common/WSppiner';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SideBarMobile from './sidebar/Sidebar';
import Compressor from 'compressorjs';
// import{compressImage} from '../sharedModuls/Utils/Utils';
let category = [

    { name: "category", value: "Men", label: "Men" },
    { name: "category", value: "Women", label: "Women" },
    { name: "category", value: "Kids(Boy)", label: "Kids(Boy)" },
    { name: "category", value: "Kids(Girls)", label: "Kids(Girls)" }

]


let allSize = [

    { name: "size", value: "XS,34,85", label: "XS,34,85" },
    { name: "size", value: "S,36,90", label: "S,36,90" },
    { name: "size", value: "M,38,95", label: "M,38,95" },
    { name: "size", value: "L,40,100", label: "L,40,100" },
    { name: "size", value: "XL,42,105", label: "XL,42,105" },
    { name: "size", value: "XXL,44,110", label: "XXL,44,110" },
    { name: "size", value: "3XL,46,115", label: "3XL,46,115" },
    { name: "size", value: "4XL,48,120", label: "4XL,48,120" },

]





class AddProduct extends Component {
    constructor(props) {
        super(props);

        this.state = {
            checkLoginStatus: true,
            companySelect: [],
            productName: [],
            demo: "",
            colorName: [],
            size: [],

            companyName: "",
            productNameSet: "",
            categorySet: "",
            colorSet: "",
            sizeName: "",
            quantity: "",
            mrp: "",
            offer:"",
            gst:"",
            price: "",
            file: [null],
            fileObj: [],
            fileArray: [],
            description: "",
            imageData: [],
            imageCheck: 0,
            isLoading : false

        }

        let token = sessionStorage.getItem("emailID");

        if (token == null || token == undefined || token == "") {

            this.state.checkLoginStatus = false;
        }
    }



    uploadMultipleFiles = async (e) => {
        console.log(e.target.files);


        if (e.target.files.length < 5) {

            for (let i = 0; i < e.target.files.length; i++) {
                new Compressor(e.target.files[i], {
        
                    quality: 0.1, // 0.6 can also be used, but its not recommended to go below.
                    success: (compressedResult) => {
                     
                    this.state.imageData.push(compressedResult);
                    }
                    
                } );
                //  console.log("image",img);
                // this.state.imageData.push(img);
                
             }
             console.log("check",this.state.imageData);

            this.state.fileObj.push(e.target.files);

            for (let i = 0; i < this.state.fileObj[0].length; i++) {

                this.state.fileArray.push(URL.createObjectURL(this.state.fileObj[0][i]))
            }


            this.setState({ file: this.state.fileArray })

        }
        else {

            this.setState({ imageCheck: 1 });
            toast.error('🦄 Please select maximum 4 images !!!', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }




    }







    imageHandler = e => {

        const reader = new FileReader();


        reader.onload = () => {
            if (reader.readyState === 2) {


                this.setState({ profileImg: reader.result });
            }
        };

        reader.readAsDataURL(e.target.files[0]);

        console.log(e.target.files)
        this.state.imageData = e.target.files[0];

        // if(this.state.imageData.size >  10485760)
        // {

        //     this.state.fileSizeCheck = false;

        //     toast.error('🦄 Selected file size must be less then 10 MB !!!', {
        //         position: "top-right",
        //         autoClose: 3000,
        //         hideProgressBar: false,
        //         closeOnClick: true,
        //         pauseOnHover: true,
        //         draggable: true,
        //         progress: undefined,
        //         });

        // }
        // else
        // {
        //     this.state.fileSizeCheck = true;
        // }


    };





    handleChangeAll = (event) => {
        
        this.setState({ [event.target.name]: event.target.value });
        

    }


    companyFunctio = (selectedOptions) => {

        document.getElementById('para').innerHTML = "";
        this.setState({ companyName: selectedOptions.value });

        let fData = new FormData();

        //fData.append("companyCode",selectedOptions.empID);

        this.setState({isLoading:true});
        axios.post(`${process.env.REACT_APP_API_URL_BACKEND_CALL}/allRegProduct`,{}
        ,{headers : {'x-access-token' : localStorage.getItem("accessToken")}})
            .then((response) => {

                this.setState({isLoading:false});
                this.state.productName = [];
                for (let i = 0; i < response.data.length; i++) {
                    this.state.productName.push({ name: "product", value: response.data[i].productName, label: response.data[i].productName });
                }


                this.setState({ demo: "kol" });


            }).catch(function (error) {
                this.setState({isLoading:false});
                
            })

    }


    productFunction = (selectedOptions) => {


        document.getElementById('para').innerHTML = "";

        this.setState({ productNameSet: selectedOptions.value ,isLoading:true});

        axios.post(`${process.env.REACT_APP_API_URL_BACKEND_CALL}/allRegColors`,{}
        ,{headers : {'x-access-token' : localStorage.getItem("accessToken")}})
            .then((response) => {

                this.setState({isLoading:false});
                for (let i = 0; i < response.data.length; i++) {
                    this.state.colorName.push({ name: "colors", value: response.data[i].colorName, label: response.data[i].colorName });
                }


                this.setState({ demo: "kol" });





            }).catch(function (error) {
                this.setState({isLoading:false});
                alert(error);
            })


    }


    findSize = () => {
        this.setState({isLoading:true});
        axios.post('http://localhost/JaswalJee/ShowAllSize.php'
        ,{headers : {'x-access-token' : localStorage.getItem("accessToken")}})
            .then((response) => {

                this.setState({isLoading:false});
                for (let i = 0; i < response.data.length; i++) {
                    this.state.size.push({ name: "size", value: response.data[i].sizeName, label: response.data[i].sizeName });
                }




            }).catch(function (error) {
                this.setState({isLoading:false});
                alert(error);
            })
    }



    // Submit function start here 

    handleSubmit = (event) => {
        event.preventDefault();

        let checkData = true;

        let msg = "";

        if (this.state.companyName == null || this.state.companyName == undefined || this.state.companyName == "") {
            if (msg == "") {
                msg = "Please select company ";
            }
            checkData = false;
        }


        if (this.state.productNameSet == null || this.state.productNameSet == undefined || this.state.productNameSet == "") {
            if (msg == "") {
                msg = "Please select product";
            }
            checkData = false;
        }

        if (this.state.colorSet == null || this.state.colorSet == undefined || this.state.colorSet == "") {
            if (msg == "") {
                msg = "Please select color";
            }
            checkData = false;
        }



        if (this.state.categorySet == null || this.state.categorySet == undefined || this.state.categorySet == "") {
            if (msg == "") {
                msg = "Please select category";
            }
            checkData = false;
        }


        if (this.state.sizeName == null || this.state.sizeName == undefined || this.state.sizeName == "") {
            if (msg == "") {
                msg = "Please select size";
            }
            checkData = false;
        }




        if (checkData == true) {
            let formData = new FormData();

            formData.append("companyName", this.state.companyName);
            formData.append("productName", this.state.productNameSet);
            formData.append("categorySet", this.state.categorySet);
            formData.append("colorSet", this.state.colorSet);
            formData.append("sizeName", this.state.sizeName);
            formData.append("quantity", this.state.quantity);
            formData.append("mrp", this.state.mrp);
            formData.append("price", this.state.price);
            formData.append("offer", this.state.offer);
            formData.append("gst", this.state.gst);
            formData.append("description", this.state.description);
            formData.append("noOfImage", this.state.imageData.length)
            formData.append("emailID", sessionStorage.getItem("emailID"));
            formData.append("mobileNo", sessionStorage.getItem("mobileNo"));
            formData.append("shopID", sessionStorage.getItem("shopID"));


            for (let i = 0; i < this.state.imageData.length; i++) {
                formData.append(`imageData${i}`, this.state.imageData[i]);
            }

            this.setState({isLoading:true});
            axios.post(`${process.env.REACT_APP_API_URL_BACKEND_CALL}/addProductStock`, formData
            ,{headers : {'x-access-token' : localStorage.getItem("accessToken")}})
                .then((response) => {
                    this.setState({isLoading:false});
                    console.log(response.data);

                    if (response.data === "Inserted Successfully") {
                        toast.success("Product Added Successfully !!!", {
                            position: "top-right",
                            autoClose: 3000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                        });

                        //this.componentDidMount();
                    }
                    else {

                        toast.error("Product not added !!!", {
                            position: "top-right",
                            autoClose: 3000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                        });
                    }

                }).catch(function (error) {
                    this.setState({isLoading:false});
                    alert(error);
                })

        }
        else {
            toast.error(msg, {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }




    }



    componentDidMount() {


        // this.state.profileImg[0].image=shirt;
        this.setState({isLoading:true});

        axios.post(`${process.env.REACT_APP_API_URL_BACKEND_CALL}/ShowAllCompany`
        ,{},{headers : {'x-access-token' : localStorage.getItem("accessToken")}})
            .then((response) => {
                this.setState({isLoading:false});

                for (let i = 0; i < response.data.length; i++) {
                    this.state.companySelect.push({ name: "company", empID: response.data[i].companyCode, value: response.data[i].companyName, label: response.data[i].companyName });
                }

            }).catch(function (error) {
                this.setState({isLoading:false});
                alert(error);
            })

    }

    render() {

        if (this.state.checkLoginStatus === false) {
            return <Redirect to="/userLogin" />
        }


        const { selectedOption } = this.state;


        return (

            <div>
{this.state.isLoading&& <WSppiner isLoading={this.state.isLoading}/>}
                <div className="headerBarTop">

                    <Header />
                </div>

                <div className="mobileViewSidebar">
                    <SideBarMobile />
                </div>

                <div className="container-fluid">
                    <div className="row">
                        <div className="col-xl-2 col-md-12 col-sm-12 sideBARColor">

                            <SideBar />

                        </div>

                        <div className="col-xl-10 col-lg-10 col-md-12 col-sm-12  mainBar">

                            <h5 style={{ marginTop: "10px" }}>Add product to the stock</h5>

                            <div className="row">
                                <div className="col-xl-10 col-md-12 col-sm-12 ">

                                    <form onSubmit={this.handleSubmit} >
                                        <Card className="text-center " >
                                            <Card.Header>Add Product Table</Card.Header>
                                            <Card.Body>

                                                <Card.Text>
                                                    <div class="row">
                                                        <div className="col-xl-3 col-lg-3 col-md-12 col-sm-12 inMobileViewButton" >

                                                            <Select placeholder="Company" class="form-control" isSearchable value={selectedOption} onChange={this.companyFunctio} options={this.state.companySelect} />



                                                        </div>

                                                        <div className="col-xl-3 col-lg-3 col-md-12 col-sm-12 inMobileViewButton" >

                                                            <Select placeholder="Product" class="form-control" isSearchable value={selectedOption} onChange={this.productFunction} options={this.state.productName} />

                                                        </div>

                                                        <div className="col-xl-3 col-lg-3 col-md-12 col-sm-12 inMobileViewButton" >

                                                            <Select placeholder="Color" class="form-control" isSearchable value={selectedOption} options={this.state.colorName} onChange={e => { this.setState({ colorSet: e.value }) }} />

                                                        </div>

                                                        <div className="col-xl-3 col-lg-3 col-md-12 col-sm-12 inMobileViewButton" >

                                                            <Select placeholder="Categry" class="form-control" isSearchable options={category} onChange={e => { this.setState({ categorySet: e.value }) }} />

                                                        </div>


                                                    </div>

                                                    <div className="row">
                                                        <div className="col-md-12">
                                                            <div className="form-group">


                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="row ">
                                                        <div className="col-xl-3 col-lg-3 col-md-12 col-sm-12 inMobileViewButton" >

                                                            <Select placeholder="Size" class="form-control" isSearchable options={allSize} onChange={e => { this.setState({ sizeName: e.value }) }} />

                                                        </div>
                                                        <div className="col-xl-3 col-lg-3 col-md-12 col-sm-12 inMobileViewButton">

                                                            <input type="text" placeholder="Quantity" class="form-control" name="quantity" value={this.state.quantity} onChange={this.handleChangeAll} />
                                                        </div>
                                                        <div className="col-xl-3 col-lg-3 col-md-12 col-sm-12 inMobileViewButton">

                                                            <input type="text" placeholder="MRP" class="form-control" name="mrp" value={this.state.mrp} onChange={this.handleChangeAll} />


                                                        </div>
                                                        <div className="col-xl-3 col-lg-3 col-md-12 col-sm-12 inMobileViewButton" >
                                                            <input type="text" placeholder="Price" class="form-control" name="price" value={this.state.price} onChange={this.handleChangeAll} />

                                                        </div>
                                                        <div className="col-xl-3 col-lg-3 col-md-12 col-sm-12 mt-3 inMobileViewButton" >
                                                            <input type="text" placeholder="Offer" class="form-control" name="offer" value={this.state.offer} onChange={this.handleChangeAll} />

                                                        </div>
                                                        <div className="col-xl-3 col-lg-3 col-md-12 col-sm-12 mt-3 inMobileViewButton" >
                                                            <input type="text" placeholder="Gst" class="form-control" name="gst" value={this.state.gst} onChange={this.handleChangeAll} />

                                                        </div>
                                                        { this.state.gst=='' ? '':
                                                            
                                                        <h5 className=" mt-4"style={{ marginLeft:'30%',color: 'red' }}>{parseInt(this.state.gst)+parseInt(this.state.price-(this.state.price*this.state.offer)/100) } After Discount</h5>
                                                        
                                                           } 
                                                    </div>


                                                    <div className="row">
                                                        <div className="col-xl-3 col-lg-3 col-md-12 col-sm-12">
                                                            <div className="form-group">


                                                            </div>
                                                        </div>
                                                    </div>


                                                    <div className="row">
                                                        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                                                            <div className="form-group">

                                                                <textarea className="form-control" placeholder="Description about product....(MAX 75 Alphabate)" name="description" value={this.state.description} onChange={this.handleChangeAll} ></textarea>
                                                            </div>
                                                        </div>
                                                    </div>






                                                    <div className="row">
                                                        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                                                            <div className="form-group">

                                                                <p>Upload Image &nbsp;&nbsp;&nbsp;&nbsp;<input type="file" id="file" multiple onChange={this.uploadMultipleFiles} className="OrderButtionsAddPro" /></p>
                                                            </div>
                                                        </div>
                                                    </div>




                                                    <div className="row">
                                                        <div className="col-md-12">
                                                            <div className="form-group">


                                                            </div>
                                                        </div>
                                                    </div>


                                                    <div className="previewImage">

                                                        <div className="form-group multi-preview">
                                                            {(this.state.fileArray || []).map(url => (
                                                                <img src={url} className="ProductImage" alt="..." />
                                                            ))}
                                                        </div>

                                                    </div>

                                                </Card.Text>

                                                <input type="submit" className="OrderButtionsAddPro" value="submit" />

                                            </Card.Body>
                                            <Card.Footer className="text-muted"></Card.Footer>
                                            <h6 id="para"></h6>
                                        </Card>

                                    </form>



                                </div>


                            </div>


                        </div>


                    </div>
                </div>

                <ToastContainer />

            </div>
        )
    }
}



export default AddProduct;