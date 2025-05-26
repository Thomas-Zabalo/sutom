import {ALPHABET} from "../constants/alphabet.ts";
import Key from "./key.tsx";

interface Props {
    getUserKey: (key: string) => void;
}

export default function keyboard({getUserKey}: Props) {
    const firstRow = ALPHABET.slice(0, 10);
    const secondRow = ALPHABET.slice(10, 20);
    const thirdRow = ALPHABET.slice(20);

    function getValue(key: string) {
        if (key) {
            getUserKey(key);
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
                    {
                        thirdRow.map(k => {
                            return <Key key={k.id} id={k.id} keyChar={k.keyCode} getValue={getValue}/>
                        })
                    }
                </div>
            </div>
        </>
    )
}