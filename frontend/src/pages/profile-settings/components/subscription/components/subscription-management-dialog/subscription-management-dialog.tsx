import { Button, Icon } from '#libs/components/components.js';
import { AppRoute, IconColor } from '#libs/enums/enums.js';
import { useAppDispatch, useCallback } from '#libs/hooks/hooks.js';
import { actions as appActions } from '#slices/app/app.js';

import { PLAN_BENEFITS } from '../../libs/constants.js';
import styles from './styles.module.scss';

const dialogStyles = {
  sectionTitle: styles['section-title'],
};

const SubscriptionManagementDialog: React.FC = () => {
  const dispatch = useAppDispatch();

  const handleSubscribe = useCallback(() => {
    dispatch(appActions.navigate(AppRoute.PROFILE_SUBSCRIPTION_CHECKOUT));
  }, [dispatch]);

  return (
    <div className={styles['subscription-management']}>
      <h3 className={styles['heading']}>Subscription Management</h3>
      <div className={styles['content']}>
        <div>
          <p className={dialogStyles.sectionTitle}>Current Subscription Plan</p>
          <p className={styles['subscription-name']}>Pro Monthly</p>
          <div className={styles['meta-wrapper']}>
            <div>
              <p className={dialogStyles.sectionTitle}>Plan renews on</p>
              <p className={styles['meta']}>30 Sept 2023</p>
            </div>
            <div>
              <p className={dialogStyles.sectionTitle}>Payment</p>
              <p className={styles['meta']}>$7.5 / month</p>
            </div>
          </div>
        </div>
        <div>
          <p className={dialogStyles.sectionTitle}>Plan benefits</p>
          <ul className={styles['benefits']}>
            {PLAN_BENEFITS.map((benefit) => {
              return (
                <li key={benefit} className={styles['benefit']}>
                  <Icon
                    name="check"
                    width={12}
                    height={9}
                    color={IconColor.BLUE}
                  />
                  {benefit}
                </li>
              );
            })}
          </ul>
        </div>
        <div>
          <Button
            type="button"
            label="Subscribe"
            style="primary"
            styleColor="blue"
            onClick={handleSubscribe}
          />
        </div>
      </div>
    </div>
  );
};
export { SubscriptionManagementDialog };
