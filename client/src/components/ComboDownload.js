import React, { Component } from 'react';
import { Button } from '@material-ui/core';
import PropTypes from 'prop-types';
import Loader from 'react-loader-spinner';

// Style
import './ComboDownload.css';

export class ComboDownload extends Component {
	static get propTypes() {
		return {
			list : PropTypes.string
		};
	}

	static defaultProps = {
		list : ''
	};

	constructor(props) {
		super(props);

		this.state = {
			loading : false
		};

		this.handleDownload = this.handleDownload.bind(this);
		this.downloadList = this.downloadList.bind(this);
	}

	downloadList(fileName, content) {
		let a = document.createElement('a');
		let file = new Blob(
			[
				content
			],
			{ type: 'text/plain' }
		);
		a.href = URL.createObjectURL(file);
		a.download = fileName;
		a.click();

		setTimeout(() => {
			this.setState({ loading: false });
		}, 600);
	}

	handleDownload(evt) {
		evt.preventDefault();
		this.setState({ loading: true });
		let listLength = this.props.list.split('\n').length;
		this.downloadList(`wombo_combo_${listLength}.txt`, this.props.list);
	}

	render() {
		return (
			<div className='ComboDownload'>
				<Button onClick={this.handleDownload}>
					{this.state.loading ? (
						<Loader type='TailSpin' color='#2ebf91' width={25} height={25} />
					) : (
						'Download List (*.txt)'
					)}
				</Button>
			</div>
		);
	}
}

export default ComboDownload;
