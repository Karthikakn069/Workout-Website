import {createBrowserRouter , RouterProvider} from 'react-router-dom';
import Home from './Pages/Home';
import Header from './Components/Header.jsx'
import Exercises from './Pages/Exercises.js';
import DashBoard from './Pages/DashBoard.js';
import VideoDemoes from './Pages/VideoDemoes.js';
import WorkOut from './Pages/Workout.js';
import ExerciseDetails from './Components/ExerciseDetails.jsx';
import Admin from "./Pages/Admin.js"

const router = createBrowserRouter([
  {
    path : "/",
    element : <Home />
  },
  {
    path : "/exercise", 
    element : <Exercises />,
  },
  {
    path:"/dashboard",
    element : <DashBoard />
  },
  {
    path : "/videos",
    element : <VideoDemoes />
  },
  {
    path : "/workout",
    element : <WorkOut />
  },
  {
    path : '/exercise_details/:id',
    element : <ExerciseDetails />
  },
  {
    path:"/admin",
    element : <Admin />
  }
])


function App() {
  return (
    <div>
      <Header />
      <RouterProvider router={router}></RouterProvider>
    </div>
  );
}

export default App;
