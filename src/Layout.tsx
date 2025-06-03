import * as React from "react";
import Button from "./components/button.tsx";
import './App.css'

export default function Layout({children}: { children: React.ReactNode }) {
    return (
        <>
            <div className='absolute left-0 top-0'>
                <Button/>
            </div>
            <main>{children}</main>
        </>
    )
}