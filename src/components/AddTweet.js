import React, { Component } from 'react';
import { connect } from 'react-redux';
import { handleAddTweet } from '../actions/tweets';

class AddTweet extends Component {
  state = {
    tweetText: ''
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { saveTweet, author, replyingTo, history } = this.props;

    saveTweet({
      text: this.state.tweetText,
      author,
      replyingTo
    })

    // Clear textarea
    e.target.firstChild.value = '';
    this.setState({ tweetText: '' });

    // redirect to '/' after new tweet using react router
    if(window.location.href.includes('new-tweet')) {
      history.push('/');
    }
  }

  handleChange = ({ target }) => {
    const{ name, value } = target;
    this.setState({ [name]: value });
  }
 
  render() {
    return (
      <div>
        <h3 style={{ textAlign: 'center' }}>Compose New Tweet</h3>
        <form className="new-tweet" onSubmit={ this.handleSubmit }>
          <textarea 
            name='tweetText' 
            onChange ={ this.handleChange } 
            className='textarea' 
            maxLength="280" 
            placeholder="What's on your mind?"
          >
          </textarea>
          <button className='btn' disabled={ this.state.tweetText === '' }>Submit</button>
        </form>
      </div>
    )
  }
}

const mapStateToProps = ({ authedUser, tweets }, { replyingTo }) => ({
  author: authedUser,
  replyingTo: tweets[replyingTo] === undefined ? null : replyingTo
})

const mapDispatchToProps = (dispatch) => ({
  saveTweet(newTweet) {
    dispatch(handleAddTweet(newTweet))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(AddTweet)
