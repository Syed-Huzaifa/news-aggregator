import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { formatDate } from 'src/utils';

export const NewsCard = ({ props }) => {

  return (
    <div className='flex flex-col justify-between lg:flex-row p-4 gap-4'>
      <Box textAlign={'left'} display={'flex'} justifyContent={'space-around'} flexDirection={'column'}>
        <Typography>{formatDate(props.publishedAt)}</Typography>
        <Typography variant="h5">{props.title}</Typography>
        <Typography>{props.description}</Typography>
      </Box>
      <Box>
        <img className='max-w-md' src={props.coverImgUrl} alt="" />
      </Box>
    </div>
  );
}
