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
            themeColor: "white",
            themeFontColor: "#57606f",
            gradientFillFirst: "#eef9f2",
            gradientFillSecond: "white",
            arrayItems: [],
            arrayDoneItems: [],
            somethingIsDone: false,
        }
        this.showHoverDetail = this.showHoverDetail.bind(this);
        this.turnOffHover = this.turnOffHover.bind(this);
        this.itemToArray = this.itemToArray.bind(this);
        this.addToDoneList = this.addToDoneList.bind(this);
        this.returnToToDoList = this.returnToToDoList.bind(this);
        this.deleteItemDone = this.deleteItemDone.bind(this);
        this.deleteItemToDo = this.deleteItemToDo.bind(this);
        this.openThemePicker = this.openThemePicker.bind(this);
        this.setThemeAndHidePicker = this.setThemeAndHidePicker.bind(this);
        this.itemToArrayClick = this.itemToArrayClick.bind(this);
        this.sendMail = this.sendMail.bind(this);
        this.changeToFavorite = this.changeToFavorite.bind(this)
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
                    isChecked: false,
                    key: Date.now(),
                    switchListFunction: this.addToDoneList,
                    deleteFunction: this.deleteItemToDo,
                    changeToFavorite: this.changeToFavorite

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

    itemToArrayClick(e) {

        if (this.textItem.value !== "") {
            var newItem = {
                text: this.textItem.value,
                isChecked: false,
                isStar: false,
                key: Date.now(),
                switchListFunction: this.addToDoneList,
                deleteFunction: this.deleteItemToDo
            };
            this.setState((prevState) => {
                return {
                    arrayItems: prevState.arrayItems.concat(newItem)
                };
            });
        }
        this.textItem.value = "";

    }
    addToDoneList(e) {
        var oldArray = this.state.arrayItems;
        var doneItem = e.target.nextSibling.getAttribute("data");
        var newArray = [];
        var doneListNewArr = this.state.arrayDoneItems;

        for (var i = 0; i < oldArray.length; i++) {
            if (doneItem != oldArray[i].key) {
                newArray.push(oldArray[i]);
            } else if (doneItem == oldArray[i].key) {
                oldArray[i].switchListFunction = this.returnToToDoList;
                oldArray[i].isChecked = true;
                oldArray[i].deleteFunction = this.deleteItemDone;
                doneListNewArr.push(oldArray[i]);
            }
        }
        this.setState({
            arrayItems: newArray,
            arrayDoneItems: doneListNewArr,
            somethingIsDone: true,
        })
    }

    returnToToDoList(e) {
        var oldArray = this.state.arrayDoneItems;
        var doneItem = e.target.nextSibling.getAttribute("data");
        var newArray = [];
        var toDoListNewArr = this.state.arrayItems;

        for (var i = 0; i < oldArray.length; i++) {
            if (doneItem != oldArray[i].key) {
                newArray.push(oldArray[i]);

            } else if (doneItem == oldArray[i].key) {
                oldArray[i].switchListFunction = this.addToDoneList;
                oldArray[i].isChecked = false;
                oldArray[i].deleteFunction = this.deleteItemToDo;
                toDoListNewArr.push(oldArray[i]);
            }
        }
        this.setState({
            arrayItems: toDoListNewArr,
            arrayDoneItems: newArray
        })
        if (this.state.arrayDoneItems.length === 1) {
            this.setState({
                somethingIsDone: false,
            })
        }
    }

    deleteItemDone(e) {
        var oldArray = this.state.arrayDoneItems;
        var deleteItem = e.target.parentElement.previousSibling.children[1].getAttribute("data");
        var newArray = [];
        for (var i = 0; i < oldArray.length; i++) {
            if (deleteItem != oldArray[i].key) {
                newArray.push(oldArray[i]);
            }
        }
        this.setState({
            arrayDoneItems: newArray
        })
    }

    deleteItemToDo(e) {
        var oldArray = this.state.arrayItems;
        var deleteItem = e.target.parentElement.previousSibling.children[1].getAttribute("data");
        var newArray = [];
        for (var i = 0; i < oldArray.length; i++) {
            if (deleteItem != oldArray[i].key) {
                newArray.push(oldArray[i]);
            }
        }
        this.setState({
            arrayItems: newArray
        })
    }

    changeToFavorite(e) {
        if (e.target.className === 'far fa-star') {
            e.target.className = 'fas fa-star'
            var oldArray = this.state.arrayItems;
            var favItem = e.target.parentElement.previousSibling.previousSibling.children[1].getAttribute("data");
            var newArray = [];
            for (var i = 0; i < oldArray.length; i++) {
                if (favItem == oldArray[i].key) {
                    oldArray[i].isStar = true;
                    newArray.unshift(oldArray[i]);
                } else {
                    newArray.push(oldArray[i]);
                }
            }
            this.setState({
                arrayItems: newArray
            })
        } else {
            e.target.className = 'far fa-star'
            var oldArray = this.state.arrayItems;
            var favItem = e.target.parentElement.previousSibling.previousSibling.children[1].getAttribute("data");
            var newArray = [];
            for (var i = 0; i < oldArray.length; i++) {
                if (oldArray[i].isStar= true) {
                    newArray.unshift(oldArray[i]);
                } else {
                    newArray.push(oldArray[i]);
                }
            }
            this.setState({
                arrayItems: newArray
            })

        }
    }

    openThemePicker() {
        console.log(this.themePicker.parentElement)
        this.themePicker.parentElement.style.display = "block"
    }
    setThemeAndHidePicker() {
        console.log(this.themePicker.value)
        if (this.themePicker.value === "default") {
            this.setState({
                themecolor: "white",
                themeFontColor: "#57606f",
                gradientFillFirst: "#eef9f2",
                gradientFillSecond: "white"
            })
        } else if (this.themePicker.value === "pink") {
            this.setState({
                themecolor: "#ffb5bb",
                themeFontColor: "#57606f",
                gradientFillFirst: "white",
                gradientFillSecond: "#ffb5bb"
            })
        } else if (this.themePicker.value === "orange") {
            this.setState({
                themecolor: "#ffaf90",
                themeFontColor: "#57606f",
                gradientFillFirst: "white",
                gradientFillSecond: "#ffaf90"
            })
        } else if (this.themePicker.value === "blue") {
            this.setState({
                themecolor: "#b5cfff",
                themeFontColor: "#57606f",
                gradientFillFirst: "white",
                gradientFillSecond: "#b5cfff"
            })
        } else if (this.themePicker.value === "green") {
            this.setState({
                themecolor: "#e1f5e8",
                themeFontColor: "#57606f",
                gradientFillFirst: "white",
                gradientFillSecond: "#e1f5e8"
            })
        } else if (this.themePicker.value === "gray") {
            this.setState({
                themecolor: "#c7c7c7",
                themeFontColor: "white",
                gradientFillFirst: "#797979",
                gradientFillSecond: "#c7c7c7"
            })
        } else {
            alert("something went terribly wrong in code")
        }

        this.themePicker.parentElement.style.display = "none"
    }

    sendMail() {
        var content = [];
        content.push("To Do Items:");
        content.push("\n");
        var arrayItems = this.state.arrayItems;
        for (var i = 0; i < arrayItems.length; i++) {
            content.push(`${i + 1}.${arrayItems[i].text}`);
            content.push("\n");
        }

        var arrayDoneItems = this.state.arrayDoneItems;
        content.push("Done List Items:");
        content.push("\n");
        for (var i = 0; i < arrayDoneItems.length; i++) {
            content.push(`${i + 1}.${arrayDoneItems[i].text}`);
            content.push("\n");
        }

        var link = "mailto:me@example.com"
            + "?cc=myCCaddress@example.com"
            + "&subject=" + escape(this.title.value)
            + "&body=" + escape(content.join(""))
            ;
        window.location.href = link;
    }

    render() {
        var style = {
            left: this.state.left + "px",
            top: this.state.top + "px"
        };
        var theme = {
            backgroundColor: this.state.themecolor,
            color: this.state.themeFontColor
        };
        var gradientFillDoneList = {
            backgroundImage: `linear-gradient(${this.state.gradientFillFirst}, ${this.state.gradientFillSecond})`
        }
        var somethingIsDone = this.state.somethingIsDone ? <div style={gradientFillDoneList} className='doneList'><p><i className="far fa-check-circle"></i> List of Completed tasks</p><DoneItems entries={this.state.arrayDoneItems} /></div> : null;
        return (
            <div className="topBarBlockContainer">
                <div style={theme} className="createNewListInputBar">
                    <div className="top-Title-Row">
                        <input ref={(input) => { this.title = input; }} className="titleInput" placeholder="Title" type="text"></input>
                        <div className="pinIconContainer"><i className="fas fa-map-pin"></i></div>
                    </div>
                    <div className="listItemContainer">
                        <div onClick={this.itemToArrayClick} className="plusIconContainer">
                            <i className="fas fa-plus"></i>
                        </div>
                        <input ref={(input) => { this.textItem = input; }} onKeyUp={this.itemToArray} className="listItemInput" placeholder="List item" type="text"></input>
                    </div>
                    <ToDoItems entries={this.state.arrayItems} />
                    {somethingIsDone}

                    <div className="bottomToolBarContainer">
                        <ul className="ToolsConatinter">
                            <li ><i onMouseEnter={this.showHoverDetail} onMouseLeave={this.turnOffHover} className="fas fa-bell"></i>
                                <div style={style} className="hoverDetail">Remind Me
                                </div>
                            </li>
                            <li><i onClick={this.sendMail} onMouseEnter={this.showHoverDetail} onMouseLeave={this.turnOffHover} className="fas fa-share-square"></i>
                                <div style={style} className="hoverDetail">Share
                                </div>
                            </li>
                            <li><i onClick={this.openThemePicker} onMouseEnter={this.showHoverDetail} onMouseLeave={this.turnOffHover} className="fas fa-palette"></i>
                                <div style={style} className="hoverDetail">Choose theme
                                </div>
                            </li>
                            <li className="themePickerContainer">
                                <select onChange={this.setThemeAndHidePicker} ref={(input) => { this.themePicker = input; }}>
                                    <option onClick={this.closeThemePicker} value="default">Default</option>
                                    <option onClick={this.closeThemePicker} value="pink" >Pink</option>
                                    <option onClick={this.closeThemePicker} value="orange">Orange</option>
                                    <option onClick={this.closeThemePicker} value="blue">Blue</option>
                                    <option onClick={this.closeThemePicker} value="green">Green</option>
                                    <option onClick={this.closeThemePicker} value="gray">Gray</option>
                                </select>
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
            <Item starClick={item.changeToFavorite} isChecked={item.isChecked} trashHandleClick={item.deleteFunction} handleClick={item.switchListFunction} key={item.key} data={item.key} text={item.text} />
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
            <Item hideStar={"none"} isChecked={item.isChecked} trashHandleClick={item.deleteFunction} handleClick={item.switchListFunction} key={item.key} data={item.key} text={item.text} />
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
    showHoverItem() {
        this.deletIcon.style.display = 'flex'
    }
    hideHoverItem() {
        this.deletIcon.style.display = 'none'
    }
    render() {
        return (
            <li className='item' onMouseEnter={this.showHoverItem} onMouseLeave={this.hideHoverItem}>
                <span>
                    <input checked={this.props.isChecked} type='checkbox' onClick={this.props.handleClick} />
                    <input data={this.props.data} type='text' onKeyUp={this.changeInput} value={this.state.inputValue} />
                </span>
                <span onClick={this.props.trashHandleClick} className="iconesItem iconCenter" ref={(input) => { this.deletIcon = input; }}>
                    <i className="far fa-trash-alt" ></i>
                </span>
                <span style={{display:this.props.hideStar}} onClick={this.props.starClick} className="iconCenter" >
                    <i className="far fa-star" ref={(input) => { this.favoritIcon = input; }}></i>
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
