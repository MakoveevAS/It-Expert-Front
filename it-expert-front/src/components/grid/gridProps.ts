import { IServerData } from "../../models/IDataResponse";

export interface GridProps {
    data: IServerData[];
    onDataChange: (updatedData: IServerData[]) => void;
  }