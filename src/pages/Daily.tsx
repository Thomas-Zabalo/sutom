import './../App.css';
import Dashboard from "../components/dashboard.tsx";
import Keyboard from "../components/keyboard.tsx";
import {useCallback, useEffect, useRef, useState} from "react";
import {Link} from "react-router-dom";

type LetterStatus = 'correct' | 'present' | 'absent';

interface Attempt {
    word: string;
    status: LetterStatus[];
}

function Daily() {
    const [key, setKey] = useState<string>('');
    const [dayWord] = useState<string>('Jean');
    const [validateLength] = useState<number>(dayWord.length)
    const [attempt, setAttempt] = useState<number>(1);
    const [submittedAttempts, setSubmittedAttempts] = useState<Attempt[]>([]);

    const attemptRef = useRef(attempt);
    const keyRef = useRef(key);
    const dayWordRef = useRef(dayWord);

    useEffect(() => {
        keyRef.current = key;
    }, [key]);

    useEffect(() => {
        dayWordRef.current = dayWord.toUpperCase();
    }, [dayWord]);

    useEffect(() => {
        attemptRef.current = attempt;
    }, [attempt]);


    function getUserKey(value: string) {
        const upper = value.toUpperCase();

        if (key.length === 0 && upper === dayWord[0]) return;

        setKey(prev => {
            const newKey = prev + upper;
            return newKey.length > validateLength - 1 ? prev : newKey;
        });
    }


    function eraseChar() {
        setKey(prev => prev.slice(0, -1));
        return;
    }

    function getResultStatus(result: string, dayWord: string): LetterStatus[] {
        const resultArray = result.toUpperCase().split('');
        const dayWordArray = dayWord.toUpperCase().split('');
        const status: LetterStatus[] = Array(result.length).fill('absent');

        // Étape 1 : Vérifie les lettres bien placées
        for (let i = 0; i < resultArray.length; i++) {
            if (resultArray[i] === dayWordArray[i]) {
                status[i] = 'correct';
                dayWordArray[i] = '';
            }
        }

        // Étape 2 : Vérifie les lettres mal placées
        for (let i = 0; i < resultArray.length; i++) {
            if (status[i] === 'correct') continue;

            const index = dayWordArray.indexOf(resultArray[i]);
            if (index !== -1) {
                status[i] = 'present';
                dayWordArray[index] = '';
            }
        }

        return status;
    }

    const onsubmit = useCallback(() => {
        const result = dayWord[0] + key;
        if (result.length < dayWord.length) return;

        const status = getResultStatus(result, dayWord.toUpperCase());

        if (key.length === validateLength - 1 && result === dayWord.toUpperCase()) {
            setTimeout(() => {
                alert("You win");
            }, 200);
        } else {
            setSubmittedAttempts(prev => [...prev, {word: result, status}]);
            setKey('');
            setAttempt(prev => prev + 1);
        }
    }, [key, dayWord, validateLength]);


    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            const upper = e.key.toUpperCase();

            if (e.key === "Backspace") {
                eraseChar();
                return;
            }

            if (e.key === "Enter") {
                onsubmit();
                return;
            }

            if (key.length === 0 && upper === dayWord[0]) return;

            if (!/^[A-Za-z]+$/.test(upper)) return;

            setKey(prev => {
                const newKey = prev + upper;
                return newKey.length > validateLength - 1 ? prev : newKey;
            });

        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [key, dayWord, validateLength, onsubmit]);


    return (
        <>

            <div className="breadcrumbs text-sm">
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li>Daily</li>
                </ul>
            </div>


            <div className='flex flex-col justify-between items-center'>
                <div>
                    <Dashboard
                        keyChar={key}
                        dayWord={dayWord}
                        attempt={attempt}
                        submittedAttempts={submittedAttempts}/>
                </div>
                <div>
                    <Keyboard
                        getUserKey={getUserKey}
                        eraseChar={eraseChar}
                        submit={onsubmit}/>
                </div>
            </div>
        </>
    )
}

export default Daily
