import Paper from 'material-ui/Paper'
import React, { Component, PropTypes } from 'react'
import '../../../../style/display/display.scss'
import { Line } from 'react-chartjs-2'
import DisplayAreaHOC from '../../hoc/DisplayAreaHOC'

export class StatisticsArea extends Component {
    prepareData() {
        const { list } = this.props
        const yVal = []
        const datesToValMap = {}
        const today = new Date().toISOString().substring(0, 10)
        list.map(obj => {
            const date = obj.date.substring(0, 10) // Get date only

            if (date > today) {
                return null
            }
            if (datesToValMap[date]) {
                datesToValMap[date]++
            } else {
                datesToValMap[date] = 1
            }
        })

        if (!datesToValMap[today]) {
            // add datapoint for now
            datesToValMap[today] = 0
        }

        const dates = Object.keys(datesToValMap).sort()
        dates.map((date, index) => (yVal[index] = datesToValMap[date]))

        return {
            labels: dates,
            datasets: [
                {
                    data: yVal,
                    lineTension: 0,
                    fill: false,
                    backgroundColor: 'rgb(25, 118, 210)',
                    borderColor: 'rgba(25,118,210,0.77)',
                },
            ],
        }
    }

    render() {
        const data = this.prepareData.bind(this)()
        const { namespace } = this.props
        const opts = {
            title: {
                display: true,
                text: '# of Edits in '.concat(namespace),
            },
            legend: {
                display: false,
            },
            scales: {
                yAxes: [
                    {
                        ticks: {
                            beginAtZero: true,
                            stepSize: 1,
                        },
                    },
                ],
                xAxes: [
                    {
                        type: 'time',
                        time: {
                            unit: 'day',
                            round: 'day',
                        },
                    },
                ],
            },
        }

        return (
            <Paper className={'fff-display-area'}>
                <div style={{ width: '90%', margin: '0 auto 0 auto' }}>
                    <Line redraw data={data} options={opts} />
                </div>
            </Paper>
        )
    }
}
StatisticsArea.propTypes = {
    list: PropTypes.array,
    namespace: PropTypes.string,
}

export default DisplayAreaHOC(StatisticsArea)
