import React from 'react';
import './App.css';
import AppRouter from "../src/RouterComponent";
import NavBar from "../src/components/navbar/NavBar";
import Container from '@material-ui/core/Container';
import { FaHeart} from 'react-icons/fa';

function App() {
  return (   
    
      <div>
          <NavBar/>
          <Container>
                <AppRouter/>
          </Container>
          <div className="text-center pt-4">
            <code className="text-muted" style={{color: 'black'}}>
              Made with <FaHeart /> by <a href="https://github.com/rkjaime">Jaime Mejia</a>
            </code>
          </div>      
      </div>
  );
}

export default App;
