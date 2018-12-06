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
            arrayItems: [],
            arrayDoneItems: [],
        }
        this.showHoverDetail = this.showHoverDetail.bind(this);
        this.turnOffHover = this.turnOffHover.bind(this);
        this.itemToArray = this.itemToArray.bind(this);
        this.addToDoneList = this.addToDoneList.bind(this);
        this.returnToToDoList = this.returnToToDoList.bind(this);
    }
    showHoverDetail(e) {
        e.target.nextSibling.style.display = "block";
        var left = e.clientX;
        var top = e.clientY;
        this.setState({
            left: left,
            top: top
        });
    }
    turnOffHover(e) {
        e.target.nextSibling.style.display = "none";
    }
    itemToArray(e) {
        console.log('itemToArray')
        if (e.keyCode == 13) {
            var arr = this.state.arrayItems
            var toDo = this.textItem.value
            arr.push(toDo)
            this.setState({
                arrayItems: arr,
            })
            this.textItem.value = ''
        }
        console.log('TO DO ARRAY')
        console.log(this.state.arrayItems)
        console.log('DONE ARRAY')
        console.log(this.state.arrayDoneItems)
    }
    addToDoneList(e) {
        console.log('addToDoneList')
        if (e.target.checked) {
            var arrDone = this.state.arrayDoneItems
            var done = e.target.nextSibling.value
            arrDone.push(done)
            this.setState({
                arrayDoneItems: arrDone,
            })

            var index = this.state.arrayItems.indexOf(e.target.nextSibling.value);
            if (index > -1) {
                var newArray = this.state.arrayItems.splice(index, 1);/// BUUUUUUG
                console.log('newArray :') /// BUUUUUUG
                console.log(newArray)/// BUUUUUUG
                this.setState({/// BUUUUUUG
                    arrayItems: newArray/// BUUUUUUG
                })
            }
            console.log('TO DO ARRAY')
            console.log(this.state.arrayItems)
            console.log('DONE ARRAY')
            console.log(this.state.arrayDoneItems)
        }
    }
    returnToToDoList(e) {
        console.log('returnToToDoList')
        if (e.target.checked) {
            var arrToDo = this.state.arrayItems
            var toDo = e.target.nextSibling.value
            arrToDo.push(toDo)
            this.setState({
                arrayItems: arrToDo,
            })

            var index = this.state.arrayDoneItems.indexOf(e.target.nextSibling.value);/// BUUUUUUG
            if (index > -1) {/// BUUUUUUG
                this.state.arrayDoneItems.splice(index, 1);/// BUUUUUUG
            }/// BUUUUUUG
            console.log('TO DO ARRAY')
            console.log(this.state.arrayItems)
            console.log('DONE ARRAY')
            console.log(this.state.arrayDoneItems)
        }
    }

    render() {
        console.log('Im in the render')
        var listItems = this.state.arrayItems.map(x => <Item handleClick={this.addToDoneList} text={x} function={this.itemToArray}></Item>)
        var listDoneItems = this.state.arrayDoneItems.map(x => <Item handleClick={this.returnToToDoList} text={x}></Item>)
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

                    <ul>
                        <p> DONE LIST ---------------------</p>
                        {listDoneItems}
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

class Item extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            inputValue: this.props.text,
        }
        this.showHoverItem = this.showHoverItem.bind(this)
        this.hideHoverItem = this.hideHoverItem.bind(this)
        this.changeInput = this.changeInput.bind(this)
    }
    changeInput(e) {
        if (e.keyCode == 8) {
            var newText = e.target.value.slice(0, -1)
            this.setState({
                inputValue: newText
            })
        } else if (e.keyCode > 47 && e.keyCode < 90 || e.keyCode == 32) {
            var newText = e.target.value + e.key
            this.setState({
                inputValue: newText
            })
        } else if (e.keyCode == 13) {
            this.props.function(e)
        }
    }
    showHoverItem(e) {
        this.deletIcon.style.display = 'block'
    }
    hideHoverItem(e) {
        this.deletIcon.style.display = 'none'
    }
    render() {
        return (
            <li className='item' onMouseEnter={this.showHoverItem} onMouseLeave={this.hideHoverItem}>
                <span>
                    <input type='checkbox' onClick={this.props.handleClick} />
                    <input type='text' onKeyUp={this.changeInput} value={this.state.inputValue} />
                </span>
                <span className="iconesItem" ref={(input) => { this.deletIcon = input; }}>
                    <i className="far fa-trash-alt" ></i>
                </span>
            </li>
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
