import React, {useState} from "react";
import {InputField} from "../../components/form/InputField";
import {useStores} from "../../core/contexts/UseStores";

export const UserCRUDView: React.FC<any> = () => {
    const {userStore} = useStores()
    const [user, setUser] = useState({username: "", password1: "", password2: ""})

    const onValueChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUser({...user, [e.target.name]: e.target.value})
    }

    const onAddUserClicked = async () => {
        await userStore.createUser(user.username, user.password1)
    }

    const formValid = (): boolean => {
        return (user.password1 === user.password2) && user.password1.length > 0
    }

    return (
        <>
            <div className="panel">
                <div className="panel-heading">
                    <nav className="level">
                        <div className="level-left">
                            <div className="level-item">
                                Novo Usuário
                            </div>
                        </div>
                    </nav>
                </div>
                <div className="panel-block">
                    <div className="container has-text-left">
                        <InputField inputLabel="Usuário"
                                    inputDefaultValue={user.username}
                                    onValueChanged={onValueChanged}
                                    inputName="username"/>
                        <InputField inputLabel="Senha"
                                    inputDefaultValue={user.password1}
                                    onValueChanged={onValueChanged}
                                    inputName="password1"
                                    type="password"/>
                        <InputField inputLabel="Confirmar Senha"
                                    inputDefaultValue={user.password2}
                                    onValueChanged={onValueChanged}
                                    inputName="password2"
                                    type="password"/>
                    </div>
                </div>
                <div className="panel-block">
                    <button className="button is-link is-outlined is-fullwidth" onClick={onAddUserClicked}
                            disabled={!formValid()}>
                        Adicionar usuário
                    </button>
                </div>
            </div>
        </>
    )
}