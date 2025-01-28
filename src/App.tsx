import { PWAInstallPrompt } from "./components/PWAInstallPrompt";
import { Toaster } from "./components/ui/sonner";
import { isPWA } from "./lib/isPWA";

function App() {
  return (
    <>
      {!isPWA() && <PWAInstallPrompt />}
      <Toaster />
    </>
  );
}

export default App;
