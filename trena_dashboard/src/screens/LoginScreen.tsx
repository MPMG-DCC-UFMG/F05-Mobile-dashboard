import { observer } from "mobx-react";
import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { Navigate } from "react-router-dom";
import { MPNotification } from "../components/Elements/Notification";
import { InputField } from "../components/Form/InputField";
import { useStores } from "../core/contexts/UseStores";
import { SecurityServiceQuery } from "../core/network/services/SecurityService";
import { ReactComponent as Logo } from "../images/logo.svg";

export const LoginScreen: React.FC<any> = observer(() => {
  const { userStore } = useStores();
  const [user, setUser] = useState({
    username: "dashboard_admin",
    password: "@dminUs3r!",
  });

  const { isError, isSuccess, error, refetch } = useQuery(
    "login",
    () => SecurityServiceQuery.login(user.username, user.password),
    {
      enabled: false,
    }
  );

  const onLoginClicked = async () => {
    refetch();
    await userStore.login(user.username, user.password);
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLoginClicked();
  };

  const onValueChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const isFormValid = (): boolean => {
    let valid = true;
    Object.values(user).forEach((value) => {
      if (!value) {
        valid = false;
      }
    });
    return valid;
  };

  useEffect(() => {}, [userStore.login]);

  return (
    <>
      {userStore.loggedUser || isSuccess ? (
        <Navigate to="/dashboard" />
      ) : (
        <section className="hero is-fullheight">
          <div className="hero-body is-flex">
            <div className="container">
              <div className="box" style={{ width: "300px", margin: "auto" }}>
                <figure className="image">
                  <Logo />
                </figure>
                <form onSubmit={onSubmit}>
                  <InputField
                    inputLabel="Usuário"
                    inputDefaultValue={user.username}
                    onValueChanged={onValueChanged}
                    inputName="username"
                  />
                  <InputField
                    inputLabel="Senha"
                    inputDefaultValue={user.password}
                    onValueChanged={onValueChanged}
                    inputName="password"
                    type="password"
                  />
                  <button
                    disabled={!isFormValid()}
                    className="button is-info"
                    onClick={onLoginClicked}
                    type={"submit"}
                  >
                    Logar
                  </button>
                </form>
                {userStore.loginResult ||
                  (isError && (
                    <div className="panel-block" style={{ display: "block" }}>
                      <MPNotification
                        message={
                          userStore.loginResult
                            ? userStore.loginResult
                            : (error as string)
                        }
                      />
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
});
