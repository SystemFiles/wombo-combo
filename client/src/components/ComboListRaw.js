import React, { Component } from 'react';
import { Button, Grid, Snackbar } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import copy from 'copy-to-clipboard';
import PropTypes from 'prop-types';
import { v4 as uuid } from 'uuid';

// Style
import './ComboListRaw.css';

function Alert(props) {
	return <MuiAlert elevation={6} variant='filled' {...props} />;
}

export class ComboListRaw extends Component {
	static get propTypes() {
		return {
			list : PropTypes.string
		};
	}

	static defaultProps = {
		list : `username:password
				username2:password
				username3:p@assw04d`
	};

	constructor(props) {
		super(props);

		this.state = {
			alertOpen : false,
			error     : false,
			message   : ''
		};

		this.handleCopy = this.handleCopy.bind(this);
	}

	handleCopy(evt) {
		evt.preventDefault();
		if (document.queryCommandSupported('copy')) {
			copy(this.props.list);
			this.setState({
				alertOpen : true,
				error     : false,
				message   : 'Copied to clipboard!'
			});
		} else {
			this.setState({
				alertOpen : true,
				error     : true,
				message   : 'Copy operation is not supported on this browser...'
			});
		}
	}

	render() {
		const lines = this.props.list.split('\n');

		return (
			<div className='ComboListRaw'>
				<Grid container className='ComboList-Container'>
					<p ref={(listArea) => (this.listArea = listArea)}>
						{lines.map((line) => <div key={uuid()}>{line}</div>)}
					</p>
					<Button onClick={this.handleCopy}>
						<FileCopyIcon />
					</Button>
				</Grid>
				<Snackbar
					open={this.state.alertOpen}
					autoHideDuration={6000}
					onClose={() => this.setState({ alertOpen: false })}
				>
					<Alert
						onClose={() => this.setState({ alertOpen: false })}
						severity={this.state.error ? 'error' : 'success'}
					>
						{this.state.message}
					</Alert>
				</Snackbar>
			</div>
		);
	}
}

export default ComboListRaw;
