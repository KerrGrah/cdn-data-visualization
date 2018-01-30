//TODO currently doesn't handle window resize events

import React, {Component} from 'react';
import FooterMap from './footermap'
import Rnd from 'react-rnd';

export default class Footer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      sliderMaxWidth: 0,
      width: 0,
      height: 66,
      x: 0
    }
  }

  componentDidMount() {
    const container = document.getElementsByClassName('view-footer-container')[0]

    // set slider view range on mount depending on screen size
    const width =  window.innerWidth / 6
    this.setState(()=> ({sliderMaxWidth: container.offsetWidth -7, width: width,x: window.innerWidth/2 - width }), ()=> {
      this.viewRangeChange()
    })
  }

   viewRangeChange  = () => {
     const fullRange = this.state.sliderMaxWidth;
     const start = this.state.x;
     const stop = this.state.x + this.state.width;
     this.props.viewRangeChange(start / fullRange,  stop / fullRange)
  }

  handleDrag = (e, d) => {
    this.setState(() => ({
      x: this.controlBound(d.x)
    }), ()=> {
      this.viewRangeChange()
    })
  }

  handleResizeStop = (e, direction, ref, delta, position) => {
    this.viewRangeChange()
  }

  handleResize =  (e, direction, ref, delta, d) => {
      this.setState(() => ({
      width: ref.offsetWidth,
      x: this.controlBound(d.x)
    })
  );
  }
  // somewhat covers up bug in rnd library not limiting right bound
  controlBound(x) {
    return  x + this.state.width > this.state.sliderMaxWidth  ?
    this.state.sliderMaxWidth - this.state.width : x;
  }

  render() {
    //console.log(this.props);
    if (!this.props.audience.data.audience) {
      return ""
    }


    return (
      <div className='view-footer-container'>
        <Rnd
      size={{ width: this.state.width,  height: this.state.height }}
      position={{y: -12, x: this.state.x}}
      onDragStop={this.handleDrag}
      onResizeStop={this.viewRangeChange}
      onResize={this.handleResize}
      style={{backgroundColor:'rgba(69,135,65, 0.1)', borderStyle: 'solid', borderWidth: '3px', borderColor: 'rgba(69,135,65, 0.8)', borderRadius: '6px' }}
      minWidth={10}
      maxWidth={'100%'}
      z={999}
      enableResizing={{ top:false, right:true, bottom:false, left:true, topRight:false, bottomRight:false, bottomLeft:false, topLeft:false }}
      dragAxis={'x'}
      bounds={'.view-footer-container'}  / >
        <FooterMap currentUserId={this.props.currentUserId} data={this.props.audience} />
      </div>
    )
  }
}
