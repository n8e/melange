import React from 'react';
import PropTypes from 'prop-types';
import { extent, max } from 'd3-array';
import { scaleTime, scaleLinear, scaleBand } from '@vx/scale';
import BarChart from './BarChart';
import AreaClosedChart from './AreaClosedChart';

const Dashboard = ({ letterFrequencyData, appleStockData }) => {
  // We'll use some mock data from `@vx/mock-data` through redux for this.
  const letterData = letterFrequencyData.letterFrequency;
  const stockData = appleStockData.appleStock;

  // Define the graph dimensions and margins
  const width = 1000;
  const height = 500;
  const margin = { top: 0, bottom: 40, left: 60, right: 40 };

  // Then we'll create some bounds
  const xMax = width - margin.left - margin.right;
  const yMax = height - margin.top - margin.bottom;

  // We'll make some helpers to get at the letterData we want
  const x = d => d.letter;
  const y = d => +d.frequency * 100;

  // And then scale the graph by our letterData
  const xScale = scaleBand({
    rangeRound: [40, xMax],
    domain: letterData.map(x),
    padding: 0.4,
  });
  const yScale = scaleLinear({
    rangeRound: [yMax, 0],
    domain: [0, Math.max(...letterData.map(y))],
  });

  // Compose together the scale and accessor functions to get point functions
  const compose = (scale, accessor) => datum => scale(accessor(datum));
  const xPoint = compose(xScale, x);
  const yPoint = compose(yScale, y);

  /*
  * AreaClosed dimensions
  */
  const xStock = d => new Date(d.date);
  const yStock = d => d.close;

  const appleXScale = scaleTime({
    range: [60, width],
    domain: extent(stockData, xStock),
  });
  const appleYScale = scaleLinear({
    range: [height - 40, 0],
    domain: [0, max(stockData, yStock)],
    nice: true,
  });

  return (
    <div>
      <h3 style={{ textAlign: 'center' }}>DASHBOARD</h3>
      <div style={{ border: '1px solid #000', margin: '10%' }}>
        <h4 style={{ textAlign: 'center' }}>Bar Graph of Letter Frequency Data (Frequency/Letter)</h4>
        <BarChart
          data={letterData}
          width={width}
          height={height}
          yMax={yMax}
          yPoint={yPoint}
          xPoint={xPoint}
          xScale={xScale}
          yScale={yScale}
          margin={margin}
        />
      </div>
      <div style={{ border: '1px solid #000', margin: '10%' }}>
        <h4 style={{ textAlign: 'center' }}>Area Closed Graph of Apple Stock Data (Close/Date)</h4>
        <AreaClosedChart
          data={stockData}
          width={width}
          height={height}
          yMax={yMax}
          xScale={appleXScale}
          yScale={appleYScale}
          xStock={xStock}
          yStock={yStock}
          margin={margin}
        />
      </div>
    </div>
  );
};

Dashboard.propTypes = {
  appleStockData: PropTypes.shape({
    appleStock: PropTypes.arrayOf(
      PropTypes.shape({
        date: PropTypes.string,
        close: PropTypes.number,
      }),
    ),
  }).isRequired,
  letterFrequencyData: PropTypes.shape({
    letterFrequency: PropTypes.arrayOf(
      PropTypes.shape({
        frequency: PropTypes.number,
        letter: PropTypes.string,
      }),
    ).isRequired,
  }).isRequired,
};

export default Dashboard;
