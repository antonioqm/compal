import { JSXElementConstructor } from "react";
import { InventoryIcon, ItemsIcon, LabelIcon, LevelIcon, PartNumberIcon, ThicknessIcon } from "./components/icons/icons";

import { FormInventory } from "./components/FormsUI/Forms/FormInventory";
import { FormLabel } from "./components/FormsUI/Forms/FormLabel";
import { FormLevel } from "./components/FormsUI/Forms/FormLevel";
import { FormProducao } from "./components/FormsUI/Forms/FormProducao";
import { FormThickness } from "./components/FormsUI/Forms/FormThickness";
import { FormPartNumber } from "./components/FormsUI/Forms/PartNumber";



interface PageRouter {
  path: string;
  label: string;
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
    IconComponent: LevelIcon,
    FormComponent: FormLevel,
  },
  {
    path: "/espessura",
    label: "Espessura",
    IconComponent: ThicknessIcon,
    FormComponent: FormThickness,
  },
  {
    path: "/part-number",
    label: "Part Number",
    IconComponent: PartNumberIcon,
    FormComponent: FormPartNumber,
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
    IconComponent: InventoryIcon,
    FormComponent: FormInventory,
  },

  {
    path: "/etiqueta",
    label: "Etiqueta",
    IconComponent: LabelIcon,
    FormComponent: FormLabel,
  },

  {
    path: "/linha-producao",
    label: "Linha de produção",
    IconComponent: LabelIcon,
    FormComponent: FormProducao,
  }
];
