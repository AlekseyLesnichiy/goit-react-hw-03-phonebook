import PropTypes from 'prop-types';

import { ButtonDelete, ContactListLi } from './ContactList.styled';

const ContactListItem = ({ id, name, number, onRemove }) => {
  return (
    <ContactListLi>
      {name}: {number}
      <ButtonDelete onClick={() => onRemove(id)}>Delete</ButtonDelete>
    </ContactListLi>
  );
};

export default ContactListItem;

ContactListItem.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  number: PropTypes.string.isRequired,
  onRemove: PropTypes.func.isRequired,
};
