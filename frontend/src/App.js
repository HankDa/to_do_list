import React, { Component } from "react";
import Modal from "./components/Modal";
import NewsModal from "./components/NewsModal";
import axios from "axios";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      viewCompleted: false,
      todoList: [],
      newsList: [],
      modal: false,
      newsModal: false,
      activeItem: {
        title: "",
        description: "",
        completed: false,
      },
    };
  }

  componentDidMount() {
    this.refreshList();
    this.getNews();
  }

  refreshList = () => {
    axios
      .get("/api/todos/")
      .then((res) => this.setState({ todoList: res.data }))
      .catch((err) => console.log(err));
  };

  toggle = () => {
    this.setState({ modal: !this.state.modal });
  };

  handleSubmit = (item) => {
    this.toggle();

    if (item.id) {
      axios
        .put(`/api/todos/${item.id}/`, item)
        .then((res) => this.refreshList());
      return;
    }
    axios
      .post("/api/todos/", item)
      .then((res) => this.refreshList());
  };

  handleDelete = (item) => {
    axios
      .delete(`/api/todos/${item.id}/`)
      .then((res) => this.refreshList());
  };

  createItem = () => {
    const item = { title: "", description: "", completed: false };

    this.setState({ activeItem: item, modal: !this.state.modal });
  };

  editItem = (item) => {
    this.setState({ activeItem: item, modal: !this.state.modal });
  };

  displayCompleted = (status) => {
    if (status) {
      return this.setState({ viewCompleted: true });
    }

    return this.setState({ viewCompleted: false });
  };

  getNews = (retryCount = 0) => {
    const maxRetries = 3;
    axios
      .get("https://newsapi.org/v2/top-headlines", {
        params: {
          apiKey: "beb85c3e1b704f1385f7c53a1fe596cb",
          country: "us",
          category: "general",
          pageSize: 5,
        },
      })
      .then((response) => {
        if (response.data.articles.length > 0) {
          console.log(response.data.articles);
          this.setState({ newsList: response.data.articles });
        } else {
          if (retryCount < maxRetries) {
            // Retry the API call after a timeout
            setTimeout(() => {
              this.getNews(retryCount + 1);
            }, 1000);
          } else {
            console.log("Maximum number of retries reached.");
          }
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  
  toggleNews = async () => {
    // ISSUE: the first time the modal is opened, the newsList is empty.
    if (!this.state.newsModal) {
        await this.getNews();
    }
    this.setState({ newsModal: !this.state.newsModal });
};


  renderTabList = () => {
    return (
      <div className="nav nav-tabs">
        <span
          onClick={() => this.displayCompleted(true)}
          className={this.state.viewCompleted ? "nav-link active" : "nav-link"}
        >
          Complete
        </span>
        <span
          onClick={() => this.displayCompleted(false)}
          className={this.state.viewCompleted ? "nav-link" : "nav-link active"}
        >
          Incomplete
        </span>
        <span
          // onClick={() => this.displayCompleted(false)}
          className={this.state.viewCompleted ? "nav-link" : "nav-link active"}
        >
          Daily Routing
        </span>
      </div>
    );
  };

  renderItems = () => {
    const { viewCompleted } = this.state;
    const newItems = this.state.todoList.filter(
      (item) => item.completed === viewCompleted
    );
    
    return newItems.map((item) => (
      <li
        key={item.id}
        className="list-group-item d-flex justify-content-between align-items-center"
      >
        <span
          className={`todo-title mr-2 ${
            this.state.viewCompleted ? "completed-todo" : ""
          }`}
          title={item.description}
        >
          {item.title}
        </span>
        <span>
          <button
            className="btn btn-secondary mr-2"
            onClick={() => this.editItem(item)}
          >
            Edit
          </button>
          <button
            className="btn btn-danger"
            onClick={() => this.handleDelete(item)}
          >
            Delete
          </button>
        </span>
      </li>
    ));
  };

  render() {
    return (
      <main className="container">
        <h1 className="text-white text-uppercase text-center my-4">Todo app</h1>
        <div className="row">
          <div className="col-md-6 col-sm-10 mx-auto p-0">
            <div className="card p-3">
              <div className="mb-4">
                <div className="row justify-content-end">
                  <div className="col">
                    <button className="btn btn-primary" onClick={this.createItem}>
                      Add task
                    </button>
                  </div>
                  <div className="col-auto">
                    <button className="btn btn-primary" onClick={this.toggleNews}>
                      Get Daily News
                    </button>
                  </div>
                </div>
              </div>
              {this.renderTabList()}
              <ul className="list-group list-group-flush border-top-0">
                {this.renderItems()}
              </ul>
            </div>
          </div>
        </div>
        {this.state.modal ? (
          <Modal
            activeItem={this.state.activeItem}
            toggle={this.toggle}
            onSave={this.handleSubmit}
          />
        ) : null}
        {this.state.newsModal ? (
          <NewsModal
            toggle={this.toggleNews}
            newsList= {this.state.newsList}
          />
        ) : null}
        
      </main>
    );
  }
}

export default App;