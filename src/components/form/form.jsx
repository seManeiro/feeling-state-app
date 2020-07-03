import  { Component } from 'react';
import authService from "../../services/authService";


class FormAbs extends Component {
   
    constructor() {
        super();
    
        this.state = {
          feeling: {
            date: "",
            level: "",
            comment: "",
            userId: "",
          }
        }
      }


    handleChange = ({ currentTarget: input }) => {
        const feeling = { ...this.state.feeling };
        feeling[input.name] = input.value;
        this.setState({ feeling });
      };

      


    handleSubmit = async () => {
        const feeling = { ...this.state.feeling };
        feeling.userId = authService.getUser().id;
    
        this.doSubmit(feeling);
    
        this.setState({
          feeling: {
            date: "",
            level: "",
            comment: "",
            userId: "",
          },
        });
    
        return this.props.history.push("/feelingsview");
      };

}
 
export default FormAbs;