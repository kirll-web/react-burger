import { RoutePath } from './route-paths';

type TRouteState = {
  from?: {
    pathname?: string;
  };
};

export const getRouteFromState = (state: unknown): string =>
  (state as TRouteState | null)?.from?.pathname ?? RoutePath.Home;
