import PropTypes from 'prop-types';
import React from 'react';
import cn from 'classnames';
import message from './utils/messages';
import { navigate } from './utils/constants';

class Toolbar extends React.Component {
  static propTypes = {
    view: PropTypes.string.isRequired,
    views: PropTypes.arrayOf(
      PropTypes.string,
    ).isRequired,
    label: PropTypes.node.isRequired,
    messages: PropTypes.object,
    onNavigate: PropTypes.func.isRequired,
    onViewChange: PropTypes.func.isRequired,
  }

  render() {
    let { messages, label } = this.props;

    messages = message(messages)

    return (
      <div className='rbc-toolbar'>

      <span className="rbc-btn-group">
        <button
          type='button'
          onClick={this.navigate.bind(null, navigate.TODAY)}
        >
          {messages.today}
        </button>
          <button type='button' onClick={this.navigate.bind(null, navigate.PREVIOUS)}>
            <i className="fa fa-angle-left" aria-hidden="true"></i>
          </button>
          <button type='button' onClick={this.navigate.bind(null, navigate.NEXT)}>
              <i className="fa fa-angle-right" aria-hidden="true"></i>
          </button>
      </span>
      <span className='rbc-toolbar-label'>
        { label }
      </span>
        {/*<span className='rbc-btn-group todaybtn'>*/}
        <span className='rbc-btn-group'>

        {
          this.viewNamesGroup(messages)
        }
        </span>

      </div>
    );
  }

  navigate = (action) => {
    this.props.onNavigate(action)
  }

  view = (view) => {
    this.props.onViewChange(view)
  }

  viewNamesGroup(messages) {
    let viewNames = this.props.views
    const view = this.props.view
    let width = window.innerWidth
                || document.documentElement.clientWidth
                || document.body.clientWidth;

    let viewType = (width < 768) ? 'agenda' : 'month';

    if (viewNames.length > 1) {

      if (viewType === 'agenda') {
        viewNames = ['agenda'];
      }
      return (
        viewNames.map(name =>
          <button type='button' key={name}
            className={cn({'rbc-active': view === name})}
            id={view}
            onClick={this.view.bind(null, name)}
          >
            {messages[name]}
          </button>
        )
      )
    }
  }
}

export default Toolbar;
