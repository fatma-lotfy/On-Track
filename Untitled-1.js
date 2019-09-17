import cx from "classnames";
import { Component } from "react";

export default class LikeDislike extends Component {
  constructor(props) {
    super(props);

    this.state = {
      liked: false,
      disliked: false,
      initLike: 100,
      initDislike: 25
    };

    this.onLikeClick = this.onLikeClick.bind(this);
    this.onDisLikeClick = this.onDisLikeClick.bind(this);
  }

  onLikeClick() {
    if (!this.state.disliked) {
      this.setState({
        liked: !this.state.liked
      });
    } else {
      this.setState({
        liked: true,
        disliked: false
      });
    }
  }

  onDisLikeClick() {
    if (!this.state.liked) {
      this.setState({
        disliked: !this.state.disliked
      });
    } else {
      this.setState({
        liked: false,
        disliked: true
      });
    }
  }

  render() {
    const classLikeButton = cx({
      "like-button": true,
      liked: this.state.liked
    });

    const classDisLikeButton = cx({
      "dislike-button": true,
      disliked: this.state.disliked
    });
    return (
      <>
        <div>
          <h2>Like/Dislike</h2>
          <button className={classLikeButton} onClick={this.onLikeClick}>
            Like |
            <span className="likes-counter">
              {this.state.liked ? this.state.initLike + 1 : this.state.initLike}
            </span>
          </button>

          <button className={classDisLikeButton} onClick={this.onDisLikeClick}>
            Dislike |
            <span className="dislikes-counter">
              {this.state.disliked
                ? this.state.initDislike + 1
                : this.state.initDislike}
            </span>
          </button>
        </div>
        <style>{`
                    .like-button, .dislike-button {
                        font-size: 1rem;
                        padding: 5px 10px;
                        color:   #585858;
                    }
                    .liked, .disliked {
                        font-weight: bold;
                        color: #1565c0;
                    }
                `}</style>
      </>
    );
  }
}
