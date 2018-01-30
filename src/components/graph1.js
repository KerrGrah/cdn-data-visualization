//TODO MAX and MIN  horizontal lines currently not working consistently, so color is set to opaque
import React, {Component} from 'react';
import {Line} from 'react-chartjs-2';
import {timeConverter} from '../utilFunctions';
import {dataConfig, graph1options} from './graphConfig';

export default class Graph1 extends Component {

  // reduces data to match view range
  sliceData(arr) {
    return arr.slice(this.props.viewRange[0], this.props.viewRange[1])
  }

    // prevents loading before footer has determined view range of data
  shouldComponentUpdate(nextProps) {
    return !!nextProps.viewRange.length
  }

  render() {
    // console.log(this.props);
   if (!this.props.capacity || !this.props.capacity.data.cdn.length) {
      return ""
    }
    const cdn = [];
    const p2p = [];
    const time = []
    const date = [];
    // CDN data

    this.sliceData(this.props.capacity.data.cdn).forEach(cell => {
      cdn.push(cell[1])

      const [timeVal, dateVal] = timeConverter(cell[0])
      time.push(timeVal)
      date.push(dateVal)
    })

     // P2P data
    this.sliceData(this.props.capacity.data.p2p).forEach(cell => {
      p2p.push(cell[1])
    })

    const maxCDN = this.props.capacity.max ? this.props.capacity.max.cdn / 1000 / 1000 / 1000  : null;
    const maxP2P =  this.props.capacity.max ? this.props.capacity.max.p2p / 1000 / 1000 / 1000 : null;
    const data = {
      labels: date,
      datasets: [
        {
          data: Array.apply(null, new Array(p2p.length)).map(Number.prototype.valueOf, maxCDN ),
          fill: false,
          radius: 0,
          pointHoverRadius: 0,
          pointHoverBorderWidth: 0,
          pointRadius: 0,
          pointHitRadius: 0,
          borderColor: "rgba(0,200,0,0.0)"
        }, {
          data: Array.apply(null, new Array(p2p.length)).map(Number.prototype.valueOf, maxP2P),
          fill: false,
          radius: 0,
          pointHoverRadius: 0,
          pointHoverBorderWidth: 0,
          pointRadius: 0,
          pointHitRadius: 0,
          borderColor: "rgba(0,200,0,0.0)"
        }, {
          ...dataConfig,
          label: 'cdn',
          data: cdn,
          backgroundColor: 'rgba(255, 99, 132, 0.5)',
          borderColor: 'rgba(255,99,132,1)'
        }, {
          ...dataConfig,
          label: 'p2p',
          data: p2p,
          pointBorderColor: ['rgba(75,192,192,1)'],
          pointHoverBackgroundColor: 'rgba(75,192,192,1)',
          pointHoverBorderColor: 'rgba(75,192,192,1)',
          backgroundColor: ['rgba(75, 192, 192, 0.5)'],
          borderColor: ['rgba(75, 192, 192, 0.9'],
          borderWidth: 1
        }, {
          data: time
        }
      ]
    }
    //console.log(this.props);
    return (
    <div className="graph-container">
      <h3>CAPACITY OFFLOAD</h3>
      <div className="graph-bandwidth-container" >
        <Line  height={this.props.height/ 2 - 100} data={data} options={graph1options}/>
      </div>
    </div>)
  }
}
