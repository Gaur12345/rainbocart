import React, { Component } from 'react'
import { Accordion, Card, Button, Modal } from 'react-bootstrap';

export class Verification extends Component {
    constructor(props) {
        super(props)
        const { changed } = this.props
        changed('pass', 'errormsg')
    }
    componentDidMount() {
        if (this.props.hidepassword == true) {
            document.getElementById('password').style.display = 'none'
        }
        if (this.props.showShowDetails == true) {
            document.getElementById('shopdetails').style.display = 'block'
        }
        else {
            if(this.props.info.shopdetails != undefined ){
            document.getElementById('shopdetails').style.display = 'none'
            }
        }
    }
    changePageForEdit = (pageId) => {
        const { editVerificationInformation } = this.props
        editVerificationInformation(pageId)
    }
    render() {
        console.log("test",this.props)
        return (
            <div className='accordion' style={{ width: '90%' }}>
                <Accordion defaultActiveKey="0">
                    <Card>
                        <Card.Header >
                            <Accordion.Toggle as={Button}
                                variant="text" eventKey="0">
                                <h3>Account Information</h3>
                            </Accordion.Toggle>
                            <button className='btn  editverification' onClick={() => this.changePageForEdit(0)}>Edit</button>
                        </Card.Header>
                        <Accordion.Collapse eventKey="0">
                            <Card.Body>
                                <div className='InformationBox'>
                                    <p>Name: {this.props.info.accountInfo.name}</p>
                                    <p>Email: {this.props.info.accountInfo.email}</p>
                                    <p id='password'>Password: {this.props.info.accountInfo.password}</p>
                                </div>
                            </Card.Body>
                        </Accordion.Collapse>
                    </Card>
                    <Card>
                        <Card.Header >
                            <Accordion.Toggle as={Button}
                                variant="text" eventKey="1">
                                <h3>Contact Information</h3>
                            </Accordion.Toggle>
                            <button className='btn  editverification' onClick={() => this.changePageForEdit(1)}>Edit</button>
                        </Card.Header>
                        <Accordion.Collapse eventKey="1">
                            <Card.Body>
                                <div className='InformationBox'>
                                    <p>Mobile: {this.props.info.contactInfo.mobileNumber}</p>
                                    <p>Gender: {this.props.info.contactInfo.gender}</p>
                                </div>
                            </Card.Body>
                        </Accordion.Collapse>
                    </Card>
                    <Card>
                        <Card.Header>
                            <Accordion.Toggle as={Button}
                                variant="text" eventKey="2">
                                <h3>Address Information</h3>
                            </Accordion.Toggle>
                            <button className='btn  editverification' onClick={() => this.changePageForEdit(2)}>Edit</button>
                        </Card.Header>
                        <Accordion.Collapse eventKey="2">
                            <Card.Body>
                                <div className='InformationBox'>
                                    <p>Locality :{this.props.info.addressInfo.address}</p>
                                    <p>Landmark :{this.props.info.addressInfo.landmark}</p>
                                    <p>City: {this.props.info.addressInfo.city}</p>
                                    <p>State: {this.props.info.addressInfo.stateIs}</p>
                                    <p>Pincode:{this.props.info.addressInfo.pinCode}</p>
                                    <p>Country: {this.props.info.addressInfo.country}</p>
                                </div>
                            </Card.Body>
                        </Accordion.Collapse>
                    </Card>
                    {this.props.info.shopdetails == undefined ?
                        <div>

                        </div>
                        : <Card id='shopdetails'  >
                            <Card.Header>
                                <Accordion.Toggle as={Button}
                                    variant="text" eventKey="3">
                                    <h3>Shop Information</h3>
                                </Accordion.Toggle>
                                <button className='btn  editverification' onClick={() => this.changePageForEdit(3)}>Edit</button>
                            </Card.Header>
                            <Accordion.Collapse eventKey="3">
                                <Card.Body>
                                    <div className='InformationBox'>
                                        <p>Shop Name :{this.props.info.shopdetails.shopname}</p>
                                        <p>GST No :{this.props.info.shopdetails.gstno}</p>
                                        <p>Shop Category: {this.props.info.shopdetails.shopcategory}</p>
                                        <p>Shop Description: {this.props.info.shopdetails.shopdescription}</p>
                                        <p>Shop Image: {this.props.info.shopdetails.imageData.name}</p>
                                    </div>
                                </Card.Body>
                            </Accordion.Collapse>
                        </Card>}

                </Accordion>
            </div>
        )
    }
}

export default Verification