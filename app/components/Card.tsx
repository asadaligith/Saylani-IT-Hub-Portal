import React from "react";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  hoverable?: boolean;
}

export const Card: React.FC<CardProps> = ({ children, className = "", onClick, hoverable = true }) => {
  return (
    <div
      onClick={onClick}
      className={`
        card p-6 
        ${hoverable ? "hover:shadow-lg hover:scale-105" : ""}
        ${onClick ? "cursor-pointer" : ""}
        transition-all duration-300
        ${className}
      `}
    >
      {children}
    </div>
  );
};

interface CardHeaderProps {
  title: string;
  subtitle?: string;
  icon?: React.ReactNode;
}

export const CardHeader: React.FC<CardHeaderProps> = ({ title, subtitle, icon }) => {
  return (
    <div className="flex items-start gap-3 mb-4 pb-4 border-b border-gray-200">
      {icon && <div className="text-2xl text-primary">{icon}</div>}
      <div className="flex-1">
        <h3 className="font-semibold text-lg text-foreground">{title}</h3>
        {subtitle && <p className="text-sm text-text-light mt-1">{subtitle}</p>}
      </div>
    </div>
  );
};

interface CardBodyProps {
  children: React.ReactNode;
  className?: string;
}

export const CardBody: React.FC<CardBodyProps> = ({ children, className = "" }) => {
  return <div className={`${className}`}>{children}</div>;
};

interface CardFooterProps {
  children: React.ReactNode;
  className?: string;
}

export const CardFooter: React.FC<CardFooterProps> = ({ children, className = "" }) => {
  return (
    <div className={`pt-4 mt-4 border-t border-gray-200 flex gap-2 ${className}`}>
      {children}
    </div>
  );
};
