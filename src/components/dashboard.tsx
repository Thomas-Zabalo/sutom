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
        <li className="list-row">
            <div key={index} className="flex gap-3">
                <div className={`correct w-8 h-8 flex items-center justify-center`}>{attemptObj.word[0]}</div>
                {attemptObj.word.slice(1).split('').map((char, i) => (
                    <div key={i + 1} className={`w-8 h-8 flex items-center justify-center ${attemptObj.status[i + 1]}`}>
                        {char}
                    </div>
                ))}
            </div>
        </li>
    ));

    rows.push(
        <li className="list-row">
            <div key="current" className="flex gap-3">
                <div className="correct w-8 h-8 flex items-center justify-center">{dayWord[0]}</div>
                {dayWord.slice(1).split('').map((_, index) => (
                    <div className={`w-8 h-8 flex items-center justify-center ${keyIndex[index] && 'played'}`}
                         key={index + 1}>{keyIndex[index] || '_'}</div>
                ))}
            </div>
        </li>
    );

    return (
        <>
            <ul className="list bg-base-100 rounded-box shadow-md">
                <li className="p-4 pb-2 text-xs opacity-60 tracking-wide">Word of the day</li>
                {rows}
            </ul>
        </>
    )
}
