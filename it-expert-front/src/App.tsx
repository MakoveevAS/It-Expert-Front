import axios from 'axios';
import './App.css';
import GridComponent from './components/grid/Grid'
import { IServerData } from './models/IDataResponse';
import { useEffect, useState } from 'react';

function App() {
  const [data, setData] = useState<IServerData[]>([]);
  const [loading, setLoading] = useState(false);

  const backendUrl = 'http://localhost:5296/api/Data';

  useEffect(() => {
    requestData();
  }, []);

  const requestData = async () => {
    axios.get(backendUrl).then(response => {
      setData(response.data);
      setLoading(true);
    })
    .catch(error => {
      console.log(error);
    });
  }

  const handleDataChange = async (newData: IServerData[]) => {
    try {
      await axios.post(backendUrl, {
        data:newData
      } );
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