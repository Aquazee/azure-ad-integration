import React from "react";
import logo from './logo.svg';
import './App.css';
import { AuthenticatedTemplate, MsalAuthenticationTemplate, UnauthenticatedTemplate, useMsal } from "@azure/msal-react";
import { InteractionType } from "@azure/msal-browser";
import { logoutRequest } from './config/authConfig';

function Home() {
    const { instance, accounts } = useMsal();
    function signOutClickHandler(instance, accountToSignOut) {
        instance.logoutRedirect(logoutRequest(accountToSignOut))
    }

    const logout = () => {
        console.log('logout clicked');
        if (accounts[0]) {
            signOutClickHandler(instance, accounts[0]);
        } else {
            console.error("Account not found for the given homeAccountId");
        }
    }
    return (
        <MsalAuthenticationTemplate interactionType={InteractionType.Redirect}>
            <div className="App">
                <header className="App-header">
                    <UnauthenticatedTemplate>
                        <button className="btn btn-primary" type="button" onClick={logout}>
                            Login
                        </button>
                    </UnauthenticatedTemplate>
                    <AuthenticatedTemplate>
                        <button className="btn btn-primary" type="button" onClick={logout}>
                            Logout
                        </button>
                    </AuthenticatedTemplate>
                    <img src={logo} className="App-logo" alt="logo" />
                    <p>
                        Edit <code>src/App.js</code> and save to reload.
                    </p>
                    <a
                        className="App-link"
                        href="https://reactjs.org"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Learn React
                    </a>
                </header>
            </div>
        </MsalAuthenticationTemplate>
    )
}

export default Home;