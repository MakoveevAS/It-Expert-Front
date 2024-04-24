import './App.css';
import GridComponent from './components/grid/Grid'
import { IServerData } from './models/IDataResponse';
import { useEffect, useState } from 'react';
import { getData, postData } from './services/dataService';

function App() {
  const [data, setData] = useState<IServerData[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    requestData();
  }, []);

  const requestData = async () => {
    const data = await getData();
    setData(data);
    setLoading(true);
  };

  const handleDataChange = async (newData: IServerData[]) => {
    try {
      await postData(newData);
    } catch (error) {
        console.error('Error updating data:', error);
        requestData();
    }
  };

  return (
      <div className="App">
        <h1>It-Expert test app</h1>
        { loading           
          ? <GridComponent data={data} onDataChange={handleDataChange}/>
          : <p>loading</p>
        }
      </div>
  );
}

export default App;