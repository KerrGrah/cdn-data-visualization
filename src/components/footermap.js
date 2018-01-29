import React, {Component} from 'react';
import {Line} from 'react-chartjs-2';
import {footerMapOptions} from './graphConfig'

export default class FooterMap extends Component {

  render() {

    const audience = [];
    const time = []

    this.props.data.data.audience.forEach(cell => {
      audience.push(cell[1])
      time.push(new Date(cell[0]))
    })

    const data = {
      labels: time,
      datasets: [
        {
          data: audience,
          backgroundColor: ['rgba(178, 18, 92, 0.4)'],
          borderColor: ['rgba(178, 18, 92, 0.8)'],
          borderWidth: 1
        }
      ]
    }

    return (<Line data={data} options={footerMapOptions}/>)
  }
}
