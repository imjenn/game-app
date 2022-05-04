import axios from 'axios';
import { useState, useEffect } from 'react';

const useHttp = (collection, id) => {
    const [data, setData] = useState([]);

    useEffect(() => {
        axios.get(`http://localhost:8000/${collection}/${id}`)
            // .then(value => new Promise(resolve => {
            //     setTimeout(() => {
            //         resolve(value);
            //     }, 2000)
            // }))
            .then(res => {
                console.log(res.data);
                setData(res.data);
            })
            .catch(err => console.log(err));
    }, []);

    return {
        data
    }
}

export default useHttp;