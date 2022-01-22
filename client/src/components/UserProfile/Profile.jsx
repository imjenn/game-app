import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

const Profile = () => {

    const getUserID = async () => {
        let data;
        await axios.get(`http://localhost:8000/userid`)
            .then(function (response) {
                console.log(response);
                data = response;
            }).catch(function(error) {
                console.log(error.response.data);
            });
    }

    return (
        <div>
            <br/><br/>
            <center>This is the user's homepage</center><hr/>
            <button onClick={getUserID}>Go</button>
        </div>
    )
}

export default Profile;