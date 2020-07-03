import React from "react";
import FormAbs from "./form";
import FeelingFormView from "./feelingFromPreview";
import feelingService from "../../services/feelingService";
import http from "../../services/httpService";
import catimage from "../../img/cat.png";
import {
  Form,
  InputGroup,
  FormControl,
  Button,
} from "react-bootstrap";

const backEndUrl = process.env.REACT_APP_BACK_END_URL;

class FeelingEditForm extends FormAbs {
  constructor() {
    super();

    this.state = {
      feeling: {
        id_: "",
        date: "",
        level: "",
        comment: "",
        userId: "",
      },
    };
  }

  componentDidMount() {
    try {
      const feeling = feelingService.fetchFeelingToUpdate();
      this.setState({ feeling });
    } catch (ex) {}
  }

  doSubmit = async (feeling) => {
 
    await http.put(
      backEndUrl + "/feelings/update-feeling/" + this.state.feeling._id,
      feeling
    );
  };

  fetchFeelingToUpdate = (feeling) => {
    this.setState({ feeling });
  };

  render() {
    const { feeling } = this.state;

    return (
      <div
        style={{
          backgroundImage: `url(${catimage})`,
          backgroundSize: "cover",
          height: 1000,
          width: "devicewidth",
          padding: 5
        }}
      >
      
          <Form>
            <Form.Group controlId="exampleForm.SelectCustom">
              <Form.Label>Feeling state level</Form.Label>
              <Form.Control
                name="level"
                as="select"
                custom
                value={feeling.level}
                placeholder={feeling.level}
                onChange={(e) => this.handleChange(e)}
              >
                <option></option>
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
                <option>6</option>
                <option>7</option>
                <option>8</option>
                <option>9</option>
                <option>10</option>
              </Form.Control>
            </Form.Group>
            <InputGroup>
              <InputGroup.Prepend>
                <InputGroup.Text>comment</InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl
                name="comment"
                as="textarea"
                value={feeling.comment}
                placeholder={feeling.comment}
                aria-label=" some coment to add....."
                onChange={(e) => this.handleChange(e)}
              />
            </InputGroup>
            <div style={{ padding: 20, textAlign: "right" }}>
              <FeelingFormView
                date= {feeling.date}
                level={feeling.level}
                comment={feeling.comment}
              />
              <Button
                variant="warning"
                disabled={feeling.level === ""}
                onClick={() => this.handleSubmit()}
              >
                submit
              </Button>
            </div>
          </Form>
       
      </div>
    );
  }
}

export default FeelingEditForm;
