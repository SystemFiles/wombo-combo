import React, { Component } from 'react';
import { Zoom } from '@material-ui/core';

export class ComboRules extends Component {
	render() {
		return (
			<Zoom in style={{ transitionDelay: '50ms' }}>
				<div className='ComboRules'>
					<p>Rules</p>
				</div>
			</Zoom>
		);
	}
}

export default ComboRules;
