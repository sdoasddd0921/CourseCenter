import React from 'react';
import ReactDOM from 'react-dom';

var ajax=require('./post_ajax.js');

class Test extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (<div>test</div>);
  }
}



var BluMUI_M = {
  test: Test
}

var BluMUI = {
  result: {},
  menues:[],
  menue_names:{},
  create: function (data, type, elem) {
    var props = data, Blu = BluMUI_M[type];
    this.result[props.id] = ReactDOM.render(<Blu {...props}/>, elem);    
  }
};


export default BluMUI;