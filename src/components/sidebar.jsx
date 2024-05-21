import {
  List,
  ListItem,
  Icon,
  Flex,
  Text,
  Link,
  Tooltip,
  IconButton,
} from '@chakra-ui/react';
import { NavLink } from 'react-router-dom';

export function SidenavItems({ navItems, mode = 'semi' }) {
  const sidebarItemInSemiMode = ({ icon: Icon, ...item }, index) => (
    <ListItem key={index}>
      <Tooltip label={item.label} placement='right'>
        <IconButton
          key={index}
          as={NavLink}
          _focus={{ bg: 'gray.100' }}
          _activeLink={{ boxShadow: 'md', bg: 'orange.500', color: 'white' }}
          bg='transparent'
          aria-label={item.label}
          borderRadius='xl'
          icon={<Icon />}
          to={item.to}
        />
      </Tooltip>
    </ListItem>
  );
  return (
    <List spacing={3}>
      {navItems.map((item, index) => sidebarItemInSemiMode(item, index))}
    </List>
  );
}

export default SidenavItems;
