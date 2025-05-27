import {useState} from "react";

interface value {
    keyChar: string;
}

export default function Dashboard({keyChar}: value) {
    const [dayWord] = useState<string>('Jeanot');
    const keyIndex = keyChar.toUpperCase().split('');

    const rows = [];

    for (let i = 0; i < 7; i++) {
        rows.push(
            <tr className='text-center'>
                <th>{dayWord[0]}</th>
                {dayWord.split('').slice(1).map((_, index) => (
                    <th key={index + 1}>{keyIndex[index] ? keyIndex[index] : '.'}</th>
                ))}
            </tr>)
    }

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
