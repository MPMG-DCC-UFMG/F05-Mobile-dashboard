import React, {useEffect, useState} from "react";
import {InputField} from "../../../components/form/InputField";
import {useStores} from "../../../core/contexts/UseStores";
import {MPNotification} from "../../../components/elements/Notification";
import {Dropdown} from "../../../components/form/Dropdown";
import {User} from "../../../core/models/User";

interface UserCRUDViewProps {
    initialUser?: User
}

export const UserCRUDView: React.FC<UserCRUDViewProps> = (props) => {
    const {initialUser} = props
    const {userStore} = useStores()
    const [user, setUser] = useState(
        {
            username: initialUser?.email ?? "",
            password1: "",
            password2: "",
            role: (initialUser?.role === "ADMIN") ? "admin" : "normal"
        })

    useEffect(() => {
        setUser({
            username: initialUser?.email ?? "",
            password1: "",
            password2: "",
            role: (initialUser?.role === "ADMIN") ? "admin" : "normal"
        });
    }, [props.initialUser])

    const onValueChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUser({...user, [e.target.name]: e.target.value})
    }

    const onAddUserClicked = async () => {
        await userStore.createUser(user.username, user.password1)
    }

    const formValid = (): boolean => {
        return (user.password1 === user.password2) && user.password1.length > 0
    }

    const options = [{key: "normal", value: "Padrão"}, {key: "admin", value: "Administrador"}]

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
                        <Dropdown inputLabel="Tipo de usuário"
                                  optionsList={options}
                                  inputDefaultValue={user.role}/>
                    </div>
                </div>
                {userStore.addResult &&
                <div className="panel-block" style={{'display': 'block'}}>
                    <MPNotification message={userStore.addResult}/>
                </div>
                }
                <div className="panel-block">
                    <button className="button is-link is-outlined is-fullwidth" onClick={onAddUserClicked}
                            disabled={!formValid()}>
                        {initialUser === undefined ? "Adicionar usuário" : "Atualizar usuário"}
                    </button>
                </div>
            </div>
        </>
    )
}