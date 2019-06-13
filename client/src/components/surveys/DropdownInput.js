import React, { Component } from 'react'

export default class DropdownInput extends Component {

  renderDropdownItems() {

    if(this.props.items) {
        return this.props.items.map((value, key) => {
          return <button className="dropdown__content-item" key={key} type="button" onClick={value.fn}>{value.text}</button>
      });
    }
    return ;
  }

 
  render() { 

    const { placeholder} = this.props;
  
    return (
      <div className="dropdown">

        <div className="dropdown__content">
          {this.renderDropdownItems()}
        </div>
        <div className="dropdown__btn dropdown__grey">
          {placeholder}
        </div>

      </div>
    )
  }
}

