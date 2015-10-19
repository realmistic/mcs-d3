var LIMIT = 20;

var exeptions = [
  /^сво((и[хм])|(его)|(ей)|й)$/,
  /^сказа((ть)|(л)|(ли))$/,
  /^которы*/, 'после',
  /^мож((ет)|(но))/, 'некоторые',
  'когда', 'между', 'более', 'однако',
  'только', 'нибудь', 'конечно',
  'перед', 'такой', 'среди', 'через', 'наших',
  'всякий', 'теперь',
  'чтобы', 'какой', 'тогда', 'долго',
  'здесь', 'больше', 'будет', 'именно',
  'также', 'этого', 'пусть', 'вдруг'
];

var equals = [
  {reg: /^самолет*/, to: 'самолет'},
  {reg: /^врем[яе]*/, to: 'время'},
  {reg: /^хребт*/, to: 'хребты'},
  {reg: /^старц*/, to: 'старцы'},
  {reg: /^земл*/, to: 'земля'},
  {reg: /^голов*/, to: 'голова'},
  {reg: /^((страх*)|(ужас*))/, to: 'страх'},
  {reg: /^безуми*/, to: 'безумие'}
];

$.ajax({
  method: 'GET',
  url: 'lovecraft.txt',
  dataType: 'text',
  success: draw,
  error: alert
});

var getCount = prop('count');
var getWord = prop('word');

var MARGINS = {
  top: 20,
  right: 20,
  bottom: 30,
  left: 40
};

var SIZES = {
  bar: 50,
  width: 1024 - MARGINS.left - MARGINS.right,
  height: 500 - MARGINS.top - MARGINS.bottom
};

/* Шкалы */
var x = d3.scale.ordinal();
var y = d3.scale.linear()
    .range([SIZES.height, 0]);

/* Оси */
var xAxis = d3.svg.axis()
    .orient('bottom');

var yAxis = d3.svg.axis()
    .scale(y)
    .orient('left')
    .ticks(5);

var chart = d3.select('svg')
    .attr('height', SIZES.height + MARGINS.top + MARGINS.bottom);

var histogram = chart
  .append('g')
    .attr('transform', 'translate(' + MARGINS.left + ',' + MARGINS.top + ')');

function draw(text) {
  var data = parse(text);

  chart.attr('width', SIZES.bar * data.length + MARGINS.left + MARGINS.right);

  x.rangeRoundBands([0, SIZES.bar * data.length], 0.1);
  xAxis.scale(x);

  x.domain(data.map(getWord));
  y.domain([0, d3.max(data, getCount)]);

  var xAxisElement = histogram.append('g')
    .attr('class', 'axis xAxis')
    .attr('transform', 'translate(0,' + SIZES.height + ')')
    .call(xAxis);

  var yAxisElement = histogram.append('g')
    .attr('class', 'axis yAxis')
    .attr('transform', 'translate(-6, 0)')
    .call(yAxis)
  .append('text')
    .attr('transform', 'rotate(-90)')
    .attr('y', 6)
    .attr('dy', '.56em')
    .style('text-anchor', 'end')
    .text('Количество сочетаний');

  var bars = histogram.selectAll('.bar')
    .data(data)
  .enter().append('rect')
    .attr('class', 'bar')
    .attr('x', function (d) { return x(d.word); })
    .attr('width', x.rangeBand())
    .attr('y', function (d) { return y(d.count); })
    .attr('height', function (d) { return SIZES.height - y(d.count); });
}