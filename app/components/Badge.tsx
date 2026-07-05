import React from "react";

type BadgeVariant = "success" | "warning" | "error" | "info" | "default";

interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  size?: "small" | "medium";
}

export const Badge: React.FC<BadgeProps> = ({ children, variant = "default", size = "medium" }) => {
  const variantClasses = {
    success: "badge-success",
    warning: "badge-warning",
    error: "badge-error",
    info: "badge-info",
    default: "bg-gray-100 text-foreground",
  };

  const sizeClasses = {
    small: "text-xs px-2 py-0.5",
    medium: "text-sm px-2.5 py-0.5",
  };

  return (
    <span className={`badge ${variantClasses[variant]} ${sizeClasses[size]}`}>
      {children}
    </span>
  );
};

interface StatusBadgeProps {
  status: string;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  const statusMap: Record<string, { variant: BadgeVariant; label: string }> = {
    pending: { variant: "warning", label: "Pending" },
    active: { variant: "info", label: "Active" },
    resolved: { variant: "success", label: "Resolved" },
    rejected: { variant: "error", label: "Rejected" },
    completed: { variant: "success", label: "Completed" },
    lost: { variant: "error", label: "Lost" },
    found: { variant: "success", label: "Found" },
  };

  const config = statusMap[status?.toLowerCase()] || { variant: "default", label: status || "Unknown" };

  return <Badge variant={config.variant}>{config.label}</Badge>;
};
