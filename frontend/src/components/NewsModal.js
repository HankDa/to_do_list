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
            activeIndex: -1,
            selectedItem: [],
            activeItem: this.props.activeItem,
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
    let { id, title, checked } = e.target;
    // as url is not the build in attribute of input tag, we need to use the attribute
    const description = e.target.attributes.url.value;
    console.log("Target:", e.target);

    if (e.target.type === "checkbox") {
        
        if (!this.state.selectedItem[id] && checked) {
            this.setState({
              selectedItem: {
                // ... is spread operator to copy the existing state (deep copy).
                // without spread operator it will be a reference. 
                ...this.state.selectedItem,
                [id]: {
                  title,
                  description,
                  completed: false
                }
              }
            }, this.handleSelectionChange
            );
          } else {
            // [id]: _ -> extracting the id property (dynamic) to _ 
            // const { [id]: _, ...newSelectedItem } = this.state.selectedItem;
            const newSelectedItem = this.state.selectedItem
            delete newSelectedItem[id];
            this.setState({ selectedItem: newSelectedItem }, this.handleSelectionChange);
          }
    }
    };

    // callback function for checkbox
    handleSelectionChange = () => {
        console.log("Selected items:", this.state.selectedItem);
      };
    
    
    render() {
    const { toggle, onSave } = this.props;
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
                    onChange={this.handleChange}
                    />
                        {item.title}
                    </ListGroupItemHeading>
                    {this.state.activeIndex === index && (
                    <ListGroupItemText>
                    <a href={item.url} target="_blank" rel="noopener noreferrer">{item.url}</a>
                    </ListGroupItemText>
                )}
                </ListGroupItem>
            ))}
            </ListGroup>
        </ModalBody>
        <ModalFooter>
        <Button color="primary" onClick={() => {
        const selectedItemKeys = Object.keys(this.state.selectedItem);
        selectedItemKeys.forEach(key => {
            const item = this.state.selectedItem[key];
            onSave(item);
            });
        }}>
            Add to todo list
            </Button>
        </ModalFooter>
        </Modal>
    );
    }
    
}


    
