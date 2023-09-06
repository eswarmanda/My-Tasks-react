import {Component} from 'react'
import {v4} from 'uuid'
import './App.css'

// These are the lists used in the application. You can move them to any component needed.

const tagsList = [
  {
    optionId: 'HEALTH',
    displayText: 'Health',
  },
  {
    optionId: 'EDUCATION',
    displayText: 'Education',
  },
  {
    optionId: 'ENTERTAINMENT',
    displayText: 'Entertainment',
  },
  {
    optionId: 'SPORTS',
    displayText: 'Sports',
  },
  {
    optionId: 'TRAVEL',
    displayText: 'Travel',
  },
  {
    optionId: 'OTHERS',
    displayText: 'Others',
  },
]

// Replace your code here
class App extends Component {
  state = {
    taskInputIn: '',
    taskOptionIn: tagsList[0].optionId,
    selectedList: [],
    selectTabList: [],
    isTabClicked: false,
    tabId: '',
  }

  onAddTask = event => {
    event.preventDefault()
    const {taskInputIn, taskOptionIn} = this.state
    const displayOption = tagsList.filter(
      eachOption => eachOption.optionId === taskOptionIn,
    )

    const newData = {
      id: v4(),
      task: taskInputIn,
      option: displayOption[0].displayText,
    }
    this.setState(prevState => ({
      selectedList: [...prevState.selectedList, newData],
      taskInputIn: '',
      taskOptionIn: tagsList[0].optionId,
    }))
  }

  onChangeInput = event => {
    this.setState({taskInputIn: event.target.value})
  }

  onChangeOption = event => {
    this.setState({taskOptionIn: event.target.value})
  }

  onClickTab = event => {
    const {selectedList} = this.state
    const selectedTab = selectedList.filter(eachItem =>
      eachItem.option.includes(event.target.value),
    )
    this.setState({selectTabList: selectedTab, tabId: event.target.value})
    this.setState(prevState => ({isTabClicked: !prevState.isTabClicked}))
  }

  render() {
    const {
      taskInputIn,
      taskOptionIn,
      selectedList,
      selectTabList,
      tabId,
      isTabClicked,
    } = this.state

    return (
      <div className="main-card">
        <form className="form-card" onSubmit={this.onAddTask}>
          <h1 className="task-title">Create a task!</h1>
          <div className="input-card">
            <label htmlFor="task" className="label">
              Task
            </label>
            <input
              id="task"
              className="input"
              type="text"
              value={taskInputIn}
              placeholder="Enter the task here"
              onChange={this.onChangeInput}
            />
          </div>
          <div className="input-card">
            <label htmlFor="tags" className="label">
              Tags
            </label>
            <select
              id="tags"
              className="select"
              value={taskOptionIn}
              onChange={this.onChangeOption}
            >
              {tagsList.map(eachOption => (
                <option
                  key={eachOption.optionId}
                  className="option"
                  value={eachOption.optionId}
                >
                  {eachOption.displayText}
                </option>
              ))}
            </select>
          </div>
          <button className="add-btn" type="submit">
            Add Task
          </button>
        </form>
        <div className="task-view">
          <h3>Tags</h3>
          <ul className="tags-card">
            {tagsList.map(eachOption => (
              <li className="list-option" key={eachOption.optionId}>
                <button
                  value={eachOption.displayText}
                  className={
                    eachOption.displayText === tabId && isTabClicked
                      ? 'active-tab'
                      : 'tag-btn'
                  }
                  type="button"
                  onClick={this.onClickTab}
                >
                  {eachOption.displayText}
                </button>
              </li>
            ))}
          </ul>
          <div className="tasks-card">
            <h3>Tasks</h3>
            {selectedList.length > 0 ? (
              <div className="todo-List">
                {isTabClicked ? (
                  <ul>
                    {selectTabList.map(eachItem => (
                      <li className="selected-list" key={eachItem.id}>
                        <p className="task">{eachItem.task}</p>
                        <p className="select-option-btn">{eachItem.option}</p>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <ul>
                    {selectedList.map(eachItem => (
                      <li className="selected-list" key={eachItem.id}>
                        <p className="task">{eachItem.task}</p>
                        <p className="select-option-btn">{eachItem.option}</p>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ) : (
              <div className="no-task-card">
                <p>No Tasks Added Yet</p>
              </div>
            )}
          </div>
        </div>
      </div>
    )
  }
}

export default App
