import {useRef} from "react";

export default function Modal() {
    const dialogRef = useRef<HTMLDialogElement>(null);

    const openModal = () => {
        dialogRef.current?.showModal();
    };

    return (
        <>
            <button className="btn" onClick={openModal}>open modal</button>

            <dialog ref={dialogRef} id="my_modal_1" className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Hello!</h3>
                    <p className="py-4">Press ESC key or click the button below to close</p>
                    <div className="modal-action">
                        <form method="dialog">
                            <button className="btn">Close</button>
                        </form>
                    </div>
                </div>
            </dialog>
        </>
    );
}
