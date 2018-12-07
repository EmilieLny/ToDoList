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
        if (e.keyCode == 13) {
            if (this.textItem.value !== "") {
                var newItem = {
                    text: this.textItem.value,
                    key: Date.now(),
                    switchListFunction: this.addToDoneList
                };
                this.setState((prevState) => {
                    return {
                        arrayItems: prevState.arrayItems.concat(newItem)
                    };
                });
            }
            this.textItem.value = "";
        }

    }
    addToDoneList(e) {
        var oldArray = this.state.arrayItems;
        var doneItem = e.target.nextSibling.getAttribute("data");
        var newArray = [];
        var doneListNewArr = this.state.arrayDoneItems;
        
        for(var i=0;i<oldArray.length; i++){
            if(doneItem!=oldArray[i].key){
                newArray.push(oldArray[i]);
            }else if(doneItem==oldArray[i].key){
                oldArray[i].switchListFunction= this.returnToToDoList;
                doneListNewArr.push(oldArray[i]);
            }
        }
        this.setState({
            arrayItems: newArray,
            arrayDoneItems: doneListNewArr
        })

    }
    returnToToDoList(e) {
        var oldArray = this.state.arrayDoneItems;
        var doneItem = e.target.nextSibling.getAttribute("data");
        var newArray = [];
        var toDoListNewArr = this.state.arrayItems;
        
        for(var i=0;i<oldArray.length; i++){
            if(doneItem!=oldArray[i].key){
                newArray.push(oldArray[i]);
                
            }else if(doneItem==oldArray[i].key){
                oldArray[i].switchListFunction= this.addToDoneList;
                toDoListNewArr.push(oldArray[i]);
            }
        }
        this.setState({
            arrayItems: toDoListNewArr,
            arrayDoneItems: newArray
        })
    }

    render() {
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
                    <ToDoItems entries={this.state.arrayItems} />
                    <p>List of Completed tasks</p>
                    <DoneItems entries={this.state.arrayDoneItems} />
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
class ToDoItems extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }
    
    createTasks(item) {
        return (
            <Item handleClick={item.switchListFunction} key={item.key} data={item.key} text={item.text} />
        )
    }

    render() {
        var toDoEntries = this.props.entries;
        var listItems = toDoEntries.map(this.createTasks);
        return (
            <ul className="toDoListItems">
                {listItems}
            </ul>
        );
    }
}

class DoneItems extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }
    
    createTasks(item) {
        return (
            <Item handleClick={item.switchListFunction} key={item.key} data={item.key} text={item.text} />
        )
    }

    render() {
        var toDoEntries = this.props.entries;
        var listItems = toDoEntries.map(this.createTasks);
        return (
            <ul className="doneItems">
                {listItems}
            </ul>
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
            <li  className='item' onMouseEnter={this.showHoverItem} onMouseLeave={this.hideHoverItem}>
                <span>
                    <input type='checkbox' onClick={this.props.handleClick} />
                    <input data={this.props.data} type='text' onKeyUp={this.changeInput} value={this.state.inputValue} />
                </span>
                <span onClick={this.props.handleClick} className="iconesItem" ref={(input) => { this.deletIcon = input; }}>
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
