import { Drawer } from "expo-router/drawer";

export default function Layout() {
  return (
    <Drawer
      screenOptions={{
        headerStyle: { backgroundColor: "#4A90E2" },
        headerTintColor: "#fff",
        drawerActiveTintColor: "#4A90E2",
      }}
    >
    <Drawer.Screen
        name="index"
        options={{ drawerLabel: "Dashboard", title:'Login' }}
      />

     

      <Drawer.Screen
        name="AddMember"
        options={{ drawerLabel: "Add Member", title:'Add Members' }}
      />

      <Drawer.Screen
        name="Help"
        options={{ drawerLabel: "Help & Support" }}
      />
</Drawer>
  );
}
