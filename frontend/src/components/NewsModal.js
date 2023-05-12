import React, { Component } from "react";
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Form,
    FormGroup,
    ListGroup,
    ListGroupItem,
    ListGroupItemHeading,
    ListGroupItemText,
    Input,
    Label,
  } from "reactstrap";

export default class NewsModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            newsList: this.props.newsList,
            activeItem: -1,
            selectedItem: [],
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

    handleChange = (e) => {
    let { id, title, url, description, checked } = e.target;

    if (e.target.type === "checkbox") {
        
        if (!this.state.selectedItem[id] && checked) {
            this.setState({
              selectedItem: {
                // ... is spread operator to copy the existing state (deep copy).
                // without spread operator it will be a reference. 
                ...this.state.selectedItem,
                [id]: {
                  title,
                  url,
                  description}
              }
            }, this.handleSelectionChange
            );
          } else {
            // TODO: understand how destructuring work
            const { [id]: _, ...newSelectedItem } = this.state.selectedItem;
            this.setState({ selectedItem: newSelectedItem }, this.handleSelectionChange);
          }
    }
    };

    // callback function for checkbox
    handleSelectionChange = () => {
        console.log("Selected items:", this.state.selectedItem);
      };
    
    
    render() {
    const { toggle } = this.props;
    const { newsList } = this.state;
    
    return (
        <Modal isOpen={true} toggle={toggle}>
        <ModalHeader toggle={toggle}>Top News</ModalHeader>
        <ModalBody>
            <ListGroup>
            {newsList.map((item, index) => (
                <ListGroupItem action key={index} onClick={() => this.toggleTitle(index)}>
                    <ListGroupItemHeading>
                    <Input
                    type="checkbox"
                    id={index}
                    title= {item.title}
                    url= {item.url}
                    description= {item.description}
                    onChange={this.handleChange}
                    />
                        {item.title}
                    </ListGroupItemHeading>
                    {this.state.activeIndex === index && (
                    <ListGroupItemText>
                    <a href={item.url} target="_blank" rel="noopener noreferrer">{item.description}</a>
                    </ListGroupItemText>
                )}
                </ListGroupItem>
            ))}
            </ListGroup>
        </ModalBody>
        <ModalFooter>
            <Button color="primary" onClick={toggle}>
            Add to todo list
            </Button>
        </ModalFooter>
        </Modal>
    );
    }
    
}


    
