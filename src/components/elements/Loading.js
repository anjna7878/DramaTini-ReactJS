import React from "react";
import { Dimmer, Loader, Segment } from 'semantic-ui-react'


const LoadingContainer = ({ color }) => (
  <>
    <Segment className='loading-section'>
      <Dimmer active inverted>
        <Loader indeterminate>Loading</Loader>
      </Dimmer>
    </Segment>
  </>
);

export default LoadingContainer;
