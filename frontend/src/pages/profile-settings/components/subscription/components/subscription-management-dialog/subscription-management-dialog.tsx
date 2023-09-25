import { useCallback } from 'react';

import { Button, Icon } from '#libs/components/components.js';
import { AppRoute, IconColor } from '#libs/enums/enums.js';
import { useAppDispatch } from '#libs/hooks/hooks.js';
import { actions as appActions } from '#slices/app/app.js';

import { PLAN_BENEFITS } from '../../libs/constants.js';
import styles from './styles.module.scss';

const dialogStyles = {
  subscriptionManagement: styles['subscription-management'],
  heading: styles['heading'],
  benefits: styles['benefits'],
  benefit: styles['benefit'],
  content: styles['content'],
  sectionTitle: styles['section-title'],
  subscriptionName: styles['subscription-name'],
  metaWrapper: styles['meta-wrapper'],
  meta: styles['meta'],
};

const SubscriptionManagementDialog: React.FC = () => {
  const dispatch = useAppDispatch();

  const handleSubscribe = useCallback(() => {
    dispatch(appActions.navigate(AppRoute.PROFILE_SUBSCRIPTION_CHECKOUT));
  }, [dispatch]);

  return (
    <div className={dialogStyles.subscriptionManagement}>
      <h3 className={dialogStyles.heading}>Subscription Management</h3>
      <div className={dialogStyles.content}>
        <div>
          <p className={dialogStyles.sectionTitle}>Current Subscription Plan</p>
          <p className={dialogStyles.subscriptionName}>Pro Monthly</p>
          <div className={dialogStyles.metaWrapper}>
            <div>
              <p className={dialogStyles.sectionTitle}>Plan renews on</p>
              <p className={dialogStyles.meta}>30 Sept 2023</p>
            </div>
            <div>
              <p className={dialogStyles.sectionTitle}>Payment</p>
              <p className={dialogStyles.meta}>$7.5 / month</p>
            </div>
          </div>
        </div>
        <div>
          <p className={dialogStyles.sectionTitle}>Plan benefits</p>
          <ul className={dialogStyles.benefits}>
            {PLAN_BENEFITS.map((benefit) => {
              return (
                <li key={benefit} className={dialogStyles.benefit}>
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
            style="primary-blue"
            onClick={handleSubscribe}
          />
        </div>
      </div>
    </div>
  );
};
export { SubscriptionManagementDialog };
