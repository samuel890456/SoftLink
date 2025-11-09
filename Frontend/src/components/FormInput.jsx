import React from 'react';

function FormInput({
  label,
  name,
  type = 'text',
  placeholder = '',
  error,
  className = '',
  register,
  ...props
}) {
  const inputClasses = `w-full px-4 py-3 border-2 border-gray-200 rounded-2xl focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all-300 ${
    error ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' : ''
  }`;

  const registerProps = register ? register(name) : {};

  return (
    <div className={`mb-4 ${className}`}>
      {label && (
        <label htmlFor={name} className="block text-sm font-semibold text-darkGray mb-2">
          {label}
        </label>
      )}
      {type === 'textarea' ? (
        <textarea
          id={name}
          name={name}
          placeholder={placeholder}
          className={inputClasses}
          rows="4"
          {...registerProps}
          {...props}
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby={error ? `${name}-error` : undefined}
        />
      ) : type === 'select' ? (
        <select
          id={name}
          name={name}
          className={inputClasses}
          {...registerProps}
          {...props}
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby={error ? `${name}-error` : undefined}
        >
          {props.children}
        </select>
      ) : (
        <input
          type={type}
          id={name}
          name={name}
          placeholder={placeholder}
          className={inputClasses}
          {...registerProps}
          {...props}
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby={error ? `${name}-error` : undefined}
        />
      )}
      {error && (
        <p id={`${name}-error`} className="text-red-600 text-sm mt-1" role="alert">
          {error.message}
        </p>
      )}
    </div>
  );
}

export default FormInput;
