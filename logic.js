
    class App extends React.Component {
        render() {
            return (
                <div>
                    <NavBar />
                    <Board />
                </div>
            );
        }
    }
    class NavBar extends React.Component {
        render() {
            return (
                <div className="navbar">
                    <h1>JUST DO IT</h1>
                    <img src="./images/logo.png" alt="logo" />
                </div>
            );
        }
    }
    class Board extends React.Component {
        render() {
            return (
                <div className="board">
                </div>
            );
        }
    }



function render() {
    ReactDOM.render(
        <App />,
        document.getElementById("root")
    );
}
render();
