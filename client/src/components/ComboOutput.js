import React, { Component } from 'react';
import { CircularProgress } from '@material-ui/core';
import PropTypes from 'prop-types';
import axios from 'axios';

const ENDPOINT = 'http://localhost:5000/wombo-combo/api/list/upload';

export class ComboOutput extends Component {
	static get propTypes() {
		return {
			files : PropTypes.object,
			vars  : PropTypes.object
		};
	}

	static defaultProps = {
		files : {},
		vars  : {}
	};

	constructor(props) {
		super(props);

		this.state = {
			loading    : true,
			comboList  : '',
			comboCount : 0
		};

		this.buildComboList = this.buildComboList.bind(this);
	}

	componentDidMount() {
		this.buildComboList();
	}

	async buildComboList() {
		const data = new FormData();
		data.append('usernames', this.props.files.usernames);
		data.append('passwords', this.props.files.passwords);
		data.append('vars', this.props.vars);

		// Make request to server
		axios
			.post(ENDPOINT, data)
			.then((response) => {
				if (response.status === 200) {
					let contentLength = response.data.split('\n').length;
					this.setState({
						loading    : false,
						comboCount : contentLength,
						comboList  : response.data
					});
				}
			})
			.catch((err) => console.log(err));
	}

	render() {
		return (
			<div className='ComboOutput'>
				{this.state.loading ? (
					<CircularProgress style={{ marginTop: '30px', marginBottom: '30px' }} color='primary' />
				) : (
					<div>
						<p>Num of combos generated: {this.state.comboCount}</p>
					</div>
				)}
			</div>
		);
	}
}

export default ComboOutput;
