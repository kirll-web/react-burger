import { useRef, useState } from 'react';

export type IngredientType = 'bun' | 'main' | 'sauce';

type TUseIngredientsTabs = {
  currentTab: IngredientType;
  setCurrentTab: (tab: IngredientType) => void;
  bunsContainerRef: React.RefObject<HTMLElement | null>;
  mainContainerRef: React.RefObject<HTMLElement | null>;
  sauceContainerRef: React.RefObject<HTMLElement | null>;
  handleScroll: (e: React.UIEvent<HTMLDivElement>) => void;
};

export const useIngredientsTabs = (): TUseIngredientsTabs => {
  const [currentTab, setCurrentTab] = useState<IngredientType>('bun');
  const bunsContainerRef = useRef<HTMLElement | null>(null);
  const mainContainerRef = useRef<HTMLElement | null>(null);
  const sauceContainerRef = useRef<HTMLElement | null>(null);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>): void => {
    const scrollTop = e.currentTarget.getBoundingClientRect().top;

    const containers: Record<IngredientType, number | undefined> = {
      bun: bunsContainerRef.current?.getBoundingClientRect().top,
      main: mainContainerRef.current?.getBoundingClientRect().top,
      sauce: sauceContainerRef.current?.getBoundingClientRect().top,
    };

    let closestContainer:
      | {
          name: IngredientType;
          top: number;
        }
      | undefined = undefined;

    for (const [key, value] of Object.entries(containers) as [
      IngredientType,
      number | undefined,
    ][]) {
      if (value !== undefined) {
        if (
          closestContainer === undefined ||
          Math.abs(value - scrollTop) < Math.abs(closestContainer.top - scrollTop)
        ) {
          closestContainer = { name: key, top: value };
        }
      }
    }

    if (closestContainer !== undefined) {
      setCurrentTab(closestContainer.name);
    }
  };

  const selectTab = (tab: IngredientType): void => {
    setCurrentTab(tab);
    const containerRef =
      tab === 'bun'
        ? bunsContainerRef
        : tab === 'main'
          ? mainContainerRef
          : sauceContainerRef;

    containerRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return {
    currentTab,
    setCurrentTab: selectTab,
    bunsContainerRef,
    mainContainerRef,
    sauceContainerRef,
    handleScroll,
  };
};
