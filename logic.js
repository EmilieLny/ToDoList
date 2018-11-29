function render() {
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
                    <img src="https://image.flaticon.com/icons/svg/273/273504.svg" alt="logo" />
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




    ReactDOM.render(
        <App />,
        document.getElementById("root")
    );
}
render();
