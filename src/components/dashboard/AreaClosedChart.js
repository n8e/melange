import React from 'react';
import PropTypes from 'prop-types';
import { Group } from '@vx/group';
import { AreaClosed } from '@vx/shape';
import { AxisBottom, AxisLeft } from '@vx/axis';

const AreaClosedChart = ({ data, width, height, yMax, margin, xStock, yStock, xScale, yScale }) => (
  <svg width={width} height={height}>
    {data.map((d, i) => (
      <Group key={`area-${i}`}>
        <AreaClosed
          data={data}
          xScale={xScale}
          yScale={yScale}
          x={xStock}
          y={yStock}
          strokeWidth={2}
          stroke={'#ee0441'}
          fill={'#fc9433'}
        />
        <AxisBottom
          scale={xScale}
          top={yMax + margin.top}
          left={margin.left - 60}
          axisClassName="axis-class"
          labelClassName="axis-label-class"
          tickClassName="tick-label-class"
          label="Date"
          stroke="#333333"
          tickStroke="#333333"
        />
        <AxisLeft
          scale={yScale}
          top={margin.top}
          left={margin.left}
          label="Close"
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
    ))}
  </svg>
  );

AreaClosedChart.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      date: PropTypes.string,
      close: PropTypes.number,
    }),
  ).isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  yMax: PropTypes.number.isRequired,
  margin: PropTypes.shape({
    top: PropTypes.number,
    bottom: PropTypes.number,
    left: PropTypes.number,
    right: PropTypes.number,
  }).isRequired,
  xStock: PropTypes.func.isRequired,
  yStock: PropTypes.func.isRequired,
  xScale: PropTypes.func.isRequired,
  yScale: PropTypes.func.isRequired,
};

export default AreaClosedChart;
