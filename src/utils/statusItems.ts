
import { apiClient } from '../api/api';
``
export interface InventoryType {
   id: number;
   codeInventory: string;
   description: string;
   temperature: number;
   typeInventory: {
       id: number;
       name: string
   }
}
export const getStatusItem = (expositionInMinutes = 0, maxExpositionTime = 0, criticalExpositionTime = 0): string => {
   const OneHour = 60;


     if (expositionInMinutes <= (maxExpositionTime * OneHour) &&  expositionInMinutes >= (criticalExpositionTime * OneHour)) {
        // Tempo crítico
        return 'Exposto (tempo crítico)'
    }
     else if (expositionInMinutes > (maxExpositionTime * OneHour)) {
        // Tempo crítico
       console.log('Exposto (Excedente)', expositionInMinutes, (maxExpositionTime * OneHour))
        return 'Exposto (Excedente)'
   }
return "exposto"
     

}

const whereIs = (invetoryId: number): any => {
   apiClient.get<InventoryType>(`inventario/${invetoryId}/byId`)
      .then(data => {
         console.log(data)
         if(data) return data.typeInventory.name
      })
}
