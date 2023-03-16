import { configure } from "mobx";

configure({
  useProxies: "ifavailable",
  computedRequiresReaction: true,
  reactionRequiresObservable: true,
  enforceActions: "always"
});
