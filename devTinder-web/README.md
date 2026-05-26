
# DevTinder

- Create a vite + React application
- Remove unnecessary code and create a hello world app
- install teilwind css
- Install Daisy Ui
- Add navbar component to app.jsx
- create Navbar.jjsx separate component file
- install react router dom
- create BrowserRouter > Routes > Route/Body > RouteChildren
- Create an outlet in your body components
- create a Footer
- create a login
- install axios
- cors - install cors in backend => add middleware to with configuration: a.use(cors({
  origin: Frontend Url,
  credentials: true
})) origin -> Frontend Url,  credentials-> true
whenever you are making API call so pass a axios=> {withcredentials: true} if we not write withcredentials true its will not send the token back for other api calls
- install Redux Toolkit from docs
-configureStore -> Provider -> createSlice -> add reducers to store
- Add redux devtools in crome
- Login and see if your data is coming properly in the store
- Navbar should update as soon as your logs in 
- Refactor our code to add constants file + create a components folder

Body
  Navbar
  Route=/Login=> Login
  Route=/connections => connections
  Route=/profile => Profile