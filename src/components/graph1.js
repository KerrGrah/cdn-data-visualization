//TODO Add text to max lines
import React, {Component} from 'react';
import {Line} from 'react-chartjs-2';
import {getArrOfMax, timeConverter} from '../utilFunctions';
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

  const data = {
      labels: date,
      datasets: [
        {
          //...dataConfig,
          label: 'maxP2P',
          data: getArrOfMax(p2p),//Array.apply(null, new Array(p2p.length)).map(Number.prototype.valueOf, maxCDN ),
          fill: false,
          radius: 0,
          pointHoverRadius: 0,
          pointHoverBorderWidth: 0,
          pointRadius: 0,
          pointHitRadius: 0,
          borderColor: "rgba(207,4,28, 0.8)",
          borderWidth: 0.5,
          borderDash: [6, 4],
        }, {
          //...dataConfig,
          label: 'maxCDN',
          data: getArrOfMax(cdn),
          fill: false,
          radius: 0,
          pointHoverRadius: 0,
          pointHoverBorderWidth: 0,
          pointRadius: 0,
          pointHitRadius: 0,
          borderColor: "rgba(69,135,65, 1)",
          borderWidth: 0.5,
          borderDash: [10, 4],
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
        <Line height={this.props.height/ 2 - 100} data={data} options={graph1options}/>
      </div>
    </div>)
  }
}
