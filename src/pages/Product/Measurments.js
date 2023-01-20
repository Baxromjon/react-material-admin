import React, {useEffect, useState} from 'react';
import {Modal, ModalHeader, ModalBody, ModalFooter} from "reactstrap";
// import {AvField, AvForm} from 'availity-reactstrap-validation'
import request from "../../utils/request";
import {api} from "../../utils/api";
import {TextField} from "@material-ui/core";

const Measurements = () => {
    const [measurements, setMeasurements] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [currentMeasurement, setCurrentMeasurement] = useState('');

    useEffect(() => {
        getAllMeasurements()
    }, [])

    const getAllMeasurements = () => {
        request({
            url: api.getAllMeasurements,
            method: 'GET'
        }).then(res => {
            setMeasurements(res.data.data)
        }).catch(err => {
        })
    }

    const handleShow = () => {
        setShowModal(!showModal);
        console.log(showModal)
    }

    const saveMeasurement = (e) => {
        console.log(e)

    }

    return (
        <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
            <div style={{width: "100px"}}>
                <button className="btn btn-success" onClick={handleShow}>qo`shish
                </button>
            </div>
            <br/>
            <table className="table table-bordered text-center">
                <thead>
                <tr>
                    <th>№</th>
                    <th>O`lchov birlik nomi</th>
                    <th>Taxrirlash</th>
                </tr>
                </thead>
                <tbody>
                {measurements?.map((item, index) =>
                    <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{item.name}</td>
                        <td>
                            <button className="btn m-1">Taxrirlash</button>
                            <button className="btn m-1">O`chirish</button>
                        </td>
                    </tr>
                )}
                </tbody>
            </table>

            <Modal isOpen={showModal} centered={true}>
                <ModalHeader>O`lchov qo`shish</ModalHeader>
                <ModalBody>
                    <form action="#" onSubmit={(e) => saveMeasurement(e)}>
                        <TextField id="standard-basic" label="Nomini kiriting" variant="standard" name="name" fullWidth="100px"/>
                    </form>
                </ModalBody>
                <ModalFooter>
                    <button className="btn btn-danger"  onClick={handleShow}
                    >Bekor qilish
                    </button>
                    <button className="btn btn-success" type="submit" >Saqlash</button>
                </ModalFooter>
            </Modal>


        </div>
    );
}

//
// Measurements.propTypes = {};

export default Measurements;