import axios from 'axios';
import './App.css';
import GridComponent from './components/grid/Grid'
import { IServerData } from './models/IDataResponse';
import { useEffect, useState } from 'react';

function App() {
  // const [data, setData] = useState<IServerData[]>([]);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // axios.get<IServerData[]>('http://localhost:5296/api/Data')
    axios.get('http://localhost:5296/api/Data')
      .then(response => {
        console.log(JSON.stringify(response.data));
        setData(response.data);
        setLoading(true);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  return (
      <div className="App">
        <h1>It-Expert test app</h1>
        { loading           
          ? <GridComponent {...data}/>
          : <p>loading</p>
        }
        
      </div>
  );
}

export default App;
