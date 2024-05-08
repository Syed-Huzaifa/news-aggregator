import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Sidebar from './components/Sidebar';
import { Outlet } from 'react-router-dom';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: 'flex',
        },
        drawer: {
            width: 240,
            flexShrink: 0,
        },
        drawerPaper: {
            width: 240,
        },
        content: {
            flexGrow: 1,
            padding: theme.spacing(3),
        },
    })
);

const DashboardLayout: React.FC = () => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Drawer
                className={classes.drawer}
                variant="permanent"
                classes={{
                    paper: classes.drawerPaper,
                }}
            >
                <Sidebar />
            </Drawer>
            <main className={classes.content}>
                <Outlet />
            </main>
        </div>
    );
};

export default DashboardLayout;