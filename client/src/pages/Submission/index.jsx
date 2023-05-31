import { useParams } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import {
  InfoContainer,
  Label,
  LineWrapper,
  SectionContainer,
  Value,
  Link,
} from './submissionElements';
import { Heading2 } from '../../theme/appElements';
import { useTranslation } from 'react-i18next';
import Table from '../../components/Table';
import {
  HiOutlineClock,
  HiOutlineUser,
  HiOutlineCurrencyDollar,
  HiOutlineAcademicCap,
} from 'react-icons/hi2';

const Submission = () => {
  const { t, i18n } = useTranslation();
  const { id } = useParams();
  const { auth } = useAuth();

  const submission = auth.contributions
    .find((c) => c.submissions?.find((c) => c._id === id))
    .submissions.find((c) => c._id === id);

  const handleDownload = async (e) => {
    //faire
  };

  return (
    <>
      <SectionContainer>
        <Heading2>{t('submission.informations')}</Heading2>
        <InfoContainer>
          <Label>{t('submission.title')}</Label>
          <Value>{submission.title}</Value>
        </InfoContainer>
        <InfoContainer>
          <Label>{t('submission.date')}</Label>
          <Value>
            {new Intl.DateTimeFormat(i18n.language, {
              day: '2-digit',
              month: '2-digit',
              year: 'numeric',
            }).format(new Date(submission.date ?? 0)) || '-'}
          </Value>
        </InfoContainer>
        <LineWrapper>
          <InfoContainer>
            <Label>{t('submission.type')}</Label>
            <Value>{submission.type || '-'}</Value>
          </InfoContainer>
          <InfoContainer>
            <Label>{t('submission.state')}</Label>
            <Value>{submission.state || '-'}</Value>
          </InfoContainer>
        </LineWrapper>

        <InfoContainer>
          <Label>{t('submission.venue')}</Label>
          <Value>{submission.venue || '-'}</Value>
        </InfoContainer>
      </SectionContainer>
      <SectionContainer>
        <Heading2>{t('submission.files')}</Heading2>
        <InfoContainer>
          <Label>{t('submission.abstract')}</Label>
          <Value>
            <Link onClick={handleDownload}>{t('global.download')}</Link>
          </Value>
        </InfoContainer>
        <InfoContainer>
          <Label>{t('submission.zipFolder')}</Label>
          <Value>
            <Link onClick={handleDownload}>{t('global.download')}</Link>
          </Value>
        </InfoContainer>
        <InfoContainer>
          <Label>{t('submission.compiledPDF')}</Label>
          <Value>
            <Link onClick={handleDownload}>{t('global.download')}</Link>
          </Value>
        </InfoContainer>
        <InfoContainer>
          <Label>{t('submission.diffPDF')}</Label>
          <Value>
            <Link onClick={handleDownload}>{t('global.download')}</Link>
          </Value>
        </InfoContainer>
        <InfoContainer>
          <Label>{t('submission.commentsPDF')}</Label>
          <Value>
            <Link onClick={handleDownload}>{t('global.download')}</Link>
          </Value>
        </InfoContainer>
      </SectionContainer>
      <SectionContainer>
        <Heading2>{t('submission.authors')}</Heading2>
        <Table
          name='authors'
          list={submission.authors}
          searchAttr='name'
          defaultSort={{ attr: 'workTime', direction: 'desc' }}
          fields={[
            {
              name: 'name',
              label: 'Name',
              icon: <HiOutlineUser />,
              operator: (value) => value,
            },
            {
              name: 'workTime',
              label: 'workTime',
              icon: <HiOutlineClock />,
              operator: (value) => value,
            },
            {
              name: 'hourlyCost',
              label: 'hourlyCost',
              icon: <HiOutlineCurrencyDollar />,
              operator: (value) => value,
            },
            {
              name: 'isMainAuthor',
              label: 'Main author',
              icon: <HiOutlineAcademicCap />,
              operator: (value) => value,
            },
          ]}
        />
      </SectionContainer>
    </>
  );
};

export default Submission;
