import Button from "@mui/material/Button";
import "./App.css"
import DeleteIcon from '@mui/icons-material/Delete';
import { purple } from '@mui/material/colors';
import { styled } from '@mui/material/styles';
import { LoginForm } from "./LoginForm";
import { RegisterForm } from "./RegisterForm";

//color details
const ColorButton = styled(Button)(({ theme }) => ({
      color: theme.palette.getContrastText(purple[500]),
      backgroundColor: purple[500],
      '&:hover': {
        backgroundColor: purple[700],
      },
    }));


/**
 * Menu of list of button interaction which each display a form
 * @param {function} setDisplay displays the form for user to input details
 * @returns list of buttons
 */    
function Menu({ setDisplay }) {

      const menuItemLogin = <LoginForm  setDisplay={setDisplay}/>
      const menuItemRegister = <RegisterForm setDisplay={setDisplay}/>

      return (

            
            <div className="menu">

                  <ColorButton variant="secondary" size="lg" onClick={()=>setDisplay(menuItemLogin)}>Login</ColorButton>
                  <p />
                  <ColorButton variant="primary" size="lg" onClick={()=>setDisplay(menuItemRegister)}>Register</ColorButton>
                 <br/> 
            </div>
      );

}


export default Menu