import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";


const Register = ({ onReg, ...props }) => {
    const [emailInput, setEmailInput] = React.useState('');
    const [passwordInput, setpasswordInput] = React.useState('');
    const history = useHistory();

    function handleChangeEmailInput(e) {
        setEmailInput(e.target.value);
    }
    function handleChangePasswordInput(e) {
        setpasswordInput(e.target.value);
    }

    function handleSubmit(e) {
        // console.log('hello');
        e.preventDefault();
        onReg({ passwordInput, emailInput })
            .then(() => {
                history.push("/sign-in");
                props.setResStatus(true);
               })
            .catch((err) => {
                props.setResStatus(false);
                console.log(err);
            })
            .finally(() => {
                props.onInfoTool(true);
            });
    }

    useEffect(() => {
        if (localStorage.getItem("jwt")) {
            history.push("/main");
        }
    }, [history]);

    return ((
        <form className="auth" onSubmit={handleSubmit}>
            <h2 className="auth__title">Регистрация</h2>
            <input className="auth__input" type="email"
                placeholder="Email"
                minLength="2" maxLength="40"
                required value={emailInput} onChange={handleChangeEmailInput} />
            <input className="auth__input" type="text"
                placeholder="Пароль"
                minLength="8" maxLength="40"
                required value={passwordInput} onChange={handleChangePasswordInput} />
            <button className="auth__confirm-button" type="submit">Зарегистрироваться</button>
            {props.children}
        </form>
    ));
};

export default Register;