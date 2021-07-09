import './App.scss';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Login } from './components/Login';
import { Register } from './components/Register';
import { NavBar } from './components/Header/Navbar';
import { HomePage } from './components/Home/index';
import { Statistics } from './components/Statistics/index';
import { ContactsInfo } from './components/Admin/ContactsInfo';
import { BlogsPage } from './components/Blogs';
import { SingleBlog } from './components/Blogs/SingleBlog';
import { AdminBlogs } from './components/Admin/Blogs';
import { SingleBlogAdmin } from './components/Admin/Blogs/SingleBlogAdmin';
import { OnlineAppointment } from './components/Appointment';
import { LogOut } from './components/Header/LogOut';
import { AppointmentsAdmin } from './components/Admin/Appointments';
import { ProtectedRouteAdmin } from './components/ProtectedRoute/ForAdmins';
import { MyBlogs } from './components/Blogs/MyBlogs';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>

          {/* auth */}
          <Route path="/logout" exact>
            <LogOut />
          </Route>
          <Route path="/login" exact>
            <Login></Login>
          </Route>
          <Route path="/register">
            <Register></Register>
          </Route>
          {/* auth */}

          <Route path="/" exact >
            <NavBar></NavBar>
            <HomePage></HomePage>
          </Route>
          <Route path="/myblogs" exact >
            <NavBar></NavBar>
            <MyBlogs></MyBlogs>
          </Route>
          <Route path="/blogs" exact>
            <NavBar></NavBar>
            <BlogsPage></BlogsPage>
          </Route>
          <Route path="/statistics" exact>
            <NavBar></NavBar>
            <Statistics></Statistics>
          </Route>
          <Route path="/blogs/:id" exact>
            <NavBar></NavBar>
            <SingleBlog></SingleBlog>
          </Route>
          <Route path="/appointment" exact>
            <NavBar></NavBar>
            <OnlineAppointment ></OnlineAppointment>
          </Route>

          {/* admin routes */}
          <ProtectedRouteAdmin>
            <NavBar></NavBar>
            <Route path="/admin/appointments" exact>
              <AppointmentsAdmin ></AppointmentsAdmin>
            </Route>
            <Route path="/admin/contactsInfo" exact >
              <ContactsInfo />
            </Route>
            <Route path="/admin/blogs" exact>
              <AdminBlogs></AdminBlogs>
            </Route>
            <Route path="/admin/blogs/:id" exact>
              <SingleBlogAdmin></SingleBlogAdmin>
            </Route>
          </ProtectedRouteAdmin>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
