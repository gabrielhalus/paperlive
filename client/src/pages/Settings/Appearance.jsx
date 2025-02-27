import React, { useContext } from 'react';
import { Heading2, SectionContainer } from '../../theme/appElements';
import { AccentContext } from '../../App';
import { toast } from 'react-toastify';
import RadioGroup from '../../components/RadioGroup';
import { useTranslation } from 'react-i18next';

const AppearanceSettings = () => {
  const { t } = useTranslation();
  const { accentColor, handleAccentColorChange } = useContext(AccentContext);

  const notify = () => {
    toast.success(t('toast.accentChangeSucess'), {
      position: 'bottom-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'colored',
    });
  };

  const changeAccentColor = (e) => {
    handleAccentColorChange(e.target.value);
    notify();
  };

  return (
    <SectionContainer>
      <Heading2 style={{ borderBottom: `1px solid var(--black-quaternary)` }}>
        {t('settings.pages.appearance')}
      </Heading2>

      <RadioGroup
        name='accent'
        label={t('settings.accessibility.accentColor')}
        template={{
          radios: [
            {
              label: t('settings.accessibility.munsellBlue'),
              value: '55, 136, 161',
              defaultChecked: accentColor === '55, 136, 161',
            },
            {
              label: t('settings.accessibility.persianRed'),
              value: '195, 66, 63',
              defaultChecked: accentColor === '195, 66, 63',
            },
            {
              label: t('settings.accessibility.periwinkle'),
              value: '173, 138, 249',
              defaultChecked: accentColor === '173, 138, 249',
            },
            {
              label: t('settings.accessibility.keppel'),
              value: '28, 196, 168',
              defaultChecked: accentColor === '28, 196, 168',
            },
          ],
        }}
        onChange={changeAccentColor}
      />
    </SectionContainer>
  );
};

export default AppearanceSettings;
