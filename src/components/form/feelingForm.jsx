import React from "react";
import FormAbs from './form'
import FeelingFormView from "./feelingFromPreview";
import http from "../../services/httpService";

import catimage from "../../img/cat.png";
import {
  Form,
  InputGroup,
  FormControl,
  Container,
  Button,
} from "react-bootstrap";

const backEndUrl = process.env.REACT_APP_BACK_END_URL;

class FeelingForm extends FormAbs {
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

  doSubmit = async (feeling) =>{
    feeling.date = new Date();
    await http.post(backEndUrl + "/feelings/create-feeling", feeling);
  }

  render() {
    const { feeling } = this.state;
    
    return (
      <div
        style={{
          backgroundImage: `url(${catimage})`,
          backgroundSize: "cover",
          height: 1000,
        }}
      >
        <Container
          fluid
          style={{ padding: 20, width: "devicewidth", initialScale: 1 }}
        >
          <Form>
            <Form.Group controlId="exampleForm.SelectCustom">
              <Form.Label>Feeling state level</Form.Label>
              <Form.Control
                name="level"
                as="select"
                custom
                value={feeling.level}
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
                aria-label=" some coment to add....."
                onChange={(e) => this.handleChange(e)}
              />
            </InputGroup>
            <div style={{ padding: 20, textAlign: "right" }}>
              <FeelingFormView
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
        </Container>
      </div>
    );
  }
}

export default FeelingForm;
