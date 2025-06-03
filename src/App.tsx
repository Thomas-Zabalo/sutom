import {Routes, Route} from 'react-router-dom'
import Layout from './Layout'
import Home from "./pages/Home";
import Daily from "./pages/Daily"

export default function App() {
    return (
        <Layout>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/daily" element={<Daily/>}/>
            </Routes>
        </Layout>
    )
}
