import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import { useNavigate } from 'react-router-dom';

type SidebarItemProps = {
    item: any
};

const SidebarItem: React.FC<SidebarItemProps> = ({ item }) => {
  const navigate = useNavigate();
    return (
        <ListItem onClick={() => navigate(item.path)} key={item} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <InboxIcon />
              </ListItemIcon>
              <ListItemText primary={item.name} />
            </ListItemButton>
          </ListItem>
    );
};

export default SidebarItem;