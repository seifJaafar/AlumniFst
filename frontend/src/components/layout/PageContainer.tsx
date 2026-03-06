interface PageContainerProps {
  children: React.ReactNode;
  className?: string;
}

export const PageContainer = ({
  children,
  className = "",
}: PageContainerProps) => {
  return <div className={`container py-8 ${className}`}>{children}</div>;
};
