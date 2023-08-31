import { Checkbox } from '#libs/components/components.js';
import { useCallback } from '#libs/hooks/hooks.js';

type Properties = {
  label: string;
  onChange: (label: string) => void;
};

const SurveyCategory: React.FC<Properties> = ({
  label,
  onChange,
}): JSX.Element => {
  const handleChange = useCallback(() => {
    onChange(label);
  }, [label, onChange]);

  return <Checkbox label={label} onChange={handleChange} />;
};

export { SurveyCategory };
