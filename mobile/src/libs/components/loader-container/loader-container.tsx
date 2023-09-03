import React from 'react';

import { DataStatus } from '#libs/enums/enums';
import { useAppSelector, useEffect, useState } from '#libs/hooks/hooks';

import { Loader } from '../components';

const LoaderContainer: React.FC = () => {
  const [isLoaderVisible, setIsLoaderVisible] = useState(false);

  const { authenticatedUserDataStatus, surveyPreferencesDataStatus } =
    useAppSelector(({ auth }) => ({
      authenticatedUserDataStatus: auth.authenticatedUserDataStatus,
      surveyPreferencesDataStatus: auth.surveyPreferencesDataStatus,
    }));

  useEffect(() => {
    if (
      authenticatedUserDataStatus === DataStatus.IDLE ||
      authenticatedUserDataStatus === DataStatus.PENDING ||
      surveyPreferencesDataStatus === DataStatus.PENDING
    ) {
      setIsLoaderVisible(true);
    } else {
      setIsLoaderVisible(false);
    }
  }, [authenticatedUserDataStatus, surveyPreferencesDataStatus]);

  return <Loader isVisible={isLoaderVisible} />;
};

export { LoaderContainer };
