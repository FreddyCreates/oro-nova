import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useCallback } from "react";
import { HEARTBEAT_MS, PHI2_SECOND_MS, PHI3_SECOND_MS } from "../constants/phi";
import { asFullBackend } from "../extendedBackend";
import type { ConversationTurn, EntitySnapshot } from "../types/backendTypes";
import { useActor } from "./useActor";

// All polling intervals from phi.ts — no ad-hoc numbers
// Snapshot: HEARTBEAT_MS × Φ² ≈ 1618ms (PHI_SECOND_MS essentially)
const SNAP_POLL = HEARTBEAT_MS * 2; // ≈ 1746ms — close to PHI_SECOND_MS
// Conversation: PHI2_SECOND_MS (Φ² × 1000ms = 2618ms)
const CONV_POLL = PHI2_SECOND_MS;
// Status: PHI3_SECOND_MS (Φ³ × 1000ms = 4236ms)
const STATUS_POLL = PHI3_SECOND_MS;

export function useEntityState() {
  const { actor: rawActor, isFetching: actorFetching } = useActor();
  const actor = asFullBackend(rawActor);
  const queryClient = useQueryClient();
  const enabled = !!actor && !actorFetching;

  const { data: sessionId = null } = useQuery<string | null>({
    queryKey: ["session-id"],
    queryFn: async () => {
      if (!actor) return null;
      try {
        const id = await actor.getActiveSessionId();
        if (id && id.length > 0) return id;
        const newId = await actor.createEntitySession("entity-primary", "{}");
        return newId;
      } catch {
        return null;
      }
    },
    enabled,
    staleTime: Number.POSITIVE_INFINITY,
  });

  const { data: snapshot = null, isLoading: snapshotLoading } =
    useQuery<EntitySnapshot | null>({
      queryKey: ["snapshot"],
      queryFn: async () => {
        if (!actor) return null;
        return actor.getSnapshot();
      },
      enabled,
      refetchInterval: SNAP_POLL,
      staleTime: 0,
    });

  const { data: conversation = [] } = useQuery<ConversationTurn[]>({
    queryKey: ["conversation"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getConversation();
    },
    enabled,
    refetchInterval: CONV_POLL,
    staleTime: 0,
  });

  const { data: status } = useQuery({
    queryKey: ["entity-status"],
    queryFn: async () => {
      if (!actor)
        return {
          running: false,
          cycleCount: BigInt(0),
          memoryCount: BigInt(0),
        };
      return actor.getEntityStatus();
    },
    enabled,
    refetchInterval: STATUS_POLL,
  });

  const { mutateAsync: sendMessageMutation, isPending: isSending } =
    useMutation({
      mutationFn: async (text: string) => {
        if (!actor) throw new Error("No actor");
        await actor.sendMessage(text);
        const [snap, conv] = await Promise.all([
          actor.getSnapshot(),
          actor.getConversation(),
        ]);
        return { snap, conv };
      },
      onSuccess: ({ snap, conv }) => {
        queryClient.setQueryData(["snapshot"], snap);
        queryClient.setQueryData(["conversation"], conv);
      },
    });

  const sendMessage = useCallback(
    async (text: string) => {
      await sendMessageMutation(text);
    },
    [sendMessageMutation],
  );

  return {
    snapshot,
    conversation,
    sessionId,
    isLoading: snapshotLoading || actorFetching,
    isSending,
    cycleCount: status?.cycleCount ?? BigInt(0),
    isRunning: status?.running ?? false,
    sendMessage,
  };
}
