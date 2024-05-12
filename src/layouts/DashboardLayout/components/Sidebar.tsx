import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import SidebarItem from './SidebarItem';
import { sidebarItems } from '../../../constants'

const Sidebar: React.FC = () => {
  const [open] = React.useState(true);

  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation">
      <List>
        {sidebarItems.map((item, index) => (
            <SidebarItem key={index} item={item} />
        ))}
      </List>
    </Box>
  );

  return (
    <div>
      <Drawer variant='persistent' open={open}>
        {DrawerList}
      </Drawer>
    </div>
  );
}

export default Sidebar;
