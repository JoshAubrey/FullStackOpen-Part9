import React from 'react';
import { Icon } from 'semantic-ui-react';

interface GenderIconProps {
  gender: string
}

const GenderIcon = ({ gender }: GenderIconProps) => {
  switch (gender) {
    case 'male':
      return <Icon name='mars stroke' />;
    case 'female':
      return <Icon name='venus' />;
    case 'other':
      return <Icon name='genderless' />;
    default:
      return null;
  }
};

export default GenderIcon;