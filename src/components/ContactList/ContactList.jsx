import PropTypes from 'prop-types';

import { ContactListBox } from './ContactList.styled';
import ContactListItem from './ContactListItem';

//компонент разметки самого списка
const ContactList = ({ contacts, onRemove }) => {
  //если список контактов равен нулю то разметка не рендериться
  if (contacts.length === 0) return null;
  //если больше нуля то возвращаем список
  return (
    <ContactListBox>
      {/* перебираем наши контакты методом map будет приходить на каждой итерации контакт и будем рендерить ContactListItem */}
      {contacts.map((contact, id) => (
        <ContactListItem {...contact} key={id} onRemove={onRemove} />
      ))}
    </ContactListBox>
  );
};

ContactList.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
    })
  ),
  onRemove: PropTypes.func,
};

export default ContactList;
