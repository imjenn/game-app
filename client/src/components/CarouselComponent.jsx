import React, {useEffect} from 'react';
import {Carousel} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

import apex from './images/apex-banner.jpeg';


const CarouselComponent = () =>{
    useEffect(async() => {
        // Run! Like go get some data from an API.
        await getGamesList()
    }, []);

    const getGamesList = async () => {
        let data;
        await axios.get("http://localhost:8000/games")
            .then(function(response) {
                data = response.data
            }).catch(function(error) {
                console.log(error.response.data);
            });
        console.log(data[0].image);

        for (let i = 0; i < data.length; i++) {
            console.log(data[i].title);
            document.getElementById(`img${i}`).setAttribute("src", data[i].image);
            document.getElementById(`img${i}`).style.width = '400px';
            document.getElementById(`img${i}`).style.height = '650px';
        }
    }

    return (
        <Carousel fade style={{marginTop: "-50px"}}>
            <Carousel.Item interval={5000} >
                <img
                    className="d-block w-100"
                    src={apex}
                    alt="First slide"
                    height="750px"
                    style={{marginTop : "-30px"}}
                />
                <Carousel.Caption>
                    <h3>Apex Legends</h3>
                    <p>Battle for the glory on the fringes of the Frontier</p>
                </Carousel.Caption>
            </Carousel.Item>
            {/* <Carousel.Item interval={5000}>
                <img
                    className="d-block w-100"
                    id={'img1'}
                    alt="Second slide"
                />
                <Carousel.Caption>
                    <h3>Second slide label</h3>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                </Carousel.Caption>
            </Carousel.Item> */}
            {/* <Carousel.Item interval={5000}>
                <img
                    className="d-block w-100"
                    id={'img2'}
                    alt="Third slide"
                />
                <Carousel.Caption>
                    <h3>Second slide label</h3>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item interval={5000}>
                <img
                    className="d-block w-100"
                    id={'img3'}
                    alt="Fourth slide"
                />
                <Carousel.Caption>
                    <h3>Second slide label</h3>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item interval={5000}>
                <img
                    className="d-block w-100"
                    id={'img4'}
                    alt="Fifth slide"
                />
                <Carousel.Caption>
                    <h3>Second slide label</h3>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item interval={5000}>
                <img
                    className="d-block w-100"
                    id={'img5'}
                    alt="Sixth slide"
                />
                <Carousel.Caption>
                    <h3>Second slide label</h3>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item interval={5000}>
                <img
                    className="d-block w-100"
                    id={'img6'}
                    alt="Seventh slide"
                />
                <Carousel.Caption>
                    <h3>Second slide label</h3>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item interval={5000}>
                <img
                    className="d-block w-100"
                    id={'img7'}
                    alt="Eighth slide"
                />
                <Carousel.Caption>
                    <h3>Second slide label</h3>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item interval={5000}>
                <img
                    className="d-block w-100"
                    id={'img8'}
                    alt="Ninth slide"
                />
                <Carousel.Caption>
                    <h3>Second slide label</h3>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item interval={5000}>
                <img
                    className="d-block w-100"
                    id={'img9'}
                    alt="Tenth slide"
                />
                <Carousel.Caption>
                    <h3>Second slide label</h3>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item interval={5000}>
                <img
                    className="d-block w-100"
                    id={'img10'}
                    alt="Eleventh slide"
                />
                <Carousel.Caption>
                    <h3>Second slide label</h3>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
                <img
                    className="d-block w-100"
                    id={'img11'}
                    alt="Twelfth slide"
                />
                <Carousel.Caption>
                    <h3>Third slide label</h3>
                    <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
                </Carousel.Caption>
            </Carousel.Item> */}
        </Carousel>
    )
}

export default CarouselComponent;