import React from 'react';
import PropTypes from 'prop-types';
import { Group } from '@vx/group';
import { Bar } from '@vx/shape';
import { AxisBottom, AxisLeft } from '@vx/axis';

const BarChart = ({ data, width, height, yMax, yPoint, xPoint, xScale, yScale, margin }) => (
  <svg width={width} height={height}>
    {data.map((d, i) => {
      const barHeight = yMax - yPoint(d);
      return (
        <Group key={`bar-${i}`}>
          <Bar
            x={xPoint(d)}
            y={yMax - barHeight}
            height={barHeight}
            width={xScale.bandwidth()}
            fill="#0d3c55"
            stroke={'black'}
            strokeWidth={1}
          />
          <AxisBottom
            scale={xScale}
            top={yMax + margin.top}
            left={margin.left - 60}
            axisClassName="axis-class"
            labelClassName="axis-label-class"
            tickClassName="tick-label-class"
            label="Letter"
            stroke="#333333"
            tickStroke="#333333"
          />
          <AxisLeft
            scale={yScale}
            top={margin.top}
            left={margin.left}
            label="Frequency"
            labelProps={{ fontSize: 12, fill: 'black' }}
            tickFormat={(value, index) => `$${value}`}
            tickProps={(value, index) => ({
              dx: '0.33em',
              fill: 'black',
              fontSize: 10,
              opacity: index % 2 === 0 ? 0.5 : 0.9,
            })}
          />
        </Group>
      );
    })}
  </svg>
  );

BarChart.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      frequency: PropTypes.number,
      letter: PropTypes.string,
    }),
  ).isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  yMax: PropTypes.number.isRequired,
  yPoint: PropTypes.func.isRequired,
  xPoint: PropTypes.func.isRequired,
  xScale: PropTypes.func.isRequired,
  yScale: PropTypes.func.isRequired,
  margin: PropTypes.shape({
    top: PropTypes.number,
    bottom: PropTypes.number,
    left: PropTypes.number,
    right: PropTypes.number,
  }).isRequired,
};

export default BarChart;
