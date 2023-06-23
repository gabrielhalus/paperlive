import React, { useState } from 'react';
import { BarChart, Bar, CartesianGrid, Tooltip, XAxis, YAxis, Label } from 'recharts';
import { Heading3, InlineGroup, SectionContainer } from '../../../theme/appElements';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import Select from '../../../components/Select';

const ProductionCostChart = ({ contributions }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [filter, setFilter] = useState(null);

  const stats = Object.entries(
    contributions
      .filter(
        (c) =>
          c.state === 'approved' &&
          (!filter?.start || filter.start <= new Date(c.startDate).getFullYear()) &&
          (!filter?.end || filter.end >= new Date(c.startDate).getFullYear())
      )
      .reduce((acc, c) => {
        c.submissions
          .filter(
            (s) =>
              (!filter?.type || filter.type === s.venue.type) &&
              (!filter?.rank || filter.rank === s.venue.rank)
          )
          .flatMap((s) => {
            const { _id: id, title } = c;
            const { materialCost, authors } = s;

            acc[id] = {
              title,
              cost:
                (acc[id]?.cost ?? 0) +
                authors.reduce(
                  (acc, curr) => (acc += curr.hourlyCost * curr.workTime * 21.67 * 7),
                  0
                ),
            };
          });
        return acc;
      }, {})
  )
    .map(([id, data]) => ({ id, ...data }))
    .sort((a, b) => b.cost - a.cost)
    .filter((c) => c.cost !== 0);

  const submissionsVenuesRank = contributions
    .flatMap((c) => c.submissions)
    .reduce((acc, s) => {
      const { rank } = s.venue;
      if (!acc.includes(rank)) acc.push(rank);
      return acc;
    }, []);

  const contributionsMinYear = contributions.reduce((min, c, i) => {
    const year = new Date(c.startDate).getFullYear();
    if (i === 0) min = year;
    else if (min > year) min = year;

    return min;
  }, -1);

  const contributionsMaxYear = contributions.reduce((max, c, i) => {
    const year = new Date(c.startDate).getFullYear();
    if (i === 0) max = year;
    else if (max < year) max = year;

    return max;
  }, -1);

  return (
    <SectionContainer>
      <Heading3>{t('statistics.data3.title')}</Heading3>

      <InlineGroup>
        <Select
          label={t('statistics.parameters.venueType')}
          onChange={(e) => setFilter((filter) => ({ ...filter, type: e.target.value }))}>
          <option value=''>-</option>
          <option value='conference'>{t('statistics.parameters.conference')}</option>
          <option value='journal'>{t('statistics.parameters.journal')}</option>
        </Select>

        <Select
          label={t('statistics.parameters.venueRank')}
          onChange={(e) => setFilter((filter) => ({ ...filter, rank: e.target.value }))}>
          <option value=''>-</option>
          {submissionsVenuesRank.map((rank) => (
            <option value={rank}>{rank}</option>
          ))}
        </Select>

        <Select
          label={t('statistics.parameters.begin')}
          onChange={(e) => setFilter((filter) => ({ ...filter, start: e.target.value }))}>
          <option value=''>-</option>
          {Array.from({ length: contributionsMaxYear - contributionsMinYear + 1 }, (_, i) => (
            <option
              key={contributionsMinYear + i}
              value={contributionsMinYear + i}
              disabled={filter?.end && contributionsMinYear + i >= filter?.end}>
              {contributionsMinYear + i}
            </option>
          ))}
        </Select>

        <Select
          label={t('statistics.parameters.end')}
          onChange={(e) => setFilter((filter) => ({ ...filter, end: e.target.value }))}>
          <option value=''>-</option>
          {Array.from({ length: contributionsMaxYear - contributionsMinYear + 1 }, (_, i) => (
            <option
              key={contributionsMinYear + i}
              value={contributionsMinYear + i}
              disabled={filter?.start && contributionsMinYear + i <= filter?.start}>
              {contributionsMinYear + i}
            </option>
          ))}
        </Select>
      </InlineGroup>

      <BarChart width={752} height={500} margin={{ top: 15 }} data={stats}>
        <CartesianGrid strokeDasharray='3 3' />
        <Tooltip cursor={{ fill: 'transparent' }} />

        <XAxis dataKey='title' tick={null} />

        <YAxis dataKey='cost' tick={{ fontSize: 12 }}>
          <Label
            position='insideLeft'
            value={t('statistics.data3.label')}
            angle={-90}
            fontSize={12}
            // textAnchor='middle'
          />
        </YAxis>

        <Bar
          dataKey='cost'
          name={t('statistics.data3.bar')}
          formatter={(value) => `${Math.round(value)} ${t('statistics.euros')}`}
          fill='var(--data-visualisation-positive)'
          cursor='pointer'
          onClick={(data) => navigate(`/contributions/${data.id}`)}
        />
      </BarChart>
    </SectionContainer>
  );
};

export default ProductionCostChart;
