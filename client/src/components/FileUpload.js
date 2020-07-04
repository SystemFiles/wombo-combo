import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Grid, Button, TextField } from '@material-ui/core';

// Styles
import './FileUpload.css';

export class FileUpload extends Component {
	static get propTypes() {
		return {
			uploadText  : PropTypes.string,
			placeholder : PropTypes.string,
			color       : PropTypes.string,
			type        : PropTypes.string,
			onUpload    : PropTypes.func
		};
	}

	static defaultProps = {
		uploadText  : 'Upload',
		placeholder : 'Upload a file',
		color       : 'primary',
		type        : 'username',
		onUpload    : (file) => {
			console.log(file);
		}
	};

	constructor(props) {
		super(props);
		this.state = {
			file : {}
		};

		this.onChangeFile = this.onChangeFile.bind(this);
	}

	onChangeFile(evt) {
		evt.stopPropagation();
		evt.preventDefault();
		var file = evt.target.files[0];

		console.log(file);

		// Pass this file up to parent...
		this.props.onUpload(file, evt.target.name);

		// Set state for ui
		this.setState({ file });
	}

	render() {
		return (
			<div className='FileUpload'>
				<input
					id='fileInput'
					name={this.props.type}
					type='file'
					required='yes'
					ref={(ref) => (this.handleUpload = ref)}
					style={{ display: 'none' }}
					onChange={this.onChangeFile.bind(this)}
					accept='.txt'
				/>
				<Grid container>
					<Grid container item xs={12}>
						<Grid item xs={8}>
							<TextField
								disabled={true}
								style={{ width: '90%' }}
								placeholder={this.props.placeholder}
								value={this.state.file.name}
								onClick={() => {
									this.handleUpload.click();
								}}
							/>
						</Grid>
						<Grid item xs={4}>
							<Button
								onClick={() => {
									this.handleUpload.click();
								}}
								variant='outlined'
								color={this.props.color}
							>
								{this.props.uploadText}
							</Button>
						</Grid>
					</Grid>
				</Grid>
			</div>
		);
	}
}

export default FileUpload;
