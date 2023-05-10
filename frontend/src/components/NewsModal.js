import React, { Component } from "react";
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Form,
    FormGroup,
    Input,
    Label,
  } from "reactstrap";

export default class NewsModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            newsList: this.props.newsList,
            activeItem: -1,
        };
    }

    toggleTitle = (index) => {
        if (this.state.activeIndex === index) {
          // if the clicked title is already active, hide the description
          this.setState({ activeIndex: -1 });
        } else {
          // show the clicked title's description
          this.setState({ activeIndex: index });
        }
      }
    
    
      render() {
        const { toggle } = this.props;
        const { newsList } = this.state;
          
        return(
          <Modal isOpen={true} toggle={toggle}>
            <ModalHeader toggle={toggle}>Top News</ModalHeader>
            <ModalBody>
              <Form>
                {newsList.map((item, index) => (
                <React.Fragment key={index}>
                  <FormGroup key={index}>
                    <Label for={`title-${index}`} onClick={() => this.toggleTitle(index)}>
                      {item.title}
                    </Label>
                    {this.state.activeIndex === index && (
                      <Label for={`description-${index}`}>{item.description}</Label>
                    )}
                  </FormGroup>
                  {index !== newsList.length - 1 && <hr />}
                  </React.Fragment>
                ))}
              </Form>
            </ModalBody>
            <ModalFooter>
              <Button color="primary" onClick={toggle}>
                Close
              </Button>
            </ModalFooter>
          </Modal>
        );
      }
      
}
    

      
