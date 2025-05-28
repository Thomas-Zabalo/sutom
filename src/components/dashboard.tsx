type LetterStatus = 'correct' | 'present' | 'absent';

interface Attempt {
    word: string;
    status: LetterStatus[];
}

interface DashboardProps {
    keyChar: string;
    dayWord: string;
    attempt: number;
    submittedAttempts: Attempt[];
}


export default function Dashboard({keyChar, dayWord, submittedAttempts}: DashboardProps) {
    const keyIndex = keyChar.toUpperCase().split('');

    const rows = submittedAttempts.map((attemptObj, index) => (
        <tr key={index} className="text-center">
            <th className={`border p-2 ${attemptObj.status[0]}`}>{attemptObj.word[0]}</th>
            {attemptObj.word.slice(1).split('').map((char, i) => (
                <th key={i} className={`border p-2 ${attemptObj.status[i + 1]}`}>
                    {char}
                </th>
            ))}
        </tr>
    ));

    // Ligne actuelle
    rows.push(
        <tr key="current" className='text-center'>
            <th>{dayWord[0]}</th>
            {dayWord.slice(1).split('').map((_, index) => (
                <th key={index + 1}>{keyIndex[index] || '_'}</th>
            ))}
        </tr>
    );

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
