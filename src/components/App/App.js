import React, { Component } from 'react';
import {
	BrowserRouter as Router,
	Route,
	Switch,
	Redirect
} from "react-router-dom";
import { connect } from "react-redux";

import './App.less';
import { getUserLoginStatus, getUserLoginLoading, getUserLoginError } from 'store/selectors';
import { login as loginAction, loginByToken } from 'store/actions';

import Header from 'app/Header';
import LoginForm from 'app/LoginForm';
import Dashboard from 'app/Dashboard';
import Tasks from 'app/Tasks';

const menu = [
	{ id: 'dashboard', name: 'Dashboard', url:'/dashboard', active: true },
	{ id: 'tasks', name: 'Tasks', url:'/tasks', active: false },
]

class App extends Component {

	constructor(props) {
		super(props);

		this.onSubmit = this.onSubmit.bind(this);
	}

	componentDidMount() {
		const { loginByToken } = this.props;
		loginByToken();
	}

	onSubmit(data) {
		const { loginAction } = this.props;
		loginAction(data);
	}

	render() {
		const {
			className = '',
			isLoggedIn = false,
			loading = false,
			loginError = ''
		} = this.props;

		let appBody = null;

		if (!isLoggedIn) {
			appBody = (
				<LoginPage
					className=""
					loading={loading}
					error={loginError}
					onSubmit={this.onSubmit}
				/>
			);
		} else {
			appBody = (
				<MainApp />
			);
		}

		return(
			<Router>
				<div className="App">
					{appBody}
				</div>
			</Router>
		);
	}
}

function LoginPage(props) {
	const { className = '', error = '', loading = false, onSubmit } = props;

	return(
		<React.Fragment>
			<Switch>
				<Route
					path="/login" render={(props) => {
						return(
							<LoginForm
								className={className}
								loading={loading}
								error={error}
								onSubmit={onSubmit}
							/>
						)
					}}
				/>
				<Redirect to="/login"	/>
			</Switch>
		</React.Fragment>
	)
}

function MainApp(props) {
	const { menu = [] } = props;

	return (
		<React.Fragment>
			<Route path="/" render={(props) => {
					return(
						<Header
							className="App-header"
							name="UI Task Tracker"
							menu={menu}
							route={props}
						/>
					)
				}}
			/>
			<Switch>
				<Route
					exact path="/dashboard"
					render={() => {
						return(
							<Dashboard
								className="App-main"
							/>
						)
					}}
				/>
				<Route
					path="/dashboard/:id?"
					render={() => {
						return(
							<Redirect
								to="/dashboard"
							/>
						)
					}}
				/>
				<Route
					exact path="/tasks/:id?"
					render={() => {
						return(
							<Tasks
								className="App-main"
							/>
						)
					}}
				/>
				<Route
					path="/tasks/:id?"
					render={() => {
						return(
							<Redirect
								to="/tasks/"
							/>
						)
					}}
				/>
				<Redirect
					to="/dashboard"
				/>
			</Switch>
		</React.Fragment>
	)
}

const mapStateToProps = state => {
	return {
		isLoggedIn: getUserLoginStatus(state),
		loading: getUserLoginLoading(state),
		loginError: getUserLoginError(state)
	}
}

export default connect(
	mapStateToProps,
	{ loginAction, loginByToken }
)(App);
