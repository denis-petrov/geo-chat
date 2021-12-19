import React, {useState} from 'react'
import '../../../assets/css/navigation/Navigation.css'
import {connect} from 'react-redux'
import {updateCenterPosition} from '../../../store/actions/position/updateCenterPosition'
import {addMarker} from '../../../store/actions/markers/addMarker'
import {Button, FloatingLabel, Form, Modal} from "react-bootstrap"
import '../../../assets/css/map/Map.css'

const AddMarker = (props) => {
    const [modalShow, setModalShow] = useState(false)
    const handleClose = () => {
        setModalShow(false)
        setName(null)
        setDescription(null)
        setStateLinkedChat(0)
    }
    const handleShow = () => setModalShow(true)

    const [name, setName] = useState(null)
    const handleNameInput = (e) => setName(e.target.value)

    const [description, setDescription] = useState(null)
    const handleDescriptionInput = (e) => setDescription(e.target.value)

    const [stateLinkedChat, setStateLinkedChat] = useState(0)
    const handleSelectLinkedChat = (e) => setStateLinkedChat(e.target.value)

    const handleSubmit = () => {
        const {lat, lng} = JSON.parse(localStorage.getItem("center"))
        props.updateCenterPosition({lat, lng})
        console.log({lat, lng, name, description, stateLinkedChat})
        props.addMarker({lat, lng, name, description, stateLinkedChat})
        handleClose()
    }

    return (
        <div>
            <button id={"add-btn"} className={"navigation__control_button"} key={"AddMarker"}
                    onClick={() => handleShow()}>
                <img src={"/icons/navigation/add.png"} alt="Add"
                     className={"navigation__control_button__img center"}/>
            </button>

            <Modal show={modalShow} onHide={handleClose} centered>
                <Modal.Header closeButton className={"map__modal"}>
                    <Modal.Title>Create Marker</Modal.Title>
                </Modal.Header>
                <Modal.Body className={"map__modal"}>
                    <Form.Group>

                        <FloatingLabel
                            label="Name"
                            className={"mb-3 map__modal_input_label"}
                        >
                            <Form.Control type="text" onChange={handleNameInput}
                                          className={"map__modal_input"}
                                          placeholder="Name"
                            />
                        </FloatingLabel>


                        <Form.Control as="textarea" rows={3} onChange={handleDescriptionInput}
                                      className={"map__modal_input"}
                                      placeholder="Description"
                        />

                        <Form.Select className={"me-sm-2 map__modal_select"}
                                     id="isCreateChat"
                                     onChange={handleSelectLinkedChat}
                        >
                            <option value="0">Create linked chat</option>
                            <option value="1">Do not create chat</option>
                        </Form.Select>
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer className={"map__modal map__modal_footer"}>
                    <Button className={"map__model_create"} onClick={handleSubmit}>
                        Add marker
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}


const mapStateToProps = (state) => ({
    centerPosition: state.centerPosition
})


const mapDispatchToProps = {
    updateCenterPosition, addMarker
}

export default connect(mapStateToProps, mapDispatchToProps)(AddMarker)
