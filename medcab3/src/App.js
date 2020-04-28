import React, { useState } from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import Details from './components/Details';
import RegistrationForm from './components/RegistrationForm';
import LoginForm, { LoginFormDiv } from './components/LoginForm'

// API url will go here
const baseUrl = 'https://medcab3-strain.herokuapp.com/'



// form values
const initialFormValues = {
  name:'',
  email:'',
  password:'',
  ageCheckbox:{checked:false}
}

// for now, Im making a lorum ipsum data object for me to render to the DOM, we can tweak it to look like the data we get from the DS Team, and hopefully get them to set up a table of funny, dummy, strains (My favorite idea so far is gysahl greens)
const defaultDetails = {
  strain_image:'#',
  strain_name:'Gysahl Greens',
  strain_type:'Sativa',
  strain_fragrance_profile:'Smells strongly of wild onion',
  strain_description:'Fully man, keif gummies are the indoor equivalent of body high super mellow. Make a quick pipe out of an apple and release the carb Purple Haze all around. Crystalized buds from trimming tasty weed pens THC sativa euphoric resinated dome piece. Taco Bell 4th meal with Doritos Locos tacos and a knife rip on the side. Guatemalan purple haze grown outdoors by ganja shaman.',
  // Mybe more data points for what it treats? 
}

function App() {
  /* slice of state that can be used for search bar maybe
   cant think of a way to make a get request apart from having the DS
   team host some dummy data, since the point of the age verification 
   is to not return any details on actual data until age is confirmed.


  REMINDER: ask about testing database functionality with a search bar. required?

   const [details, setDetails] = useState(defaultDetails) */
  const [formValues, setFormValues] = useState(initialFormValues)

  const onInputChange = evt => {
    const name = evt.target.name
    const value = evt.target.value

    setFormValues({
      ...formValues,
      [name]: value
    })
  }

  const onCheckboxChange = evt => {
    // calling this name in case we use the mail checkbox
    const {name} = evt.target
    const isChecked = evt.target.checked
    setFormValues({
      ...formValues,
      [name]: isChecked
    })
  }

  const onSubmit = evt => {
    evt.preventDefault()
    // TODO: axios POST registration/Login endpoint
    console.log(evt)
    setFormValues(initialFormValues)
  }

  
  return (
    <div className="App">
      
      {/* TODO Context.Provider */}
      
      {/* adding a nav bar just for testing */}
      <header>
        <Link to='/Login'><button>Login</button></Link>
        <Link to='/Register'><button>Register</button></Link>
        <Link to='/'><button>Home</button></Link>
      </header>
      <Switch>
        <Route path='/Login'>
          <LoginFormDiv >
            <LoginForm
            values={formValues}
            onInputChange={onInputChange}
            onSubmit={onSubmit}          
            />
          </LoginFormDiv>
        </Route>
        <Route path='/Register'>
          <RegistrationForm 
          values={formValues}
          onInputChange={onInputChange}
          onCheckboxChange={onCheckboxChange}
          onSubmit={onSubmit}
          />
        </Route>
        
        
        {/* more specific switch paths above */}        
        <Route path='/'>
          <Details 
          image={defaultDetails.imageurl}
          description={defaultDetails.description}
          strain_name={defaultDetails.strain_name}
          strain_type={defaultDetails.strain_type}          
          />
        </Route>
      </Switch>
      
      
    </div>
  );
}

export default App;