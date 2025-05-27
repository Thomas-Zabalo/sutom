import {useState} from "react";

interface value {
    keyChar: string;
}

export default function Dashboard({keyChar}: value) {
    const [dayWord] = useState<string>('Jeanot');

    const rows = [];

    for (let i = 0; i < 5; i++) {
        rows.push(
            <tr className='text-center'>
                <th>{dayWord.split('').slice(0, 1)}</th>
                {dayWord.split('').slice(1).map((index) => (
                    <th key={index}></th>
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
            {keyChar.toUpperCase()}
        </>
    )
}
