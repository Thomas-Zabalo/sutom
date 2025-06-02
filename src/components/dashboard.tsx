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
        <li key={`attempt-${index}`} className="list-row">
            <div className="flex gap-3">
                <div className="correct w-8 h-8 flex items-center justify-center">{attemptObj.word[0]}</div>
                {attemptObj.word.slice(1).split('').map((char, i) => (
                    <div
                        key={i + 1}
                        className={`w-8 h-8 flex items-center justify-center ${attemptObj.status[i + 1]}`}
                    >
                        {char}
                    </div>
                ))}
            </div>
        </li>
    ));

// Ligne en cours de saisie
    rows.push(
        <li key="current" className="list-row">
            <div className="flex gap-3">
                <div className="correct w-8 h-8 flex items-center justify-center">{dayWord[0]}</div>
                {dayWord.slice(1).split('').map((_, index) => (
                    <div
                        key={index + 1}
                        className={`w-8 h-8 flex items-center justify-center ${keyIndex[index] ? 'played' : ''}`}
                    >
                        {keyIndex[index] || '_'}
                    </div>
                ))}
            </div>
        </li>
    );

// Lignes vides restantes pour compléter jusqu'à 5
    const totalLines = 5;
    const remainingLines = totalLines - submittedAttempts.length - 1; // -1 pour la ligne actuelle

    for (let i = 0; i < remainingLines; i++) {
        rows.push(
            <li key={`empty-${i}`} className="list-row">
                <div className="flex gap-3">
                    {dayWord.split('').map((_, index) => (
                        <div key={index} className="w-8 h-8 flex items-center justify-center">_</div>
                    ))}
                </div>
            </li>
        );
    }


    return (
        <>
            <ul className="list bg-base-100 rounded-box shadow-md">
                <li className="p-4 pb-2 text-xs opacity-60 tracking-wide">Word of the day</li>
                {rows}
            </ul>
        </>
    )
}
