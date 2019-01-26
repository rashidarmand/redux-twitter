import React, { Component } from 'react';
// import PropTypes from 'prop-types'
import { connect } from 'react-redux';

class AddTweet extends Component {
  state = {
    tweetText: ''
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
    
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddTweet)
