import React from 'react'
import { Line } from 'react-chartjs-2'
import { connect } from 'react-redux'
import axios from 'axios'

const companies = {
  'AAPL': 'Apple',
  'MSFT': 'Microsoft',
  'JPM': 'JP Morgan Chase & Co. Common Stock ',
  'GS': 'Goldman Sachs'
}

export class LineChart extends React.Component {
  constructor() {
    super()
    this.state = {
      data: null,
      stockDetails: null,
      dataset: null,
      labels: [],
      startDate: new Date(),
      endDate: new Date()
    }
  }
  handleChangeStart = () => {
    this.setState({ startDate: event.target.value })
    const startMonth = this.state.startDate.getMonth()
    const startYear = this.state.startDate.getFullYear();
    const endMonth = this.state.startDate.getMonth();
    const endYear = this.state.startDate.getFullYear();
    let dataset = this.state.data['Monthly Adjusted Time Series'];
    let labels = [];
    let dataset2 = []
    for (let key in dataset) {
      let date = key.split('-')
      console.log(date)
      if ((date[0] <= startYear))
        labels.push(key)
      dataset2.push(dataset[key]['5. adjusted close'])
    }
    console.log(labels)
  }
  handleChangeEnd = () => {

    this.setState({ endDate: event.target.value })
  }
  async componentDidMount() {
    const company = this.props.history.location.pathname.slice(1);
    const key = '3QA09RAU9MSS2DPJ'
    const stock = await axios.get(`https://www.alphavantage.co/query?function=TIME_SERIES_MONTHLY_ADJUSTED&symbol=${company}&apikey=${key}&datatype=json`)
    let dataset = stock.data['Monthly Adjusted Time Series'];
    let stockDetails = stock.data['Meta Data']
    let labels = [];
    let dataset2 = []
    for (let key in dataset) {
      labels.push(key)
      dataset2.push(dataset[key]['5. adjusted close'])
    }
    labels = labels.filter((el, index) => index <= 20)
    dataset2 = dataset2.filter((el, index) => index <= 20)
    this.setState({
      data: stock.data, dataset: dataset2, stockDetails, labels,
      startDate: new Date(labels[0]), endDate: new Date(labels[9])
    })
  }
  render() {

    if (this.state.data === null) return <div>Loading...</div>
    const data = {
      labels: this.state.labels,
      datasets: [
        {
          label: 'IHS Markit',
          fill: false,
          lineTension: 0.1,
          backgroundColor: 'rgba(75,192,192,0.4)',
          borderColor: 'rgba(75,192,192,1)',
          borderCapStyle: 'butt',
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: 'miter',
          pointBorderColor: 'rgba(75,192,192,1)',
          pointBackgroundColor: '#fff',
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: 'rgba(75,192,192,1)',
          pointHoverBorderColor: 'rgba(220,220,220,1)',
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 10,
          data: this.state.dataset
        },

      ]
    };
    const company = this.props.history.location.pathname.slice(1);
    console.log('data incoming here->', this.state)
    return (
      <div style={{
        marginTop: '100px',
        width: '60%',

      }}>
        <h2>{companies[company]}</h2>
        <div style={{
          display: 'flex',

          justifyContent: 'center',

        }}>
          <input
            value={this.state.startDate}
            onChange={this.handleChangeStart}
            type='date'

          />

          <input
            value={this.state.endDate}
            onChange={this.handleChangeEnd}
            type='date'



          />
        </div>
        <Line ref="chart" data={data} />
      </div>
    );
  }


}

const mapStateToProps = state => ({

})

export default connect(mapStateToProps, null)(LineChart)
