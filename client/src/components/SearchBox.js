import React, { PropTypes } from 'react';


const KeyCode = {
	ESC: 27,
};


const styles = {  // TODO extract inline styles
	img: {
		float: 'left',
		margin: '8px 16px 0 0',
	},
	input: {
		paddingLeft: '152px',
		height: '64px',
	},
};


class SearchBox extends React.Component {

	constructor(props) {
		super(props);
		this.state = { q: '' };

		this.update = this.update.bind(this);
		this.reset = this.reset.bind(this);
	}

  componentDidMount() {
    document.addEventListener('keydown', this.onKeyPress.bind(this));
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.onKeyPress.bind(this));
  }

  /**
   * update state and dispatch search action
   */
	update(e) {
		const q = e.target.value;
		this.setState({ q: q });
		this.props.search(q);
	}

	/**
	 * reset state and dispatch empty search action
	 */
	reset() {
		this.setState({ q: '' });
		this.props.search('');
	}

	/**
	 * Escape key clears search input and remove focus
	 */
	onKeyPress({ keyCode }) {
		const active = document.activeElement;
		const input = this._input;

		if (keyCode === KeyCode.ESC && (input === active || this.state.q)) {
				input.blur();
				this.reset();
				return false;
		}
	}

	render() {
		return (
			<div className="input-field">

				<input
					id="search"
					type="search"
					style={ styles.input }
					value={ this.state.q }
					tabIndex="0"
					ref={ (ref) => this._input = ref }
					onChange={ this.update }
					autoComplete="off"
				/>

				<label htmlFor="search">
					<img src="/static/img/logo.png" style={ styles.img }/>
					<i className="material-icons">search</i>
				</label>

				<i
					className="material-icons"
					onClick={ this.reset }
				>close</i>

			</div>
		);
	}

}

SearchBox.propTypes = {
	search: PropTypes.func.isRequired,
};

export default SearchBox;