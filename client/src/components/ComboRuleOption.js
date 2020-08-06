import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Grid, Checkbox } from '@material-ui/core'

// Style
import './ComboRuleOption.css'

export class ComboRuleOption extends Component {
	static get propTypes() {
		return {
			name      : PropTypes.string,
			label     : PropTypes.string,
			checked   : PropTypes.bool,
			disabled  : PropTypes.bool,
			onChecked : PropTypes.func
		}
	}

	static defaultProps = {
		name      : 'name',
		label     : 'check this name',
		checked   : false,
		disabled  : false,
		onChecked : () => console.log('Checkbox checked!')
	}

	constructor(props) {
		super(props)
		this.handleChecked = this.handleChecked.bind(this)
	}

	handleChecked(evt) {
		this.props.onChecked(evt)
	}

	render() {
		return (
			<Grid className='ComboRuleOption-Buttons' container>
				<Grid className='ComboRules-Labels' item xs={8}>
					<p>{this.props.label}</p>
				</Grid>
				<Grid className='ComboRules-Buttons' item xs={4}>
					<Checkbox
						disabled={this.props.disabled}
						name={this.props.name}
						checked={this.props.checked}
						color='secondary'
						onChange={this.handleChecked}
					/>
				</Grid>
			</Grid>
		)
	}
}

export default ComboRuleOption
