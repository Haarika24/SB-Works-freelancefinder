import React from 'react';

interface AvatarProps {
  src?: string;
  alt?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  fallback?: string;
}

const Avatar: React.FC<AvatarProps> = ({
  src,
  alt = 'Avatar',
  size = 'md',
  className = '',
  fallback,
}) => {
  const sizeClasses = {
    xs: 'w-6 h-6 text-xs',
    sm: 'w-8 h-8 text-sm',
    md: 'w-10 h-10 text-base',
    lg: 'w-12 h-12 text-lg',
    xl: 'w-16 h-16 text-xl',
  };

  const initials = fallback || 
    (alt.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase());

  const imgErrorHandler = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.style.display = 'none';
    const fallbackElement = e.currentTarget.nextElementSibling;
    if (fallbackElement) {
      fallbackElement.classList.remove('hidden');
    }
  };

  return (
    <div className={`relative rounded-full overflow-hidden bg-gray-200 ${sizeClasses[size]} ${className}`}>
      {src ? (
        <>
          <img
            src={src}
            alt={alt}
            className="w-full h-full object-cover"
            onError={imgErrorHandler}
          />
          <div className="absolute inset-0 flex items-center justify-center bg-indigo-100 text-indigo-600 font-medium hidden">
            {initials}
          </div>
        </>
      ) : (
        <div className="flex items-center justify-center h-full bg-indigo-100 text-indigo-600 font-medium">
          {initials}
        </div>
      )}
    </div>
  );
};

export default Avatar;