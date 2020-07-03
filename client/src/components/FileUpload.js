import React, { Component } from 'react';
import { Grid } from '@material-ui/core';

export class FileUpload extends Component {
	render() {
		return (
			<div className='FileUpload'>
				<Grid container>
					<Grid item xs={6}>
						<p>Upload #1</p>
					</Grid>
					<Grid item xs={6}>
						<p>Upload #2</p>
					</Grid>
				</Grid>
			</div>
		);
	}
}

export default FileUpload;
