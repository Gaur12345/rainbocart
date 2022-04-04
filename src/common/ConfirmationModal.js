import React from 'react'
import { Button,  Modal } from 'react-bootstrap';
function ConfirmationModal(props) {

    const handleModal = () => {
        const {handleProceedButton} = props
        handleProceedButton()
    }
    return (
        <div><Modal size="lg" show={true} >
            <Modal.Header >
                <Modal.Title> {props.header} </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="container">
                    <div className="row">
                        <div className="col-xl-12 col-md-12 col-sm-12">
                            <h4>{props.message}</h4>
                        </div>
                    </div>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button style={{backgroundColor:'#F39C12',borderColor:'#F39C12'}} onClick={handleModal}>
                    Proceed
                </Button>
            </Modal.Footer>
        </Modal></div>
    )
}

export default ConfirmationModal