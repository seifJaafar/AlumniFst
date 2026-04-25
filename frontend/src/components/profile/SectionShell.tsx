import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";

interface SectionShellProps {
  title: string;
  icon: React.ElementType;
  isLoading: boolean;
  isEmpty: boolean;
  emptyLabel: string;
  onAdd?: () => void;
  addLabel?: string;
  children: React.ReactNode;
  className?: string;
}

/**
 * Generic wrapper used by Experience, Education, Skills sections.
 * Handles:
 *  - Loading skeleton
 *  - Empty state with an "Add" CTA
 *  - Consistent header with add button
 */
export function SectionShell({
  title,
  icon: Icon,
  isLoading,
  isEmpty,
  emptyLabel,
  onAdd,
  addLabel = "Add",
  children,
  className,
}: SectionShellProps) {
  return (
    <section
      className={cn(
        "rounded-xl border bg-card text-card-foreground shadow-sm",
        className,
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-6 pt-5 pb-4 border-b border-border/50">
        <div className="flex items-center gap-2.5">
          <Icon className="h-5 w-5 text-primary" />
          <h2 className="font-semibold text-base tracking-tight">{title}</h2>
        </div>
        {onAdd && (
          <Button
            size="sm"
            variant="ghost"
            className="h-8 gap-1.5 text-primary hover:bg-primary/10"
            onClick={onAdd}
          >
            <Plus className="h-4 w-4" />
            {addLabel}
          </Button>
        )}
      </div>

      {/* Body */}
      <div className="px-6 py-4">
        {isLoading ? (
          <div className="space-y-3">
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
            <Skeleton className="h-4 w-2/3" />
          </div>
        ) : isEmpty ? (
          <div className="py-6 text-center">
            <p className="text-sm text-muted-foreground">{emptyLabel}</p>
            {onAdd && (
              <Button
                variant="outline"
                size="sm"
                className="mt-3 gap-1.5"
                onClick={onAdd}
              >
                <Plus className="h-4 w-4" />
                {addLabel}
              </Button>
            )}
          </div>
        ) : (
          children
        )}
      </div>
    </section>
  );
}
