import React, { Component } from 'react';
import { connect } from "react-redux";
import { Link } from 'react-router-dom';

import { getFolderName } from 'utils/utils';
import { switchPage, logout as onLogout } from 'store/actions';
import { getMenu, getActiveMenuId } from 'store/selectors';

import './Header.less';

import NavPanel from './NavPanel';

class Header extends Component {

	componentDidMount() {
		this.updatePage();
	}

	componentDidUpdate() {
		this.updatePage();
	}

	updatePage() {
		const {
			id = '',
			route: {
				location: {
					pathname = ''
				}
			},
			switchPage
		} = this.props;

		const newId = getFolderName(pathname);

		if (newId !== id) {
			switchPage(newId);
		}
	}

	render() {
		const {
			className = '',
			name = '',
			menu = [],
			onLogout
		} = this.props;

		return(
			<header
				className={`navbar navbar-expand navbar-dark bg-primary ${className}`}
			>
				<Link
					to="/"
					className="navbar-brand"
					title={name}
				>
					{name}
				</Link>
				<div className="navbar-collapse">
					<NavPanel
						list={menu}
					/>
				</div>
				<Link
					to="/login"
					className="btn btn-secondary"
					title="Logout"
					onClick={() => onLogout()}
				>
					<i className="fa fa-power-off"></i>
				</Link>
			</header>
		)
	}
};

const mapStateToProps = state => {
	return {
		id: getActiveMenuId(state),
		menu: getMenu(state)
	}
}

export default connect(
	mapStateToProps,
	{ switchPage, onLogout }
)(Header);
