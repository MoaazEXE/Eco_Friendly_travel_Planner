import { useState } from 'react';

export function useFormValidation(initialValues, validate) {
  const [fields, setFields] = useState(initialValues);
  const [errors, setErrors] = useState({});

  function handleChange(e) {
    setFields((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setErrors((prev) => ({ ...prev, [e.target.name]: '' }));
  }

  function runValidation() {
    const next = validate(fields);
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  return { fields, setFields, errors, handleChange, runValidation };
}
