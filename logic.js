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
                <CreateNewList />
            </div>
        );
    }
}

class CreateNewList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            left: 0,
            top: 0,
            arrayItems : [],
        }
        this.showHoverDetail = this.showHoverDetail.bind(this);
        this.turnOffHover = this.turnOffHover.bind(this);
        this.itemToArray = this.itemToArray.bind(this);
    }
    showHoverDetail(e) {
        console.log(e.target.nextSibling); //dont foget to remove this
        e.target.nextSibling.style.display = "block";
        var left = e.clientX;
        console.log(left); //dont foget to remove this
        var top = e.clientY;
        console.log(top); //dont foget to remove this
        this.setState({
            left: left,
            top: top
        });
    }
    turnOffHover(e) {
        console.log(e.target.nextSibling)
        e.target.nextSibling.style.display = "none";
    }
    itemToArray(e){
        if(e.keyCode == 13){
            var arr = this.state.arrayItems
            var toDo = this.textItem.value
            arr.push(toDo)
            this.setState({
                arrayItems: arr,
            })
            console.log(arr)
            this.textItem.value = ''
        }  
    }

    render() {
        var listItems = this.state.arrayItems.map( x => <li key={x}>{x}</li>)
        var style = {
            left: this.state.left + "px",
            top: this.state.top + "px"
        };
        return (
            <div className="topBarBlockContainer">
                <div className="createNewListInputBar">
                    <div className="top-Title-Row">
                        <input className="titleInput" placeholder="Enter Title..." type="text"></input>
                        <div className="pinIconContainer"><i className="fas fa-map-pin"></i></div>
                    </div>
                    <div className="listItemContainer">
                        <div className="plusIconContainer">
                            <i className="fas fa-plus-circle"></i>
                        </div>
                        <input ref={(input) => { this.textItem = input; }} onKeyUp={this.itemToArray} className="listItemInput" placeholder="List item" type="text"></input>
                        <div className="editIconContainer">
                            <i className="fas fa-edit"></i>
                        </div>
                    </div>
                    <ul>
                        {listItems}
                    </ul>
                    <div className="bottomToolBarContainer">
                        <ul className="ToolsConatinter">
                            <li ><i onMouseEnter={this.showHoverDetail} onMouseLeave={this.turnOffHover} className="fas fa-bell"></i>
                                <div style={style} className="hoverDetail">Remind Me
                        </div>
                            </li>
                            <li><i onMouseEnter={this.showHoverDetail} onMouseLeave={this.turnOffHover} className="fas fa-share-square"></i>
                                <div style={style} className="hoverDetail">Share
                        </div>
                            </li>
                            <li><i onMouseEnter={this.showHoverDetail} onMouseLeave={this.turnOffHover} className="fas fa-palette"></i>
                                <div style={style} className="hoverDetail">Choose color
                        </div>
                            </li>
                        </ul>

                    </div>
                </div>
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
