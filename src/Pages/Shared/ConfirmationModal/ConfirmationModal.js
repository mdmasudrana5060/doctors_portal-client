import React from 'react';

const ConfirmationModal = ({ title, description, closeModal, successAction, modalData, buttonAction }) => {
    return (
        <div>




            <input type="checkbox" id="confirmationModal" className="modal-toggle" />
            <div className="modal modal-bottom sm:modal-middle">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">{title}</h3>
                    <p className="py-4">{description}</p>
                    <div className="modal-action">
                        <label
                            onClick={() => successAction(modalData)}
                            htmlFor="confirmationModal" className="btn">{buttonAction}</label>
                        <label

                            onClick={closeModal}
                            htmlFor="confirmationModal" className="btn">Close</label>
                    </div>

                </div>
            </div>

        </div>
    );
};

export default ConfirmationModal;