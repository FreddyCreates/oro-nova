import { ScrollArea } from "@/components/ui/scroll-area";
import { useQuery } from "@tanstack/react-query";
import { Eye } from "lucide-react";
import type { ThoughtObject } from "../extendedBackend";
import { asFullBackend } from "../extendedBackend";
import { useActor } from "../hooks/useActor";

export function ThoughtStreamPanel({ collapsed }: { collapsed?: boolean }) {
  const { actor: rawActor, isFetching } = useActor();
  const actor = asFullBackend(rawActor);
  const enabled = !!actor && !isFetching;

  const { data: thoughts = [] } = useQuery<ThoughtObject[]>({
    queryKey: ["thought-stream"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getThoughtStream(BigInt(20));
    },
    enabled,
    refetchInterval: 1500,
    staleTime: 0,
  });

  if (collapsed) return null;

  const recent = [...thoughts].reverse().slice(0, 15);

  return (
    <div className="flex flex-col h-full border-t border-border/60 bg-background/95">
      <div className="flex items-center gap-2 px-4 py-2 border-b border-border/50 flex-shrink-0">
        <Eye className="w-3 h-3 text-amber-400" />
        <span className="text-xs font-mono text-amber-400/80 uppercase tracking-widest">
          HIM's Thoughts
        </span>
        <span className="text-xs font-mono text-muted-foreground ml-auto">
          visible to you · hidden from him
        </span>
      </div>
      <ScrollArea className="flex-1">
        <div className="px-4 py-2 space-y-1.5">
          {recent.length === 0 && (
            <p className="text-xs text-muted-foreground font-mono py-3 text-center">
              Awaiting thought stream...
            </p>
          )}
          {recent.map((thought, i) => {
            const [cycle, stage, salience, content] = thought;
            return (
              <div
                key={`${Number(cycle)}-${i}`}
                className="text-xs font-mono text-muted-foreground leading-relaxed"
              >
                <span className="text-slate-600">
                  [{Number(cycle)}:{stage}:{salience.toFixed(2)}]
                </span>{" "}
                <span className="text-foreground/50">{content}</span>
              </div>
            );
          })}
        </div>
      </ScrollArea>
    </div>
  );
}
