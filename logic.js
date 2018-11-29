function render() {
    class App extends React.Component {
        render() {
            return (
                <div>
                    <NavBar />
                </div>
            );
        }
    }
    class NavBar extends React.Component {
        render() {
            return (
                <div className="navbar"></div>
            );
        }
    }




    ReactDOM.render(
        <App />,
        document.getElementById("root")
    );
}
render();
