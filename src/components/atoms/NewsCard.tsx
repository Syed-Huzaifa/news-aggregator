import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { formatDate } from 'src/utils';

export const NewsCard = ({ props }) => {

  return (
    <Box component='div' display='flex' justifyContent='space-between' padding={5} gap={4}>
      <Box textAlign={'left'} display={'flex'} justifyContent={'space-around'} flexDirection={'column'}>
        <Typography>{formatDate(props.publishedAt)}</Typography>
        <Typography variant="h5">{props.title}</Typography>
        <Typography>{props.description}</Typography>
      </Box>
      <Box>
        <img className='max-w-md' src={props.coverImgUrl} alt="" />
      </Box>
    </Box>
  );
}
