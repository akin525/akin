var options = {
  chart: {
    height: 232,
    type: 'donut',
  },
  labels: ['New', 'Resolved', 'Pending'],
  series: [60000, 45000, 15000],
  legend: {
    position: 'bottom',
  },
  dataLabels: {
    enabled: false
  },
  stroke: {
    width: 2,
    colors: ['#ffffff'],
  },
  colors: ['#17995e', '#de3e3e', '#4e4949'],
  tooltip: {
    y: {
      formatter: function(val) {
        return  "$" + val
      }
    }
  },
}
var chart = new ApexCharts(
  document.querySelector("#tickets"),
  options
);
chart.render();