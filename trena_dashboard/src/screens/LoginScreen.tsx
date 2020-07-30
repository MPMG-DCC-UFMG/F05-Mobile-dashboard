import React, {useState} from "react";
import {InputField} from "../components/form/InputField";
import {ReactComponent as Logo} from "../images/logo.svg";
import {useStores} from "../core/stores/UseStores";
import {Redirect} from "react-router-dom";

export const LoginScreen: React.FC<any> = () => {

    const {userStore} = useStores()
    const [user, setUser] = useState({username: "", password: ""})

    if (userStore.loggedUser) {
        return <Redirect to="/"/>
    }

    const onLoginClicked = () => {
        userStore.login(user.username, user.password)
    }

    const onValueChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUser({...user, [e.target.name]: e.target.value})
    }

    const isFormValid = (): boolean => {
        let valid = true
        Object.values(user).forEach(value => {
            if (!value) {
                valid = false
            }
        })
        return valid
    }

    return (
        <section className="hero is-fullheight">
            <div className="hero-body is-flex">
                <div className="container">
                    <div className="box" style={{width: "300px", margin: "auto"}}>
                        <figure className="image">
                            <Logo/>
                        </figure>
                        <InputField inputLabel="Usuário"
                                    inputDefaultValue={user.username}
                                    onValueChanged={onValueChanged}
                                    inputName="username"/>
                        <InputField inputLabel="Senha"
                                    inputDefaultValue={user.password}
                                    onValueChanged={onValueChanged}
                                    inputName="password"
                                    type="password"/>
                        <button disabled={!isFormValid()} className="button is-info" onClick={onLoginClicked}>
                            Logar
                        </button>
                    </div>
                </div>
            </div>
        </section>
    )
}