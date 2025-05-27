import {ALPHABET} from "../constants/alphabet.ts";
import Key from "./key.tsx";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faDeleteLeft, faRightToBracket} from "@fortawesome/free-solid-svg-icons";


interface Props {
    getUserKey: (key: string) => void;
    erase?: () => void;
}

export default function Keyboard({getUserKey, erase}: Props) {
    const firstRow = ALPHABET.slice(0, 10);
    const secondRow = ALPHABET.slice(10, 20);
    const thirdRow = ALPHABET.slice(20);

    function getValue(key: string) {
        if (key) {
            getUserKey(key);
        }
    }

    function onsubmit() {

    }

    function ondelete() {
        if (erase) {
            erase()
        }
    }

    return (
        <>
            <div className='flex flex-col items-center gap-3'>
                <div className='flex gap-3'>
                    {
                        firstRow.map(k => {
                            return <Key key={k.id} id={k.id} keyChar={k.keyCode} getValue={getValue}/>
                        })
                    }
                </div>
                <div className='flex gap-3'>
                    {
                        secondRow.map(k => {
                            return <Key key={k.id} id={k.id} keyChar={k.keyCode} getValue={getValue}/>
                        })
                    }
                </div>
                <div className='flex gap-3'>
                    <button onClick={ondelete} type="button"
                            className="btn outline-base-content h-10 w-14 cursor-pointer place-items-center rounded-lg border-1 outline-offset-2">
                        <FontAwesomeIcon icon={faDeleteLeft}/>
                    </button>
                    {
                        thirdRow.map(k => {
                            return <Key key={k.id} id={k.id} keyChar={k.keyCode} getValue={getValue}/>
                        })
                    }
                    <button onClick={onsubmit} type="button"
                            className="btn outline-base-content h-10 w-14 cursor-pointer place-items-center rounded-lg border-1 outline-offset-2">
                        <FontAwesomeIcon icon={faRightToBracket}/>
                    </button>
                </div>
            </div>
        </>
    )
}