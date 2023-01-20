import React, {Component, useRef, useState} from 'react';

function AddProduct() {
    const [selectedFiles, setSelectedFiles] = useState(undefined);
    const [imagePreviews, setImagePreviews] = useState([]);
    const [progressInfos, setProgressInfos] = useState({val: []});
    const [message, setMessage] = useState([]);
    const [imageInfos, setImageInfos] = useState([]);
    const progressInfosRef = useRef(null);
    const selectFiles = (event) => {
        let images = [];

        for (let i = 0; i < event.target.files.length; i++) {
            images.push(URL.createObjectURL(event.target.files[i]));
        }

        setSelectedFiles(event.target.files);
        setImagePreviews(images);
        setProgressInfos({val: []});
        setMessage([]);
    };
    return (
        <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
            <div className="topnav">
                <a href="/products">Mahsulotlar</a>
                <a href="/brands">Brandlar</a>
                <a href="/measurements">O`lchovlar</a>
                <a href="/categories">Kategoriyalar</a>
            </div>
            <br/>
            <h1 className="text-center"><b>Mahsulot qo`shish</b></h1><br/>
            <div className="row">
                <div className="col-md-6">
                    <div className="container">
                        <div className="row gutters">
                            <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                <div className="card h-100">
                                    <div className="card-body">
                                        <div className="row gutters">
                                            <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                                <h6 className="mb-2 text-primary">Asosiy ma`lumotlar</h6>
                                            </div>
                                            <input type="file"
                                                   multiple/>
                                            <div className="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-12">
                                                <div className="form-group">
                                                    <label htmlFor="name">Mahsulot nomi</label>
                                                    <input type="text" className="form-control" id="name"
                                                           placeholder="Mahsulot nomini kiriting"/>
                                                </div>
                                            </div>
                                            <div className="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-12">
                                                <div className="form-group">
                                                    <label htmlFor="price">Mahsulot narxi</label>
                                                    <input type="number" className="form-control" id="price"
                                                           placeholder="Mahsulot narxi"/>
                                                </div>
                                            </div>
                                            <div className="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-12">
                                                <div className="form-group">
                                                    <label htmlFor="warrantyMonth">Kafolat(oylarda)</label>
                                                    <input type="number" className="form-control" id="warrantyMonth"
                                                           placeholder=""/>
                                                </div>
                                            </div>
                                            <div className="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-12">
                                                <div className="form-group">
                                                    <label htmlFor="discountPercent">Chegirma(%da)</label>
                                                    <input type="number" className="form-control" id="discountPercent"
                                                           placeholder=""/>
                                                </div>
                                            </div>
                                            <div className="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-12">
                                                <div className="form-group">
                                                    <label htmlFor="description">Mahsulot haqida</label>
                                                    <textarea className="form-control width:100px" id="description"
                                                              rows="3"></textarea>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-6">

                </div>
            </div>

        </div>
    );
}

AddProduct.propTypes = {};

export default AddProduct;