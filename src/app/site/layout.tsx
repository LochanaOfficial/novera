import Navigation from "@/components/site/navigation"
import getCurrentUser from "../actions/getCurrentUser"
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";

const layout = async({ children }: { children: React.ReactNode }) => {
  const currentUser = await getCurrentUser();
  return (
    <ClerkProvider
      appearance={{ baseTheme: dark }}
    >
      <main className="h-full">
        <Navigation currentUser={currentUser} />
        {children}
      </main>
    </ClerkProvider>
  )
}


export default layout