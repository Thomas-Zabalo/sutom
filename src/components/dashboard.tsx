interface value {
    keyChar: string;
    dayWord: string;
}

export default function Dashboard({keyChar, dayWord}: value) {
    const keyIndex = keyChar.toUpperCase().split('');

    const rows = [];


    rows.push(
        <tr className='text-center'>
            <th>{dayWord[0]}</th>
            {dayWord.split('').slice(1).map((_, index) => (
                <th key={index + 1}>{keyIndex[index] ? keyIndex[index] : '_'}</th>
            ))}
        </tr>)


    return (
        <>
            <div className="overflow-x-auto">
                <table className="table">
                    <tbody>
                    {rows}
                    </tbody>
                </table>
            </div>
        </>
    )
}
