import React from 'react';

import { Link, SignBackground, Text } from '#libs/components/components';
import { RootScreenName } from '#libs/enums/enums';

// import {
//   useAppDispatch,
//   useAppSelector,
//   useCallback,
// } from '#libs/hooks/hooks';
// import { actions as authActions } from '#slices/auth/auth';
import { PreferencesStep } from './components/components';
import { styles } from './styles';

const Survey: React.FC = () => {
  // const dispatch = useAppDispatch();
  // const { userId /*isSurveyCompleted*/ } = useAppSelector(({ auth }) => ({
  //   userId: auth.authenticatedUser?.id,
  //   // isSurveyCompleted: auth.authenticatedUser?.isSurveyCompleted,
  // }));

  // const onSubmit = useCallback(
  //   (options: string[]) => {
  //     void dispatch(
  //       authActions.createUserSurveyPreferences({
  //         userId: userId as number,
  //         preferences: options,
  //       }),
  //     );
  //   },
  //   [dispatch, userId],
  // );

  // if (isSurveyCompleted) {
  //   return <Navigate to={AppRoute.ROOT} />;
  // }

  return (
    <React.Fragment>
      <SignBackground>
        <Text style={styles.labelText}>
          <Link label="Sign In" to={`/${RootScreenName.SIGN_IN}`} />
        </Text>
        <PreferencesStep />
        {/* <PreferencesStep onSubmit={onSubmit}/> */}
      </SignBackground>
    </React.Fragment>
  );
};

export { Survey };
