import { Icon } from '~/libs/components/components.js';
import { IconColor, TimeFormat } from '~/libs/enums/enums.js';
import { getFormattedDate } from '~/libs/helpers/helpers.js';

import styles from './styles.module.scss';

const dialogStyles = {
  sectionTitle: styles['section-title'],
};

type Properties = {
  price: number;
  benefits: string[];
  endDate: Date;
};

const SubscriptionManagementDialog: React.FC<Properties> = ({
  benefits,
  price,
  endDate,
}) => {
  const formattedDate = getFormattedDate(
    new Date(endDate),
    TimeFormat.D_MMM_YYYY,
  );

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
              <p className={styles['meta']}>{formattedDate}</p>
            </div>
            <div>
              <p className={dialogStyles.sectionTitle}>Payment</p>
              <p className={styles['meta']}>${price} / month</p>
            </div>
          </div>
        </div>
        <div>
          <p className={dialogStyles.sectionTitle}>Plan benefits</p>
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
      </div>
    </div>
  );
};

export { SubscriptionManagementDialog };
