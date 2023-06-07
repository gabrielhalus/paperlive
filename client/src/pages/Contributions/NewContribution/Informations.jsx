import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { LineWrapper } from '../contributionsElements';
import { Button, SectionContainer } from '../../../theme/appElements';
import Input from '../../../components/Input';
import RadioGroup from '../../../components/RadioGroup';
import Selector from '../../../components/Selector';
import useAuth from '../../../hooks/useAuth';

const Informations = ({ data, setData }) => {
  const { t } = useTranslation();
  const { auth } = useAuth();
  const navigate = useNavigate();

  return (
    <SectionContainer>
      <Input
        small
        type='text'
        id='title'
        label={t('contribution.title')}
        value={data.title}
        onChange={(e) => {
          const updatedData = { ...data, title: e.target.value };
          setData(updatedData);
        }}
      />
      <Input
        small
        type='text'
        id='scientificField'
        label={t('contribution.scientificField')}
        value={data.scientificField}
        onChange={(e) => {
          const updatedData = { ...data, scientificField: e.target.value };
          setData(updatedData);
        }}
      />
      <Input
        small
        type='date'
        id='startDate'
        label={t('contribution.startDate')}
        value={data.startDate}
        onChange={(e) => {
          const updatedData = { ...data, startDate: e.target.value };
          setData(updatedData);
        }}
      />
      <RadioGroup
        name='teamRole'
        label={t('contribution.teamRole')}
        template={{
          radios: [
            {
              label: t('contribution.leader'),
              value: 'leader',
              defaultChecked: data.teamRole === 'leader',
            },
            {
              label: t('contribution.coLeader'),
              value: 'coLeader',
              defaultChecked: data.teamRole === 'coLeader',
            },
            {
              label: t('contribution.guest'),
              value: 'guest',
              defaultChecked: data.teamRole === 'guest',
            },
          ],
        }}
        onChange={(e) => {
          const updatedData = { ...data, teamRole: e.target.value };
          setData(updatedData);
        }}
      />
      <Selector
        list={auth.contributions}
        selected={data.relatedContributions}
        displayedAttribute='title'
        label='related'
        onChange={(selected) => {
          const updatedData = { ...data, relatedContributions: selected };
          setData(updatedData);
        }}
      />
      <LineWrapper>
        <Button type='neutral' onClick={() => navigate('/')}>
          {t('global.cancel')}
        </Button>

        <Button onClick={() => navigate('../files')}>{t('global.next')}</Button>
      </LineWrapper>
    </SectionContainer>
  );
};

export default Informations;
