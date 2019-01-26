import React, { Component } from 'react';
import { connect } from 'react-redux';
import { handleAddTweet } from '../actions/tweets';

class AddTweet extends Component {
  state = {
    tweetText: ''
  }

  handleSubmit = () => {
    const { saveTweet } = this.props;
    const {tweetText } = this.state;
    // @TODO get saveTweet dispatch working to add a new tweet
    // Include author & replyingTo
    // saveTweet({
    //   text: this.state.tweetText,
    //   author: ,
    //   replyingTo: 
    // })
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

const mapStateToProps = (state) => ({
  
})

const mapDispatchToProps = (dispatch) => {
  return {
    saveTweet(newTweet) {
      dispatch(handleAddTweet(newTweet))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddTweet)
