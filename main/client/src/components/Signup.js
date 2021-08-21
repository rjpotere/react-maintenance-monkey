import React, { useState } from 'react';
// import { Alert } from 'react-bootstrap';
// import { useMutation } from '@apollo/client';
// import { ADD_USER } from ''
// import Auth from '';
// import { Link } from 'react-router-dom';

const Signup = () => {
    //initial usestate set to blank 
    // const [userFormData, setUserFormData] = useState ({ username: '', email: '', password: '' });
    // //show alert
    // const [displayAlert, setDisplayAlert] = useState(false);
    // //create new user
    // const [addUser] = useMutation(ADD_USER);

    // const handleInputChnage = (event) => {
    //     const { username, value } = event.target;
    //     setUserFormData({...userFormData, [username]: value });
    // };

    // const handleFormSubmit = async (event) => {
    //     event.preventDefault();

    //     try {
    //         const { data } = await addUser({
    //             variables: { ...userFormData },
    //         });

    //         Auth.login(data.addUser.token);
    //     } catch (err) {
    //         //change error to true to show alert
    //         setDisplayAlert(true)
    //     }

    //     setUserFormData({
    //         username: '',
    //         email: '',
    //         password: '',
    //     });
    // };

    return (
        <div>
            <form>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"></input>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                    <input type="password" className="form-control" id="exampleInputPassword1"></input>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )

}

export default Signup;