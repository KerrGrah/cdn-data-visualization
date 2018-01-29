import React, {Component} from 'react';
import FooterMap from './footermap'
import Rnd from 'react-rnd';

export default class Footer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      sliderMaxWidth: 0,
      width: 180,
      height: 66,
      x: 100,
      y: 100
    }
  }
componentDidUpdate(prevProps) {
    if (prevProps.currentUserId !== this.props.currentUserId)
  this.viewRangeChange()
  }

  componentDidMount() {
    const container = document.getElementsByClassName('view-footer-container')[0]
  //  console.log(container.offsetWidth);
    // set slider view range on mount depending on screen size
    const width =  window.innerWidth / 6
    this.setState(()=> ({sliderMaxWidth: container.offsetWidth -7, width: width,x: window.innerWidth/2 - width }), ()=> {
      this.viewRangeChange()
    })
  }

   viewRangeChange  = () => {
     const fullRange = this.state.sliderMaxWidth // window.innerWidth //- 16;
     const start = this.state.x;
     const stop = this.state.x + this.state.width;
  //   console.log("full range :", fullRange);
  //   console.log("slider width :", this.state.width);
  //   console.log(start / fullRange, stop / fullRange);
     this.props.viewRangeChange(start / fullRange,  stop/ fullRange)
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
    const S = this.state
    return  x + S.width > S.sliderMaxWidth  ?
    S.sliderMaxWidth - S.width : x;
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
      style={{backgroundColor:'rgba(0,200,0,0.3)', borderStyle: 'solid', borderWidth: '3px', borderColor: 'rgba(0,200,0,0.5)', borderRadius: '6px' }}
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
