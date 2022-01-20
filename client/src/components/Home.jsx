import React, {useEffect} from 'react';
import CarouselComponent from "./CarouselComponent";
import { useLocation } from "react-router-dom";


const Home = () => {
    const location = useLocation();

    useEffect(() => {
        console.log(location.state); // result: 'some_value'
    }, [location]);



    return (
        <div>
            <center>
                <br/><br/><br/>
                <CarouselComponent/>
                <br/><br/><br/><p>Something</p>
                <br/><br/><br/><p>Something</p>
                <br/><br/><br/><p>Something</p>
            </center>
        </div>
    )
}

export default Home;