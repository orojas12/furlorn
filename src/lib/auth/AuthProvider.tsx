import { AuthContext, useAuthAPI } from "./auth";

export function AuthProvider({
  children,
}: {
  children: React.ReactNode | React.ReactNode[];
}) {
  const auth = useAuthAPI();
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}
