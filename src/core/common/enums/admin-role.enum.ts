export enum AdminRole {
  Owner = "owner", // Full control, including deleting the system
  Admin = "admin", // Can manage settings and users
  Manager = "manager", // Can create/edit content & moderate users
  Editor = "editor", // Can create/edit content but no user management
  Moderator = "moderator", // Can review & approve content, no edits
  Viewer = "viewer", // Read-only access
}