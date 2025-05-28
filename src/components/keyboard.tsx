import {ALPHABET} from "../constants/alphabet.ts";
import Key from "./key.tsx";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faDeleteLeft, faRightToBracket} from "@fortawesome/free-solid-svg-icons";


interface Props {
    getUserKey: (key: string) => void;
    eraseChar?: () => void;
    submit?: () => void;
}

export default function Keyboard({getUserKey, eraseChar, submit}: Props) {
    function getValue(key: string) {
        if (key) {
            getUserKey(key);
        }
    }

    function onsubmit() {
        if (submit) {
            submit()
        }
    }

    function removeChar() {
        if (eraseChar) {
            eraseChar()
        }
    }

    return (
        <>
            <div className='flex flex-col items-center gap-2'>
                <div className="grid grid-cols-7 gap-2 w-full">
                    {ALPHABET.map((k, index) => (
                        <>
                            <Key id={k.id} keyChar={k.keyCode} getValue={getValue}/>
                            {index === 20 && (
                                <button onClick={removeChar} type="button"
                                        className="btn outline-base-content h-10 w-14 cursor-pointer place-items-center rounded-lg border-1 outline-offset-2">
                                    <FontAwesomeIcon icon={faDeleteLeft}/>
                                </button>
                            )}
                            {index === 25 && (
                                <button onClick={onsubmit} type="button"
                                        className="btn outline-base-content h-10 w-14 cursor-pointer place-items-center rounded-lg border-1 outline-offset-2">
                                    <FontAwesomeIcon icon={faRightToBracket}/>
                                </button>
                            )}
                        </>
                    ))}
                </div>
            </div>
        </>
    )
}