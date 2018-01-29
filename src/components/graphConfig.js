export const graph1options = {

  legend: {
    display: false
  },
  scales: {
    xAxes: [
      {
        ticks: {
          // limits x axis labels depending on amount of data points
          callback: (label, index, labelsArray) => {
            const count = labelsArray.length < 361
              ? 24
              : labelsArray.length < 721
                ? 48
                : 72
            if (index % count === 0)
              return label
            else
              return null
          },
          autoSkip: false
        }
      }
    ]
  },
  tooltips: {
    mode: 'index',
    //  intersect: false,
    titleMarginBottom: 10,
    bodySpacing: 10,
    footerMarginTop: 10,
    xPadding: 10,
    yPadding: 10,
    backgroundColor: "rgba(255,255,255,0.9)",
    titleFontColor: '#222',
    bodyFontColor: '#222',
    footerFontColor: '#222',
    callbacks: {
      title: function(tooltipItems, data) {
        // gives tooltip detailed time as title
        return data.datasets[4].data[tooltipItems[0].index]
      },
      label: function(tooltipItem, data) {
        const label = tooltipItem.datasetIndex === 2
          ? ' HTTP: '
          : tooltipItem.datasetIndex === 3
            ? ' P2P: '
            : ""
        if (!label)
          return
        return label + tooltipItem.yLabel.toFixed(3) + ' Gbps';
      },
      footer: function(tooltipItem, data) {

        tooltipItem[0].index
        return "total: " + (data.datasets[2].data[tooltipItem[0].index] + data.datasets[3].data[tooltipItem[0].index]).toFixed(2)
      }
    }
  },
  maintainAspectRatio: true
}

export const graph2options = {
  legend: {
    display: false
  },
  scales: {
    xAxes: [
      {
        ticks: {
          // limits x axis labels depending on amount of data points
          callback: function(label, index, labelsArray) {
            const count = labelsArray.length < 361
              ? 24
              : labelsArray.length < 721
                ? 48
                : 72
            if (index % count === 0)
              return label
            else
              return null
          },
          autoSkip: false
        }
      }
    ]
  },
  tooltips: {
    //  intersect: false,
    titleMarginBottom: 10,
    bodySpacing: 10,
    footerMarginTop: 10,
    xPadding: 10,
    yPadding: 10,
    backgroundColor: "rgba(255,255,255,0.9)",
    titleFontColor: '#222',
    titleFontColor: '#222',
    bodyFontColor: '#222',
    footerFontColor: '#222'
  }
}

export const dataConfig = {
  fill: true,
  lineTension: 0.1,
  backgroundColor: 'rgba(75,192,192,0.7)',
  borderColor: 'rgba(75,192,192,1)',
  borderCapStyle: 'butt',
  borderDash: [],
  borderDashOffset: 0.0,
  borderJoinStyle: 'miter',
  pointBorderWidth: 1,
  pointHoverRadius: 5,
  pointHoverBorderWidth: 2,
  //  pointBackgroundColor: '#fff',
  pointRadius: 2,
  pointHitRadius: 10
}