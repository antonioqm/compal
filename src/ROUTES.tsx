import { JSXElementConstructor } from "react";
import { ComponentIcon, InventoryIcon, ItemsIcon, LabelIcon, LevelIcon, ThicknessIcon } from "./components/icons/icons";

import { FormComponent } from "./components/FormsUI/Forms/FormComponent";
import { FormInventory } from "./components/FormsUI/Forms/FormInventory";
import { FormLabel } from "./components/FormsUI/Forms/FormLabel";
import { FormLevel } from "./components/FormsUI/Forms/FormLevel";
import { FormThickness } from "./components/FormsUI/Forms/FormThickness";



interface PageRouter {
  path: string;
  label: string;
  addButton?: boolean;
  IconComponent: JSXElementConstructor<any>;
  FormComponent: JSXElementConstructor<any>;
}
export const activeRoute = (
  routeName: string,
  currentRoute: string
): boolean => {
  return routeName === currentRoute ? true : false;
};

export const currentPage = (currentRoute: string): PageRouter | null => {
  try {
    const pageRouter = ROUTES.find(
      (pageRouter) => pageRouter.path === currentRoute
    );
    return pageRouter ? pageRouter : null;
    
  } catch (err) {
    return null;
  }
};

export const ROUTES: PageRouter[] = [
  {
    path: "/nivel",
    label: "Nível",
    addButton: true,
    IconComponent: LevelIcon,
    FormComponent: FormLevel,
  },
  {
    path: "/espessura",
    label: "Espessura",
    addButton: true,
    IconComponent: ThicknessIcon,
    FormComponent: FormThickness,
  },
  {
    path: "/componente",
    label: "Componente",
    addButton: true,
    IconComponent: ComponentIcon,
    FormComponent: FormComponent,
  },
  {
    path: "/itens",
    label: "Itens",
    IconComponent: ItemsIcon,
    FormComponent: FormInventory,
  },
  {
    path: "/inventory",
    label: "Inventário",
    addButton: true,
    IconComponent: InventoryIcon,
    FormComponent: FormInventory,
  },

  {
    path: "/etiqueta",
    label: "Etiqueta",
    addButton: true,
    IconComponent: LabelIcon,
    FormComponent: FormLabel,
  },

  // {
  //   path: "/linha-producao",
  //   label: "Linha de produção",
  //   addButton: true,
  //   IconComponent: ProductionIcon,
  //   FormComponent: FormProducao,
  // }
];
