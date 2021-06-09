import React, { useState, useEffect } from "react";
import Header from "./Header";
import InputTodo from "./InputTodo";
import TodosList from "./TodosList";
import { v4 as uuidv4 } from "uuid";
import { Route, Switch } from "react-router-dom";

import About from "../pages/About";
import NotMatch from "../pages/NoMatch";

import Navbar from "./Navbar";

const TodoContainer = () => {
//console.log(`TodoContainer() >> ${JSON.stringify(getInitialTodos())}`)
	const [todos, setTodos] = useState(getInitialTodos());
	//const [todos, setTodos] = useState([]);

	const handleChange = id => {
//console.log(`TodoContainer() >> handleChange("${id}")`);
		setTodos(
			prevState => {
				return prevState.map(
					todo => {
						if (todo.id === id) {
//console.log(`TodoContainer() >> handleChange("${id}") >> return ${JSON.stringify({...todo, completed: !todo.completed})}`);
							return {
								...todo,
								completed: !todo.completed
							}
						}
//console.log(`TodoContainer() >> handleChange("${id}") >> return ${JSON.stringify(todo)}`);
						return todo;
					}
				);
			}
		)
	}

	const delTodo = id => {
		setTodos(
			[
				...todos.filter(
					todo=> {
						return todo.id !== id;
					}
				)
			]
		);
	}

	const addTodoItem = title => {
		const newTodo = {
			id: uuidv4(),
			title: title,
			completed: false
		}
		setTodos(
			[
				...todos,
				newTodo
			]
		);
	}

	const setUpdate = (updatedTitle, id) => {
		setTodos(
			todos.map(
				todo => {
					if (todo.id === id) {
						todo.title = updatedTitle;
					}
					return todo;
				}
			)
		);
	}

/**/
	useEffect(
		() => {
			console.log("test run");

			// getting stored items
			const temp = localStorage.getItem("todos");
			const loadedTodos = JSON.parse(temp);

			if (loadedTodos) {
				setTodos(loadedTodos);
			}
		},
		[setTodos]
	);

	useEffect(
		() => {
			// storing stored items
			const temp = JSON.stringify(todos);
			localStorage.setItem("todos", temp);
		},
		[todos]
	);
/**/
	function getInitialTodos() {
		//gettin stored items
		const temp = localStorage.getItem("todos");
		const savedTodos = JSON.parse(temp);
//console.log(`getInitialTodos() => savedTodos === ${JSON.stringify(savedTodos)}`);
		return savedTodos || [];
	}

	return (
		<>
			<Navbar />
			<Switch>
				<Route exact path="/">
					<div className="container">
						<div className="inner">
							<Header />
							<InputTodo addTodoProps={addTodoItem} />
							<TodosList
								todos = {todos}
								handleChangeProps = {handleChange}
								deleteTodoProps = {delTodo}
								setUpdate = {setUpdate}
							/>
						</div>
					</div>
				</Route>
				<Route path="/about">
					<About />
				</Route>
				<Route path="*">
					<NotMatch />
				</Route>
			</Switch>
		</>
	);
}

/*
return (
	<>
		<Navbar />
		<Switch>
			<Route exact path="/">
				<div className="container">
					<div className="inner">
						<Header />
						<InputTodo addTodoProps={addTodoItem} />
						<TodosList
							todos = {todos}
							handleChangeProps = {handleChange}
							deleteTodoProps = {delTodo}
							setUpdate = {setUpdate}
						/>
					</div>
				</div>
			</Route>
			<Route path="/about">
				<About />
			</Route>
			<Route path="*">
				<NotMatch />
			</Route>
		</Switch>
	</>
);


class TodoContainer extends React.Component {
	state = {
		todos: []
	};
	handleChange = id => {
		this.setState(
			prevState => (
				{
					todos: prevState.todos.map(
						todo => {
							if (todo.id === id) {
								return {
									...todo,
									completed: !todo.completed

								}
							}
							return todo;
						}
					)
				}
			)
		);
	};
	delTodo = id => {
		//console.log("deleted", id);
		this.setState(
			{
				todos: [
					...this.state.todos.filter(
						todo => {
							return todo.id !== id;
						}
					)
				]
			}
		);
	};
	addTodoItem = title => {
		const newTodo = {
			id: uuidv4(),
			title: title,
			completed: false
		};
		this.setState(
			{
				todos: [...this.state.todos, newTodo]
			}
		);
	}
	setUpdate = (updatedTitle, id) => {
		this.setState(
			{
				todos: this.state.todos.map(
					todo => {
						if (todo.id === id) {
							todo.title = updatedTitle;
						}
						return todo;
					}
				)
			}
		);
	}
	componentDidMount() {
		const temp = localStorage.getItem("todos");
		const loadedTodos = JSON.parse(temp);
		if (loadedTodos) {
			this.setState(
				{
					todos: loadedTodos
				}
			);
		}
	}
	componentDidUpdate(prevProps, prevState) {
		if (prevState.todos !== this.state.todos) {
			const temp = JSON.stringify(this.state.todos)
			localStorage.setItem("todos", temp);
		}
	}
	componentWillUnmount() {
		console.log("Cleaning up...");
	}
	render() {
		//console.log(this.handleChange);
		return (
			<div className="container">
				<div className="inner">
					<Header />
					<InputTodo addTodoProps={this.addTodoItem} />
					<TodosList
						todos = {this.state.todos}
						handleChangeProps = {this.handleChange}
						deleteTodoProps = {this.delTodo}
						setUpdate = {this.setUpdate}
					/>
				</div>
			</div>
		);
	}
}
*/

export default TodoContainer;
