import useAuth from '../../hooks/useAuth';
import { useTranslation } from 'react-i18next';
import { Heading2 } from '../../theme/appElements';
import DistributionByRolePerRank from './Charts/DistributionByRolePerRank';
import ProductionTime from './Charts/ProductionTime';
import ProductionCost from './Charts/ProductionCost';
import DistributionPerRank from './Charts/DistributionPerRank';
import DIstributionByVenueType from './Charts/DIstributionByVenueType';
import MultiRangeSlider from '../../components/MultiRangeSlider';

const Statistics = () => {
  const { t } = useTranslation();
  const { auth } = useAuth();

  const contributions = auth.contributions;
  const submissions = contributions.flatMap((c) => c.submissions);

  return (
    <>
      <MultiRangeSlider min={0} max={25} onChange={() => console.log('change')} />
      <Heading2>{t('statistics.statistics')}</Heading2>
      <DistributionByRolePerRank contributions={contributions} />
      <ProductionTime contributions={contributions}></ProductionTime>
      <ProductionCost contributions={contributions}></ProductionCost>
      <DistributionPerRank contributions={contributions} />
      <DIstributionByVenueType contributions={contributions} />
      <ProductionTime contributions={contributions} />
    </>
  );
};

export default Statistics;
