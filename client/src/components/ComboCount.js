// Shows number of combos were generated...
import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Style
import './ComboCount.css';

export class ComboCount extends Component {
	static get propTypes() {
		return {
			count : PropTypes.number
		};
	}

	static defaultProps = {
		count : 0
	};

	render() {
		return (
			<div className='ComboCount'>
				<div className='Combo-Number'>{this.props.count}</div>
				|
				<p className='Combo-Label'>Generated Combos</p>
			</div>
		);
	}
}

export default ComboCount;
