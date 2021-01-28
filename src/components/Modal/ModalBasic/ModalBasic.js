import React from 'react';
import { Modal } from 'semantic-ui-react';
import './ModalBasic.css';

export default function ModalBasic(props) {
    const {show, setShow, titulo, children} = props;

    const onClose = () => {
        setShow(false);
    };

    return (
        <Modal size="mini" open={show} onClose={onClose} className="modal-basic">
            {titulo && <Modal.Header>{titulo}</Modal.Header>}
            {children}
        </Modal>
    )
}
