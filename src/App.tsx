import './App.css'
import Dashboard from "./components/dashboard.tsx";
import Keyboard from "./components/keyboard.tsx";
import Button from "./components/button.tsx";
import {useCallback, useEffect, useRef, useState} from "react";

function App() {
    const [key, setKey] = useState<string>('');
    const [dayWord] = useState<string>('POLE');
    const [validateLength] = useState<number>(dayWord.length)

    const keyRef = useRef(key);
    const dayWordRef = useRef(dayWord);

    function getUserKey(value: string) {
        const upper = value.toUpperCase();

        if (key.length === 0 && upper === dayWord[0]) return;

        setKey(prev => {
            const newKey = prev + upper;
            return newKey.length > validateLength - 1 ? prev : newKey;
        });
    }

    function erase() {
        setKey(prev => prev.slice(0, -1));
        return;
    }

    const onsubmit = useCallback(() => {
        const result = dayWord[0] + key;
        if (key.length === validateLength - 1 && result === dayWord) {
            setTimeout(() => {
                alert("You win");
            }, 200);
        }
    }, [key, dayWord, validateLength]);

    useEffect(() => {
        keyRef.current = key;
    }, [key]);

    useEffect(() => {
        dayWordRef.current = dayWord;
    }, [dayWord]);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            const upper = e.key.toUpperCase();

            if (e.key === "Backspace") {
                erase();
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
            <div className='absolute left-0 top-0'>
                <Button/>
            </div>

            <div className='flex flex-col justify-between'>
                <div>
                    <Dashboard keyChar={key} dayWord={dayWord}/>
                </div>
                <div>
                    <Keyboard getUserKey={getUserKey} erase={erase} submit={onsubmit}/>
                </div>
            </div>
        </>
    )
}

export default App
