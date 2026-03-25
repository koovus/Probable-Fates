import { Switch, Route, Router as WouterRouter } from "wouter";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import { GameProvider } from "@/lib/engine";
import { GameRoot } from "@/pages/GameRoot";

function Router() {
  return (
    <Switch>
      <Route path="/" component={GameRoot} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <GameProvider>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <Router />
        </WouterRouter>
      </TooltipProvider>
    </GameProvider>
  );
}

export default App;
