import './App.css'
import Dashboard from "./components/dashboard.tsx";
import Keyboard from "./components/keyboard.tsx";
import Button from "./components/button.tsx";
import {useEffect, useRef, useState} from "react";

function App() {
    const [key, setKey] = useState<string>('');
    const [dayWord] = useState<string>('POILE');
    const [validateLenght] = useState<number>(dayWord.length)

    const keyRef = useRef(key);
    const dayWordRef = useRef(dayWord);

    function getUserKey(value: string) {
        setKey(prev => {
            const newKey = prev + value.toUpperCase();
            return newKey.length > validateLenght ? prev : newKey;
        });
    }

    function erase() {
        setKey(prev => prev.slice(0, -1));
        return;
    }

    // Sync les refs avec les states
    useEffect(() => {
        keyRef.current = key;
    }, [key]);

    useEffect(() => {
        dayWordRef.current = dayWord;
    }, [dayWord]);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {

            if (e.key === "Backspace") {
                erase()
            }

            if (!/^[A-Za-z]+$/.test(e.key)) return;

            setKey(prev => {
                const newKey = prev + e.key.toUpperCase();
                return newKey.length > validateLenght ? prev : newKey;
            });

        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [validateLenght]);

    useEffect(() => {
        if (key.length === validateLenght && key === dayWord) {

            setTimeout(() => {
                alert("You win");
            }, 200);
        }
    }, [key, dayWord, validateLenght]);


    return (
        <>
            <div className='absolute left-0 top-0'>
                <Button/>
            </div>

            <div className='flex flex-col justify-between'>
                <div>
                    <Dashboard keyChar={key}/>
                </div>
                <div>
                    <Keyboard getUserKey={getUserKey} erase={erase}/>
                </div>
            </div>
        </>
    )
}

export default App
