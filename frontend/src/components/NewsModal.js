import React from "react";
export default class NewsModal extends React.Component {
    constructor(props) {
        super(props);
    }
  
    render() {
        const newsList = this.props.newsList;
        console.log(newsList);
        if (!newsList) {
          return null; // or return a loading spinner or error message
        }
        return newsList.map((item, index) => (
        <li
            key={index}
            className="list-group-item d-flex justify-content-between align-items-center"
        >
            <span
            className={"todo-title mr-2"}
            title={item.description}
            >
            {item.title}
            </span>

        </li>
        ));
    }
}