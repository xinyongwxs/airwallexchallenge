import React from "react";
import "./Popup.less";

class Popup extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	componentDidMount() {

	}

	componentWillMount() {

	}

	componentWillUpdate() {

	}

	render() {
		return (<div className={this.props.isHide ? "modal modal-hide" : "modal modal-show"} onClick={this.props.shadowClickHandler ? this.props.shadowClickHandler.bind(this) : () => {}}>
				<div className="modal-content" onClick={(e) => {
					e.stopPropagation();
				}}>
					{this.props.content}
				</div>
			</div>);
	}
}

export default Popup;