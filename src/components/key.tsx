interface KeyProps {
    id: number;
    keyChar: string;
    getValue?: (key: string) => void;
}

export default function Key({id, keyChar, getValue}: KeyProps) {
    function onKeyPress() {
        if (getValue) {
            getValue(keyChar);
        }
    }

    return (
        <>
            <button onClick={onKeyPress} type="button" id={`key-${id}`}
                    className="btn outline-base-content h-10 flex-grow min-w-[2rem] max-w-[4rem] cursor-pointer place-items-center rounded-lg border-1 outline-offset-2">
                {keyChar}
            </button>
        </>
    )
}