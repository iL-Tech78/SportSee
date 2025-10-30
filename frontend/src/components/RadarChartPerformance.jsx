import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer } from 'recharts';
import PropTypes from 'prop-types';
import '../styles/RadarChart.css';

function RadarChartPerformance({ data }) {
  return (
    <div className="radar-chart">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart outerRadius="65%" data={data}>
          <PolarGrid radialLines={false} />
          <PolarAngleAxis
            dataKey="subject"
            tick={{ fill: '#fff', fontSize: 12 }}
          />
          <Radar dataKey="value" fill="#FF0101B2" fillOpacity={0.6} />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}

RadarChartPerformance.propTypes = {
  data: PropTypes.array.isRequired,
};

export default RadarChartPerformance;
