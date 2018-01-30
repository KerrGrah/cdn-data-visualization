import React, {Component} from 'react';
import {Line} from 'react-chartjs-2';
import {timeConverter} from '../utilFunctions';
import {dataConfig, graph2options} from './graphConfig';

export default class Graph2 extends Component {


  // prevents loading before footer has determined view range of data
 shouldComponentUpdate(nextProps) {
   return !!nextProps.viewRange.length
  }

  // reduces data to match view range
  sliceData(arr) {
    return arr.slice(this.props.viewRange[0], this.props.viewRange[1])
  }

  render() {
      // console.log(this.props);
    if (!this.props.audience) {
      return ""
    }
    const audience = [];
    const time = []
    const date = [];
    
    this.sliceData(this.props.audience.data.audience).forEach(cell => {
      audience.push(cell[1])
      const [timeVal, dateVal] = timeConverter(cell[0])
      time.push(timeVal)
      date.push(dateVal)
    })

  //  console.log(capacity);
    const data = {
        labels: date,
        datasets: [{
            ...dataConfig,
            label: 'Audience ',
            data: audience,
            backgroundColor: [
                'rgba(230, 95, 0, 0.0)'
            ],
            borderColor: [
                'rgba(230, 95, 0, 0.9)'
            ],
            pointBorderColor: ['rgba(230, 95, 0, 0.9)'],
            pointHoverBackgroundColor:'rgba(230, 95, 0, 0.9)',
            pointHoverBorderColor: 'rgba(230, 95, 0, 0.9)',
            borderWidth: 3
        }, {
          data: time
        }
      ]
    }

    return (
      <div className="graph-audience-container" >
        <h3>CONCURRENT VIEWERS</h3>
        <Line height={this.props.height/ 2 - 100}
          data={data} options={graph2options} />
    </div>
    )
  }
}
