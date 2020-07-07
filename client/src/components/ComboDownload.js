import React, { Component } from 'react';
import { Button } from '@material-ui/core';

// Style
import './ComboDownload.css';

export class ComboDownload extends Component {
	render() {
		return (
			<div className='ComboDownload'>
				<Button>Download List (*.txt)</Button>
			</div>
		);
	}
}

export default ComboDownload;
