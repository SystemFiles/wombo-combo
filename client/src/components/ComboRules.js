import React, { Component } from 'react';
import { Button, Zoom } from '@material-ui/core';
import PropTypes from 'prop-types';
import ComboRuleOption from './ComboRuleOption';

// Styles
import './ComboRules.css';

export class ComboRules extends Component {
	static get propTypes() {
		return {
			handleConfirm : PropTypes.func
		};
	}

	static defaultProps = {
		handleConfirm : () => console.log('Confirmed selection')
	};

	constructor(props) {
		super(props);

		this.state = {
			commonReplacements : false,
			autoCorrect        : false
		};

		this.handleCheck = this.handleCheck.bind(this);
		this.handleConfirm = this.handleConfirm.bind(this);
	}

	handleConfirm(evt) {
		evt.preventDefault();
		this.props.handleConfirm(this.state);
	}

	handleCheck(evt) {
		this.setState({
			[evt.target.name]: evt.target.checked
		});
	}

	render() {
		return (
			<Zoom in style={{ transitionDelay: '50ms' }}>
				<div>
					<div className='ComboRules'>
						<ComboRuleOption
							label='Common Replacements (E=3, A=4)'
							name='commonReplacements'
							checked={this.state.commonReplacements}
							onChecked={this.handleCheck}
						/>
						<ComboRuleOption
							label='Auto-correct checks (wordpass -> password)'
							name='autoCorrect'
							checked={this.state.autoCorrect}
							onChecked={this.handleCheck}
						/>
					</div>
					<div className='ComboRules-Confirm'>
						<Button onClick={this.handleConfirm}>Confirm Rule Selection</Button>
					</div>
				</div>
			</Zoom>
		);
	}
}

export default ComboRules;
