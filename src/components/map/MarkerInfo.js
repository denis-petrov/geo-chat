import '../../assets/css/map/Map.css'
import React, {useState} from 'react'
import {Button, FloatingLabel, Form, Modal} from 'react-bootstrap'

const MarkerInfo = (props) => {
    const [modalShow, setModalShow] = useState(false)
    const handleClose = () => {
        setModalShow(false)
        setTitle(null)
        setDescription(null)
        setStateLinkedChat(0)
    }
    const handleShow = () => setModalShow(true)

    const [title, setTitle] = useState(null)
    const handleTitleInput = (e) => setTitle(e.target.value)

    const [description, setDescription] = useState(null)
    const handleDescriptionInput = (e) => setDescription(e.target.value)

    const [stateLinkedChat, setStateLinkedChat] = useState(0)
    const handleSelectLinkedChat = (e) => setStateLinkedChat(e.target.value)

    const handleSubmit = () => {
        const {lat, lng} = JSON.parse(localStorage.getItem("center"))
        props.updateCenterPosition({lat, lng})
        props.addMarker({lat, lng, title, description, chatState: stateLinkedChat})
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
                            <Form.Control type="text" onChange={handleTitleInput}
                                          className={"map__modal_input"}
                                          placeholder="Title"
                            />
                        </FloatingLabel>


                        <Form.Control as="textarea" rows={3} onChange={handleDescriptionInput}
                                      className={"map__modal_input"}
                                      placeholder="Description"
                        />
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer className={"map__modal map__modal_footer"}>
                    <Button className={"map__model_submit"} onClick={handleSubmit}>
                        Join to Chat
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}
