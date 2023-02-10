const height = 600;
const width = 600;
const margin = 30;

const rawData = [{
        x: 10,
        y: 67
    }, {
        x: 20,
        y: 74
    }, {
        x: 30,
        y: 63
    },
    {
        x: 40,
        y: 56
    }, {
        x: 50,
        y: 24
    }, {
        x: 60,
        y: 26
    },
    {
        x: 70,
        y: 19
    }, {
        x: 80,
        y: 42
    }, {
        x: 90,
        y: 88
    }
]
const data = [];

const svg = d3.select('body').append('svg')
    .attr('class', 'axis')
    .attr('width', width)
    .attr('height', height);

const xAxisLength = width - 2 * margin;
const yAxisLength = height - 2 * margin;

const xScale = d3.scaleLinear()
    .domain([0, 100])
    .range([0, xAxisLength]);
const yScale = d3.scaleLinear()
    .domain([100, 0])
    .range([0, yAxisLength]);

//scale real data
for (i = 0; i < rawData.length; i++)
    data.push({
        x: xScale(rawData[i].x) + margin,
        y: yScale(rawData[i].y) + margin
    });

const xAxis = d3.axisBottom(xScale);

const yAxis = d3.axisLeft(yScale);

svg.append('g')
    .attr("class", "x-axis")
    .attr("transform", // сдвиг оси вниз и вправо
        "translate(" + margin + "," + (height - margin) + ")")
    .call(xAxis);

svg.append('g')
    .attr("class", "y-axis")
    .attr("transform", // сдвиг оси вниз и вправо на margin
        "translate(" + margin + "," + margin + ")")
    .call(yAxis)

// создаем набор вертикальных линий для сетки 
d3.selectAll('g.x-axis g.tick')
    .append('line')
    .classed('grid-line', true)
    .attr('x1', 0)
    .attr('y1', 0)
    .attr('x2', 0)
    .attr('y2', -(yAxisLength));

// рисуем горизонтальные линии координатной сетки
d3.selectAll('g.y-axis g.tick')
    .append('line')
    .classed('grid-line', true)
    .attr('x1', 0)
    .attr('y1', 0)
    .attr('x2', xAxisLength)
    .attr('y2', 0)

// функция, создающая по массиву точек линии
d3.select("#curve").append("svg").attr("width", width).attr("height", height)

let line = d3.line()

    .x(d => d.x)
    .y(d => d.y);

let area = d3.area()
    .x(d => d.x)
    .y0(height - margin)
    .y1(d => d.y)

svg.append('g').append('path')
    .attr('d', line(data))
    .style('stroke', 'steelblue')
    .style('stroke-width', 2);

svg.append('path')
    .attr('d', area(data))
    .style('fill', 'lightblue')

// добавляем заголовок

svg.append('text')
    .attr('x', (width / 2))
    .attr('y', margin - 10)
    .attr('text-anchor', 'middle')
    .style('font-size', '22px')
    .text('Value Graph');

svg.append('text')
    .attr('x', margin + 11)
    .attr('y', margin - 11)
    .attr('text-anchor', 'end')
    .style('font-size', '11px')
    .text("Axis Y");

svg.append('text')
    .attr('x', width - margin + 11)
    .attr('y', height - margin - 5)
    .attr('text-anchor', 'end')
    .style('font-size', '11px')
    .text("Axis X");

// добавляем отметки к точкам
svg.selectAll('.dot')
    .data(rawData)
    .enter().append('circle')
    .attr('class', 'dot')
    .attr('r', 3.5)
    .attr('cx', (d) => xScale(d.x) + margin)
    .attr('cy', (d) => yScale(d.y) + margin)