export type WorkspaceRecord = {
  id: string;
  ownerId: string;
  name: string;
  data: string;
  updatedAt: string;
};

export function canAccessWorkspace(workspace: Pick<WorkspaceRecord, "ownerId">, userId: string): boolean {
  return workspace.ownerId === userId;
}
