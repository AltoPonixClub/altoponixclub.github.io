import { Component, OnInit, Input } from '@angular/core';
import { Chart } from 'angular-highcharts';

interface StatTimeStamp {
  [key: string]: number;
}

interface StatisticGraph {
  value: number | null
  history: StatTimeStamp
}

@Component({
  selector: 'app-graph',
  templateUrl: './app-graph.component.html',
  styleUrls: ['./app-graph.component.css']
})
export class AppGraphComponent implements OnInit {

  @Input() data: StatisticGraph = {value: null, history: {}};
  missing: boolean = true
  chart: Chart = new Chart({
    chart: {
      type: 'line',
      backgroundColor: "#f2f2f2",
      borderRadius: 4,
      borderWidth: 1,
      borderColor: "#cccccc",
      spacing: [20, 20, 20, 20]
    },
    credits: {
      enabled: false
    },
    title: {
      text: ""
    },
  });

  constructor() { }

  ngOnInit(): void {
    if (this.data.history != null) {
      let n: number[][] = []
      for (let k in this.data.history) {
        n.push([parseInt(k), this.data.history[k]])
      }
      if (n.length == 0)
        return;
      this.missing = false
      this.chart = new Chart({
        chart: {
          type: 'line',
          backgroundColor: "#f2f2f2",
          borderRadius: 4,
          borderWidth: 1,
          borderColor: "#cccccc",
          spacing: [20, 20, 20, 20]
        },
        credits: {
          enabled: false
        },
        xAxis: {
          type: 'datetime',
          tickInterval: 600*1000,
          labels: {
            formatter: function () {
              let date = new Date(this.value)
              let hh = date.getHours()
              let mm = date.getMinutes()
              return (hh>9 ? '' : '0') + hh + ":" + (mm>9 ? '' : '0') + mm
            }
          }
        },
        yAxis: {
          title: {
            text: ""
          }
        },
        title: {
          text: ""
        },
        time: {
          getTimezoneOffset: function (timestamp) {
            return new Date().getTimezoneOffset()
          }
        },
        series: [{
          type: 'line',
          data: n,
          animation: {
            defer: 0,
            duration: 0,
          },
          label: {
            enabled: false
          },
          name: "",
          showInLegend: false,
        }]
      });
    }
  }

}
