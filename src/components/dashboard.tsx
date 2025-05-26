interface value {
    keyChar: string;
}

export default function Dashboard({keyChar}: value) {
    return (
        <>
            {keyChar.toUpperCase()}
        </>
    )
}
