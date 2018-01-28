import React, {Component} from 'react';
import {Line} from 'react-chartjs-2';

const audience = [];
const time = []

export default class FooterMap extends Component {

shouldComponentUpdate(nextProps) {
    return nextProps.currentUserId !== this.props.currentUserId
}
  render() {
    this.props.data.data.audience.forEach(cell => {
      audience.push(cell[1])
      time.push(new Date(cell[0]))
    })

return (
<Line data={data} options={options}/>
)
}
}


const data = {
  labels: time,
  datasets: [
    {
      label: 'cdn',
      data: audience,
      backgroundColor: [
        'rgba(178, 18, 92, 0.4)',
      ],
      borderColor: [
        'rgba(178, 18, 92, 0.8)',
      ],
      borderWidth: 1
    }
  ]
}
const options = {
  elements: {
    point: {
      radius: 0,
      hitRadius: 0,
      hoverRadius: 0
    }
  },
  legend: {
    display: false
  },
  scales: {
    xAxes: [
      {
        display: false,
        callbacks: {beforeUpdate: function() {return false}
        }
}
    ],
    yAxes: [
      {
          display: false
      }
    ]
  },
  tooltips: {
    mode: false
  },
  maintainAspectRatio: false
}
