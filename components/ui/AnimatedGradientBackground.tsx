export function AnimatedGradientBackground({
  children,
  className = '',
  colors = ['#3b82f6', '#8b5cf6', '#06b6d4', '#10b981'],
  duration = 15,
  direction = 'diagonal'
}: {
  children: React.ReactNode
  className?: string
  colors?: string[]
  duration?: number
  direction?: string
}) {
  const getGradientStyle = () => {
    const baseStyle = {
      backgroundSize: '200% 200%',
    };

    switch (direction) {
      case 'diagonal':
        return {
          ...baseStyle,
          background: `linear-gradient(45deg, ${colors.join(', ')})`,
          animation: `diagonal-gradient ${duration}s ease-in-out infinite`,
        };
      case 'radial':
        return {
          ...baseStyle,
          background: `radial-gradient(circle, ${colors.join(', ')})`,
          animation: `radial-gradient ${duration}s ease-in-out infinite`,
        };
      case 'wave':
        return {
          ...baseStyle,
          background: `linear-gradient(90deg, ${colors.join(', ')})`,
          animation: `wave-gradient ${duration}s ease-in-out infinite`,
        };
      case 'spiral':
        return {
          ...baseStyle,
          background: `conic-gradient(from 0deg, ${colors.join(', ')})`,
          animation: `spiral-gradient ${duration}s ease-in-out infinite`,
        };
      default:
        return {
          ...baseStyle,
          background: `linear-gradient(45deg, ${colors.join(', ')})`,
          animation: `diagonal-gradient ${duration}s ease-in-out infinite`,
        };
    }
  };

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* Animated gradient background */}
      <div
        className="absolute inset-0"
        style={getGradientStyle()}
      />
      
      {/* Subtle overlay for better text readability */}
      <div className="absolute inset-0 bg-black/20" />
      
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}
