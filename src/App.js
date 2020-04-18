import React, { useState, useEffect } from "react";
import api from './services/api';

import "./styles.css";

function App() {

  const [repositories, setRepositories] = useState([]);
  const techs=['React', 'Javascript', 'Node','ReactJS', 'ReactNative']
  
  useEffect(()=>{
      api.get('repositories').then(response =>{
        setRepositories(response.data);
      });
  },[]);

  async function handleAddRepository() {

  const randonIndex = Math.floor(Math.random()*5);
  const response = await  api.post('repositories',{	
      
    
      title: techs[randonIndex],
      url: "http://github.com/fejunior",
      techs: ["Node.js", "React"],
      likes: 0 
    });
  const repository = response.data;

  setRepositories([...repositories, repository]);

  }

  async function handleRemoveRepository(id) {
    
    api.delete(`repositories/${id}`);

    const repositoryIndex = repositories.findIndex(repository=> repository.id === id);

    if(repositoryIndex >= 0){

      repositories.splice(repositoryIndex,1);
      setRepositories([...repositories])
    }
    
  }

  return (
    <div>
      <ul data-testid="repository-list">
        
        {repositories.map( repository =>(
          <li key={repository.id}>
            {repository.title}
          <button onClick={() => handleRemoveRepository(repository.id)}>
            Remover
          </button>
        </li>
        ))}

      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
