import './App.css'
import Dashboard from "./components/dashboard.tsx";
import Keyboard from "./components/keyboard.tsx";
import Button from "./components/button.tsx";
import {useEffect, useRef, useState} from "react";

function App() {
    const [key, setKey] = useState<string>('');
    const [dayWord] = useState<string>('POILE');

    const keyRef = useRef(key);
    const dayWordRef = useRef(dayWord);

    function getUserKey(value: string) {
        setKey(prev => {
            const newKey = prev + value.toUpperCase();
            return newKey.length > 5 ? prev : newKey;
        });
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
                setKey(prev => prev.slice(0, -1));
                return;
            }

            if (!/^[A-Za-z]+$/.test(e.key)) return;

            setKey(prev => {
                const newKey = prev + e.key.toUpperCase();
                return newKey.length > 5 ? prev : newKey;
            });

        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    useEffect(() => {
        if (key.length === 5 && key === dayWord) {

            setTimeout(() => {
                alert("You win");
            }, 200);
        }
    }, [key, dayWord]);


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
                    <Keyboard getUserKey={getUserKey}/>
                </div>
            </div>
        </>
    )
}

export default App
