import { useCallback, useState } from 'react';

export const useFieldState = (initialValue = '') => {
  const [value, setValue] = useState(initialValue);
  const [showValue, setShowValue] = useState(false);

  const toggleShowValue = useCallback((): void => {
    setShowValue((prev) => !prev);
  }, []);

  const handleChange = useCallback(
    (data: React.ChangeEvent<HTMLInputElement> | string): void => {
      if (typeof data === 'string') {
        setValue(data);
        return;
      }

      setValue(data.target.value);
    },
    []
  );

  return { value, handleChange, showValue, toggleShowValue };
};
