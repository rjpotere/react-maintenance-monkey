import React from 'react';

function Header() {
    return (
        <header>
            <div>
                <h1>Maintenance Monkey</h1>
            </div>
            <form className="sign-in-form">
                <div className="mb-3">
                    <input placeholder="Email" type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"></input>
                </div>
                <div className="mb-3">
                    <input placeholder="Password" type="password" className="form-control" id="exampleInputPassword1"></input>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
                <div>
                    <a href="#">Signup</a>
                </div>
            </form>
        </header>
    )
}

export default Header;
