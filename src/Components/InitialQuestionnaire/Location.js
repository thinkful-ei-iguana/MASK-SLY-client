import React from 'react';
import './InitialQuestions.css'

export default class Location extends React.Component {
  render() {
    return (
      <div className='Location'>
        <form>
          <label htmlFor='Location'>What State are you located?</label>
          <input
            name='Location'
            type='text'
            placeholder="Ex: Florida"
            value={this.props.values.Location}
            required
            onChange={this.props.handleChange('Location')}
          />
          <div>
            <button onClick={this.props.prev} className='init-prev'>Back</button>
            <button onClick={this.props.next} className='init-next'>Next</button>
          </div>
        </form>
      </div>
    );
  }
}
