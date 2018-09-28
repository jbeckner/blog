import * as React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Blog from './pages/blog';

interface AppProps {
    baseUrl: string
}
interface AppState {
    email: string | null
}

class App extends React.Component<AppProps, AppState>{
    constructor(props: AppProps) {
        super(props)
        this.state = {
            email: localStorage.getItem('email')
        }
    }

    onLogin = (email: string) => {
        localStorage.setItem('email', email);
        this.setState({ email });
        window.location.replace(window.location.origin);
    }

    render() {
        // Redirect to homepage if user tries to go to Sign In page while being logged in
        if (window.location.pathname === "/sign-in" && this.state.email) {
            window.location.replace(window.location.origin);
            return <></>
        }

        return (
            <BrowserRouter basename={this.props.baseUrl} >
                <Switch>                
                    <Route exact path="/" key="/" component={Blog} />,
                </Switch>
            </BrowserRouter>
        )
    }
}

export default App;