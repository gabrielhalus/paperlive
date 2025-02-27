import React, { useEffect, useState } from 'react';
import useAuth from '../../hooks/useAuth';

import useAxiosPrivate from '../../hooks/useAxiosPrivate';

import { Container, Group, LabelInfos } from './sidebarProfileElements';
import { Button, Heading1, Link, Label } from '../../theme/appElements';
import {
  HiOutlineLink,
  HiOutlineLockClosed,
  HiOutlineLockOpen,
  HiOutlineMapPin,
  HiOutlineNewspaper,
} from 'react-icons/hi2';
import Avatar from '../Avatar';
import Input from '../Input';
import TextArea from '../TextArea';
import { useTranslation } from 'react-i18next';
import RadioGroup from '../RadioGroup';
import { toast } from 'react-toastify';

const SidebarProfile = () => {
  const { t } = useTranslation();

  const { auth, setAuth } = useAuth();
  const axiosPrivate = useAxiosPrivate();

  const [isEditing, setIsEditing] = useState(false);

  const [profilData, setProfilData] = useState();

  const notify = () => {
    toast.success(t('toast.profileUpdatedSuccess'), {
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

  useEffect(() => {
    setProfilData(auth);
  }, [auth]);

  async function handleSaveChanges() {
    setIsEditing(false);

    if (profilData !== auth) {
      await axiosPrivate.put('/teams/update', profilData);
      setAuth((prev) => ({ ...prev, ...profilData }));
      notify();
    }
  }

  function handleCancelChanges() {
    setIsEditing(false);
    setProfilData(auth);
  }

  return (
    <Container>
      {!isEditing ? (
        <>
          <Avatar />
          <Heading1>{auth.name?.toUpperCase()}</Heading1>
          <Button secondary onClick={() => setIsEditing(true)}>
            {t('sideBar.edit')}
          </Button>
          <Group>
            <Label>
              {auth.visibility ? <HiOutlineLockOpen /> : <HiOutlineLockClosed />}
              {t('sideBar.visibility')}
              <span>{auth.visibility ? t('sideBar.public') : t('sideBar.private')}</span>
            </Label>
            <Label>
              <HiOutlineNewspaper /> <span>{auth.contributions?.length}</span>{' '}
              {t('global.contributions')}
            </Label>
          </Group>
          <Group>
            {auth.location && (
              <LabelInfos>
                <HiOutlineMapPin /> {auth.location}
              </LabelInfos>
            )}
            {auth.website && (
              <LabelInfos>
                <HiOutlineLink />
                <Link targer='_blank' to={`//${auth.website.split('//').pop()}`} target='_blank'>
                  {auth.website}
                </Link>
              </LabelInfos>
            )}
          </Group>
        </>
      ) : (
        <>
          <Avatar />
          <Heading1>{auth.name?.toUpperCase()}</Heading1>
          <RadioGroup
            name='visibility'
            label={t('sideBar.visibility')}
            template={{
              radios: [
                {
                  label: t('sideBar.private'),
                  value: false,
                  defaultChecked: profilData.visibility === false,
                },
                {
                  label: t('sideBar.public'),
                  value: true,
                  defaultChecked: profilData.visibility === true,
                },
              ],
            }}
            onChange={(event) => {
              setProfilData((prev) => ({ ...prev, visibility: JSON.parse(event.target.value) }));
            }}
          />
          <TextArea
            id='description'
            label={t('sideBar.description')}
            maxLength='240'
            autoComplete='off'
            small
            value={profilData.description}
            onChange={(e) => {
              const newProfilData = { ...profilData, description: e.target.value };
              setProfilData(newProfilData);
            }}
          />
          <Input
            id='location'
            label={t('sideBar.location')}
            autoComplete='off'
            small
            value={profilData.location}
            onChange={(e) => {
              const newProfilData = { ...profilData, location: e.target.value };
              setProfilData(newProfilData);
            }}
          />
          <Input
            id='website'
            label={t('sideBar.webSite')}
            autoComplete='off'
            small
            value={profilData.website}
            onChange={(e) => {
              const newProfilData = { ...profilData, website: e.target.value };
              setProfilData(newProfilData);
            }}
          />
          <Group inline>
            <Button secondary onClick={handleCancelChanges} style={{ width: '100%' }}>
              {t('global.cancel')}
            </Button>
            <Button secondary onClick={handleSaveChanges} style={{ width: '100%' }}>
              {t('global.save')}
            </Button>
          </Group>
        </>
      )}
    </Container>
  );
};

export default SidebarProfile;
