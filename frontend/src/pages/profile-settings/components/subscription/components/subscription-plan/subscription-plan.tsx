import { Button, Icon } from '#libs/components/components.js';
import { AppRoute, IconColor } from '#libs/enums/enums.js';
import { useAppDispatch, useCallback } from '#libs/hooks/hooks.js';
import { actions as appActions } from '#slices/app/app.js';

import styles from './styles.module.scss';

type Properties = {
  subscriptionPrice: number;
  benefits: string[];
};

const SubscriptionPlan: React.FC<Properties> = ({
  benefits,
  subscriptionPrice,
}) => {
  const dispatch = useAppDispatch();

  const handleSubscribe = useCallback(() => {
    dispatch(appActions.navigate(AppRoute.PROFILE_SUBSCRIPTION_CHECKOUT));
  }, [dispatch]);

  return (
    <article className={styles['plan']}>
      <h3 className={styles['heading']}>Monthly</h3>
      <p className={styles['price-wrapper']}>
        <span className={styles['price']}>${subscriptionPrice}</span> / month
      </p>
      <div className={styles['benefits-section']}>
        <span className={styles['section-title']}>Plan benefits</span>
        <ul className={styles['benefits']}>
          {benefits.map((benefit) => {
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
      <Button
        type="button"
        label="Subscribe"
        style="primary"
        styleColor="blue"
        onClick={handleSubscribe}
      />
    </article>
  );
};
export { SubscriptionPlan };
