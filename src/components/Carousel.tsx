import Carousel from 'react-material-ui-carousel'
import { HeadlinesCarouselItem } from './atoms/Carouseltem'
import { Box } from '@material-ui/core'
import Divider from '@mui/material/Divider';
import NewsCardSkeleton from './atoms/SkeletonLoader';

export const HeadlinesCarousel = ({ headlines }) => {
    return (
        <Box className='w-full py-4 border-0 text-left'>
            <h5 className='font-bold text-2xl text-black underline capitalize'>Top Stories</h5>
            <Carousel indicators={false} autoPlay={true} animation='slide' interval={2000}>
                {headlines?.length ? headlines?.filter((headline) => headline.urlToImage).map((headline, index) => (
                    <HeadlinesCarouselItem headline={headline} key={index} />
                )) : <NewsCardSkeleton />}
            </Carousel>
            <Divider variant='middle' />
        </Box>
    )
}